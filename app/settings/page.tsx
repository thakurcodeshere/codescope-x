"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import FeedbackModal from "@/components/FeedbackModal";

const DEFAULT = {fontSize:14,fontFamily:"JetBrains Mono",tabSize:4,wordWrap:false,minimap:false,theme:"dark-plus",notifications:true,autoSave:true,animationsEnabled:true};
type S = typeof DEFAULT;
const FONTS=["JetBrains Mono","Fira Code","Cascadia Code","Source Code Pro","Consolas"];
const THEMES=[{id:"dark-plus",label:"Dark+"},{id:"github-dark",label:"GitHub Dark"},{id:"dracula",label:"Dracula"},{id:"one-dark",label:"One Dark"},{id:"tokyo-night",label:"Tokyo Night"},{id:"monokai",label:"Monokai"}];

const Toggle=({value,onChange}:{value:boolean;onChange:(v:boolean)=>void})=>(
  <button onClick={()=>onChange(!value)} style={{width:44,height:24,borderRadius:12,border:"none",cursor:"pointer",background:value?"linear-gradient(90deg,#3b82f6,#a855f7)":"rgba(255,255,255,.1)",position:"relative",transition:"background .2s",flexShrink:0}}>
    <div style={{width:18,height:18,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:value?23:3,transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.4)"}}/>
  </button>
);

const Row=({label,sub,children}:{label:string;sub?:string;children:React.ReactNode})=>(
  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 0",borderBottom:"1px solid rgba(255,255,255,.05)"}}>
    <div><div style={{fontSize:14,color:"#e2e8f0",fontWeight:600}}>{label}</div>{sub&&<div style={{fontSize:11,color:"#475569",marginTop:2}}>{sub}</div>}</div>
    <div style={{marginLeft:20,flexShrink:0}}>{children}</div>
  </div>
);

export default function SettingsPage() {
  const [s,setS]=useState<S>(DEFAULT);
  const [saved,setSaved]=useState(false);
  const [user,setUser]=useState<{name:string;provider:string}|null>(null);
  const [tab,setTab]=useState<"editor"|"display"|"account"|"about">("editor");

  useEffect(()=>{
    try{const st=localStorage.getItem("codescope_settings");if(st)setS({...DEFAULT,...JSON.parse(st)});const u=localStorage.getItem("codescope_user");if(u)setUser(JSON.parse(u));}catch{}
  },[]);

  const save=()=>{localStorage.setItem("codescope_settings",JSON.stringify(s));setSaved(true);setTimeout(()=>setSaved(false),2000);};
  const set=<K extends keyof S>(k:K,v:S[K])=>setS(p=>({...p,[k]:v}));
  const sel={background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:8,padding:"6px 12px",color:"#e2e8f0",fontSize:13,outline:"none",cursor:"pointer",minWidth:140};
  const TABS=[{id:"editor",label:"Editor",icon:"✏️"},{id:"display",label:"Display",icon:"🎨"},{id:"account",label:"Account",icon:"👤"},{id:"about",label:"About",icon:"ℹ️"}] as const;

  return (
    <div style={{minHeight:"100vh",background:"#080810",fontFamily:"'Inter',sans-serif"}}>
      <Navbar/>
      <div style={{maxWidth:760,margin:"0 auto",padding:"90px 24px 80px"}}>
        <div style={{marginBottom:36}}>
          <div style={{fontSize:11,color:"#3b82f6",fontFamily:"'JetBrains Mono'",textTransform:"uppercase",letterSpacing:2,marginBottom:8}}>// Configuration</div>
          <h1 style={{fontSize:36,fontWeight:900,color:"#e2e8f0",letterSpacing:"-1px"}}>Settings</h1>
        </div>
        <div style={{display:"flex",gap:4,marginBottom:28,borderBottom:"1px solid rgba(255,255,255,.06)"}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"9px 18px",borderRadius:"8px 8px 0 0",border:"none",cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",gap:6,borderBottom:tab===t.id?"2px solid #3b82f6":"2px solid transparent",background:tab===t.id?"rgba(59,130,246,.1)":"transparent",color:tab===t.id?"#3b82f6":"#475569",fontWeight:tab===t.id?700:500,transition:"all .15s"}}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
        <div style={{background:"rgba(13,13,26,.8)",border:"1px solid rgba(255,255,255,.07)",borderRadius:16,padding:"0 24px"}}>
          {tab==="editor"&&<>
            <Row label="Font Size" sub="Editor font size in pixels">
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <button onClick={()=>set("fontSize",Math.max(10,s.fontSize-1))} style={{width:28,height:28,borderRadius:6,border:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.05)",color:"#e2e8f0",cursor:"pointer",fontSize:16}}>−</button>
                <span style={{width:30,textAlign:"center",color:"#e2e8f0",fontFamily:"'JetBrains Mono'",fontWeight:700}}>{s.fontSize}</span>
                <button onClick={()=>set("fontSize",Math.min(24,s.fontSize+1))} style={{width:28,height:28,borderRadius:6,border:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.05)",color:"#e2e8f0",cursor:"pointer",fontSize:16}}>+</button>
              </div>
            </Row>
            <Row label="Font Family" sub="Monospace font"><select value={s.fontFamily} onChange={e=>set("fontFamily",e.target.value)} style={sel}>{FONTS.map(f=><option key={f} value={f}>{f}</option>)}</select></Row>
            <Row label="Tab Size"><select value={s.tabSize} onChange={e=>set("tabSize",Number(e.target.value))} style={sel}>{[2,4,8].map(n=><option key={n} value={n}>{n} spaces</option>)}</select></Row>
            <Row label="Word Wrap"><Toggle value={s.wordWrap} onChange={v=>set("wordWrap",v)}/></Row>
            <Row label="Auto Save"><Toggle value={s.autoSave} onChange={v=>set("autoSave",v)}/></Row>
          </>}
          {tab==="display"&&<>
            <Row label="Theme"><select value={s.theme} onChange={e=>set("theme",e.target.value)} style={sel}>{THEMES.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}</select></Row>
            <Row label="Show Minimap"><Toggle value={s.minimap} onChange={v=>set("minimap",v)}/></Row>
            <Row label="Animations"><Toggle value={s.animationsEnabled} onChange={v=>set("animationsEnabled",v)}/></Row>
          </>}
          {tab==="account"&&(user?(
            <>
              <Row label="Signed In As" sub={`via ${user.provider}`}><div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#3b82f6,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:800,color:"#fff"}}>{user.name[0]}</div></Row>
              <Row label="Display Name"><span style={{fontSize:14,color:"#3b82f6",fontWeight:700}}>{user.name}</span></Row>
              <Row label="Sign Out" sub="Remove session"><button onClick={()=>{localStorage.removeItem("codescope_user");setUser(null);}} style={{padding:"7px 18px",borderRadius:9,border:"1px solid rgba(239,68,68,.3)",background:"rgba(239,68,68,.08)",color:"#ef4444",fontSize:12,cursor:"pointer"}}>Sign Out</button></Row>
            </>
          ):(
            <div style={{padding:"40px 0",textAlign:"center"}}>
              <div style={{fontSize:40,marginBottom:16}}>👤</div>
              <div style={{fontSize:16,fontWeight:700,color:"#e2e8f0",marginBottom:8}}>Not signed in</div>
              <a href="/login" style={{display:"inline-block",padding:"10px 28px",borderRadius:10,background:"linear-gradient(135deg,#3b82f6,#a855f7)",color:"#fff",fontSize:13,fontWeight:700,textDecoration:"none"}}>Sign In →</a>
            </div>
          ))}
          {tab==="about"&&<>
            <Row label="Version"><span style={{fontFamily:"'JetBrains Mono'",fontSize:13,color:"#3b82f6",fontWeight:700}}>v1.0.0</span></Row>
            <Row label="Engine"><span style={{fontFamily:"'JetBrains Mono'",fontSize:11,color:"#06b6d4"}}>CodeScope Core</span></Row>
            <Row label="C++ Support"><span style={{fontFamily:"'JetBrains Mono'",fontSize:11,color:"#f59e0b"}}>C++11/14/17/20/23</span></Row>
          </>}
        </div>
        {(tab==="editor"||tab==="display")&&(
          <div style={{marginTop:20,display:"flex",justifyContent:"flex-end"}}>
            <button onClick={save} style={{padding:"11px 32px",borderRadius:11,border:"none",background:saved?"rgba(16,185,129,.2)":"linear-gradient(135deg,#3b82f6,#a855f7)",color:saved?"#10b981":"#fff",fontSize:13,fontWeight:800,cursor:"pointer",transition:"all .2s"}}>{saved?"✓ Saved!":"Save Changes"}</button>
          </div>
        )}
      </div>
      <FeedbackModal/>
    </div>
  );
}
