"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FeedbackModal from "@/components/FeedbackModal";

const STEPS = [
  {n:"01",icon:"✍️",color:"#3b82f6",title:"Write or Paste Code",desc:"Use the Monaco editor with full C++ IntelliSense. Paste from clipboard (Ctrl+V), use template snippets, or write from scratch. The editor supports all C++ standards.",tip:"Tip: Use the 📂 Templates button to instantly load pre-built C++ examples."},
  {n:"02",icon:"🔢",color:"#a855f7",title:"Select C++ Version",desc:"Choose your C++ standard from the version dropdown: C++11, C++14, C++17, C++20, or C++23. This affects which language features are available and how code is highlighted.",tip:"Tip: Templates are tagged with their minimum required C++ version."},
  {n:"03",icon:"▶️",color:"#10b981",title:"Launch Simulation",desc:"Press Ctrl+Enter or click ⚡ Launch Studio. CodeScope X analyzes your code and renders a full execution trace with memory maps, variable states, and call stacks.",tip:"Tip: Known algorithms (fibonacci, sorting, etc.) get complete step-by-step visual traces."},
  {n:"04",icon:"🔍",color:"#f59e0b",title:"Explore Panels",desc:"Switch between Execution Flow, Memory Universe, Recursion Tree, Variables, and Waterfall tabs. Each panel provides a different view into what your code is doing at runtime.",tip:"Tip: Click any step in Execution Flow to teleport to that exact moment in time."},
  {n:"05",icon:"⏱️",color:"#f97316",title:"Control the Timeline",desc:"Scrub the execution timeline at the bottom to step forward, backward, or jump to any frame. Play at 0.5×, 1×, or 2× speed. Like a video player for your code.",tip:"Tip: Use ← → arrow keys for frame-by-frame stepping through execution."},
  {n:"06",icon:"🤖",color:"#06b6d4",title:"Ask the AI Explainer",desc:"Toggle the AI panel to get plain-English explanations of each execution step. Ask \"Why did this crash?\" or \"What is happening to memory here?\" and get instant answers.",tip:"Tip: The AI explains stack growth, heap allocation, and complexity automatically."},
  {n:"07",icon:"🔗",color:"#ec4899",title:"Test on Real Compiler",desc:"Click the 🔗 Godbolt button in the editor to open your code in Compiler Explorer with a real GCC or Clang compiler — test actual output, assembly, and optimizations.",tip:"Tip: Compare debug vs. O2/O3 optimized output to understand compiler behavior."},
];

const SHORTCUTS = [
  {key:"Ctrl + Enter",action:"Run simulation"},
  {key:"Ctrl + V",action:"Paste from clipboard"},
  {key:"Ctrl + Shift + F",action:"Format / prettify code"},
  {key:"Ctrl + C",action:"Copy selected code"},
  {key:"Ctrl + Z",action:"Undo last change"},
  {key:"Ctrl + /",action:"Toggle line comment"},
  {key:"← / →",action:"Step through execution"},
  {key:"Space",action:"Play/pause temporal engine"},
];

export default function GuidelinesPage() {
  return (
    <div style={{minHeight:"100vh",background:"#080810",fontFamily:"'Inter',sans-serif"}}>
      <Navbar/>
      <section style={{padding:"100px 48px 60px",position:"relative"}}>
        <div style={{maxWidth:860,margin:"0 auto",textAlign:"center"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(59,130,246,.1)",border:"1px solid rgba(59,130,246,.25)",borderRadius:50,padding:"5px 18px",marginBottom:28}}>
            <span style={{fontSize:12,color:"#3b82f6",fontFamily:"'JetBrains Mono'",fontWeight:800,letterSpacing:1.5}}>// HOW TO USE</span>
          </div>
          <h1 style={{fontSize:"clamp(36px,5vw,60px)",fontWeight:900,color:"#e2e8f0",letterSpacing:"-2px",marginBottom:20}}>
            Your Complete Guide to{" "}
            <span style={{background:"linear-gradient(120deg,#3b82f6,#a855f7,#06b6d4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>CodeScope X</span>
          </h1>
          <p style={{fontSize:17,color:"#475569",lineHeight:1.8,maxWidth:600,margin:"0 auto 40px"}}>Master every feature in 7 steps — from your first paste to deep execution analysis.</p>
          <Link href="/studio"><button style={{padding:"13px 32px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#3b82f6,#a855f7)",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",boxShadow:"0 0 24px rgba(59,130,246,.4)"}}>⚡ Open Studio Now</button></Link>
        </div>
      </section>

      <section style={{padding:"20px 48px 80px"}}>
        <div style={{maxWidth:860,margin:"0 auto",display:"flex",flexDirection:"column",gap:24}}>
          {STEPS.map((step,i)=>(
            <div key={step.n} style={{display:"grid",gridTemplateColumns:"80px 1fr",gap:24,background:"rgba(13,13,26,.8)",border:"1px solid rgba(255,255,255,.06)",borderRadius:18,padding:"28px 32px",transition:"all .25s"}}
              onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor=step.color+"40";el.style.boxShadow=`0 0 40px ${step.color}10`;}}
              onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(255,255,255,.06)";el.style.boxShadow="none";}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
                <div style={{width:52,height:52,borderRadius:14,background:`${step.color}18`,border:`1px solid ${step.color}35`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{step.icon}</div>
                <div style={{fontFamily:"'JetBrains Mono'",fontSize:11,fontWeight:800,color:step.color,opacity:.7}}>{step.n}</div>
                {i<STEPS.length-1&&<div style={{width:1,flex:1,background:`linear-gradient(${step.color}40,transparent)`,marginTop:4}}/>}
              </div>
              <div>
                <h2 style={{fontSize:18,fontWeight:800,color:"#e2e8f0",marginBottom:10}}>{step.title}</h2>
                <p style={{fontSize:14,color:"#64748b",lineHeight:1.8,marginBottom:12}}>{step.desc}</p>
                <div style={{display:"inline-flex",alignItems:"flex-start",gap:8,background:`${step.color}08`,border:`1px solid ${step.color}20`,borderRadius:8,padding:"8px 14px"}}>
                  <span style={{fontSize:13,color:step.color,flexShrink:0}}>💡</span>
                  <span style={{fontSize:12,color:step.color,lineHeight:1.6}}>{step.tip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:"0 48px 100px"}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>
          <div style={{marginBottom:28}}>
            <div style={{fontSize:10,color:"#3b82f6",fontFamily:"'JetBrains Mono'",textTransform:"uppercase",letterSpacing:2,marginBottom:8}}>// Keyboard Shortcuts</div>
            <h2 style={{fontSize:28,fontWeight:800,color:"#e2e8f0"}}>Work at the Speed of Thought</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:10}}>
            {SHORTCUTS.map(s=>(
              <div key={s.key} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 18px",background:"rgba(13,13,26,.8)",border:"1px solid rgba(255,255,255,.06)",borderRadius:10}}>
                <span style={{fontSize:13,color:"#64748b"}}>{s.action}</span>
                <kbd style={{fontFamily:"'JetBrains Mono'",fontSize:11,fontWeight:700,color:"#3b82f6",background:"rgba(59,130,246,.1)",border:"1px solid rgba(59,130,246,.25)",borderRadius:6,padding:"3px 10px",whiteSpace:"nowrap"}}>{s.key}</kbd>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FeedbackModal/>
    </div>
  );
}
