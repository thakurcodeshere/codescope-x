"use client";
import dynamic from "next/dynamic";
import { useRef, useState, useCallback } from "react";
import { useStudioStore } from "@/lib/store";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const VERSION_LABELS: Record<string,string> = {cpp11:"C++11",cpp14:"C++14",cpp17:"C++17",cpp20:"C++20",cpp23:"C++23"};
const VERSION_COLORS: Record<string,string> = {cpp11:"#64748b",cpp14:"#f59e0b",cpp17:"#06b6d4",cpp20:"#8b5cf6",cpp23:"#ef4444"};

export default function CodeEditor() {
  const { code, steps, currentStep, setCode } = useStudioStore();
  const [cppVersion, setCppVersion] = useState("cpp17");
  const [monoLoaded, setMonoLoaded] = useState(false);
  const editorRef = useRef<any>(null);

  const step = steps[currentStep];
  const activeLine = step?.line ?? -1;

  const onMount = useCallback((editor: any, monaco: any) => {
    editorRef.current = editor;
    setMonoLoaded(true);

    // C++ config
    monaco.languages.setLanguageConfiguration("cpp", {
      comments: { lineComment: "//", blockComment: ["/*", "*/"] },
      brackets: [["{","}"],["[","]"],["(",")"]], autoClosingPairs: [{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'}],
    });

    // Snippets
    monaco.languages.registerCompletionItemProvider("cpp", {
      provideCompletionItems: () => ({
        suggestions: [
          {label:"cout",kind:monaco.languages.CompletionItemKind.Snippet,insertText:"cout << ${1:value} << endl;",insertTextRules:4},
          {label:"for",kind:monaco.languages.CompletionItemKind.Snippet,insertText:"for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n\t${3:// body}\n}",insertTextRules:4},
          {label:"func",kind:monaco.languages.CompletionItemKind.Snippet,insertText:"${1:int} ${2:name}(${3:params}) {\n\t${4:// body}\n\treturn ${5:0};\n}",insertTextRules:4},
          {label:"class",kind:monaco.languages.CompletionItemKind.Snippet,insertText:"class ${1:Name} {\npublic:\n\t${2:// members}\n};",insertTextRules:4},
          {label:"vector",kind:monaco.languages.CompletionItemKind.Snippet,insertText:"vector<${1:int}> ${2:v};",insertTextRules:4},
          {label:"main",kind:monaco.languages.CompletionItemKind.Snippet,insertText:"int main() {\n\t${1:// code}\n\treturn 0;\n}",insertTextRules:4},
          {label:"include",kind:monaco.languages.CompletionItemKind.Snippet,insertText:"#include <${1:iostream}>",insertTextRules:4},
          {label:"unique_ptr",kind:monaco.languages.CompletionItemKind.Snippet,insertText:"auto ${1:p} = make_unique<${2:Type}>(${3:args});",insertTextRules:4},
        ] as any,
      }),
    });

    editor.addAction({id:"run-sim",label:"Run Simulation",keybindings:[monaco.KeyMod.CtrlCmd|monaco.KeyCode.Enter],run:()=>{}});
  }, []);

  const handleChange = useCallback((val: string | undefined) => {
    if (val !== undefined) setCode(val);
  }, [setCode]);

  const highlightColor = {
    blue:{bg:"rgba(59,130,246,.12)",border:"#3b82f6"},green:{bg:"rgba(16,185,129,.12)",border:"#10b981"},
    yellow:{bg:"rgba(245,158,11,.12)",border:"#f59e0b"},purple:{bg:"rgba(168,85,247,.12)",border:"#a855f7"},
    orange:{bg:"rgba(249,115,22,.12)",border:"#f97316"},red:{bg:"rgba(239,68,68,.12)",border:"#ef4444"},
  }[step?.highlight ?? "blue"];

  const btnStyle = {padding:"3px 9px",borderRadius:6,border:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.04)",color:"#64748b",cursor:"pointer",fontSize:10,fontFamily:"'JetBrains Mono'",transition:"all .15s"};

  return (
    <div style={{height:"100%",display:"flex",flexDirection:"column",background:"#0d0d1a"}}>
      {/* Toolbar */}
      <div style={{display:"flex",alignItems:"center",gap:5,padding:"5px 10px",borderBottom:"1px solid rgba(255,255,255,.06)",flexShrink:0,flexWrap:"wrap",background:"rgba(255,255,255,.02)"}}>
        {/* Version selector */}
        <select value={cppVersion} onChange={e=>setCppVersion(e.target.value)} style={{background:`${VERSION_COLORS[cppVersion]}12`,border:`1px solid ${VERSION_COLORS[cppVersion]}40`,color:VERSION_COLORS[cppVersion],borderRadius:6,padding:"3px 8px",fontSize:10,fontFamily:"'JetBrains Mono'",fontWeight:800,cursor:"pointer",outline:"none"}}>
          {Object.entries(VERSION_LABELS).map(([k,v])=><option key={k} value={k} style={{background:"#0d0d1a",color:"#e2e8f0"}}>{v}</option>)}
        </select>

        <div style={{width:1,height:16,background:"rgba(255,255,255,.08)"}}/>

        {/* Paste */}
        <button title="Paste from clipboard" onClick={async()=>{try{const t=await navigator.clipboard.readText();if(t&&editorRef.current){editorRef.current.setValue(t);setCode(t);}}catch{alert("Allow clipboard access to paste.");}}} style={btnStyle}>📋 Paste</button>

        {/* Copy */}
        <button title="Copy all code" onClick={()=>{const v=editorRef.current?.getValue()??code;navigator.clipboard.writeText(v);}} style={btnStyle}>⎘ Copy</button>

        {/* Format */}
        <button title="Format code" onClick={()=>editorRef.current?.getAction("editor.action.formatDocument")?.run()} style={btnStyle}>✦ Format</button>

        {/* Clear */}
        <button title="Clear editor" onClick={()=>{editorRef.current?.setValue("");setCode("");}} style={{...btnStyle,border:"1px solid rgba(239,68,68,.25)",background:"rgba(239,68,68,.06)",color:"#ef4444"}}>✕ Clear</button>

        {/* Godbolt */}
        <a href="https://godbolt.org/" target="_blank" rel="noopener noreferrer" title="Open in Compiler Explorer" style={{...btnStyle,border:"1px solid rgba(245,158,11,.3)",background:"rgba(245,158,11,.08)",color:"#f59e0b",textDecoration:"none",display:"flex",alignItems:"center",gap:4}}>🔗 Godbolt</a>

        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:5}}>
          <span style={{fontSize:8,color:"#334155",fontFamily:"'JetBrains Mono'"}}>Ctrl+↵</span>
          <button style={{padding:"4px 14px",borderRadius:7,background:"linear-gradient(135deg,#3b82f6,#a855f7)",border:"none",color:"#fff",cursor:"pointer",fontSize:10,fontFamily:"'JetBrains Mono'",fontWeight:800,boxShadow:"0 0 14px rgba(59,130,246,.4)"}}>▶ Simulate</button>
        </div>
      </div>

      {/* Monaco Editor (preferred) or fallback */}
      <div style={{flex:1,overflow:"hidden",position:"relative"}}>
        {monoLoaded===false && (
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:1,pointerEvents:"none"}}>
            <span style={{fontSize:11,color:"#334155",fontFamily:"'JetBrains Mono'"}}>Loading editor…</span>
          </div>
        )}
        <MonacoEditor
          language="cpp" value={code} onChange={handleChange} onMount={onMount}
          theme="vs-dark"
          options={{fontSize:13,fontFamily:"'JetBrains Mono','Fira Code',monospace",fontLigatures:true,lineNumbers:"on",minimap:{enabled:false},scrollBeyondLastLine:false,wordWrap:"off",cursorBlinking:"smooth",cursorSmoothCaretAnimation:"on",smoothScrolling:true,formatOnPaste:true,formatOnType:true,autoIndent:"advanced",tabSize:4,bracketPairColorization:{enabled:true},padding:{top:10,bottom:10},suggestOnTriggerCharacters:true}}
        />
      </div>

      {/* Step annotation */}
      {step && (
        <div style={{padding:"10px 14px",borderTop:`1px solid ${highlightColor.border}30`,background:highlightColor.bg,flexShrink:0}}>
          <div style={{fontFamily:"'JetBrains Mono'",fontSize:9,fontWeight:800,color:highlightColor.border,textTransform:"uppercase",letterSpacing:.5,marginBottom:3}}>
            {step.stepType?.replace(/_/g," ")||"Execution"} · Line {activeLine}
          </div>
          <div style={{fontSize:11,color:"#64748b",lineHeight:1.5}}>{step.explanation}</div>
        </div>
      )}

      {/* Status bar */}
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"3px 12px",background:"rgba(255,255,255,.02)",borderTop:"1px solid rgba(255,255,255,.05)",flexShrink:0}}>
        <span style={{fontSize:9,color:"#334155",fontFamily:"'JetBrains Mono'"}}>{cppVersion.toUpperCase()} · {code.split("\n").length} lines</span>
        {step && <span style={{fontSize:9,color:highlightColor.border,fontFamily:"'JetBrains Mono'"}}>▶ Step {currentStep+1}/{steps.length}</span>}
      </div>
    </div>
  );
}
