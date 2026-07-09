"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const PROVIDERS = [
  {id:"github",label:"Continue with GitHub",icon:"🐙",color:"#e2e8f0",bg:"rgba(255,255,255,.06)",border:"rgba(255,255,255,.12)"},
  {id:"google",label:"Continue with Google",icon:"🔵",color:"#4285F4",bg:"rgba(66,133,244,.08)",border:"rgba(66,133,244,.25)"},
  {id:"stackoverflow",label:"Stack Overflow",icon:"🟠",color:"#F58025",bg:"rgba(245,128,37,.08)",border:"rgba(245,128,37,.25)"},
  {id:"devto",label:"Dev.to Community",icon:"💻",color:"#3b82f6",bg:"rgba(59,130,246,.08)",border:"rgba(59,130,246,.25)"},
  {id:"hackernews",label:"Hacker News",icon:"🔶",color:"#ff6600",bg:"rgba(255,102,0,.08)",border:"rgba(255,102,0,.25)"},
  {id:"twitter",label:"Continue with X / Twitter",icon:"🐦",color:"#1DA1F2",bg:"rgba(29,161,242,.08)",border:"rgba(29,161,242,.25)"},
];
const NAMES=["Alex Chen","Priya Sharma","Kai Mueller","Sara Osei","Leo Tanaka","Nia Williams"];

export default function LoginPage() {
  const router=useRouter();
  const [loading,setLoading]=useState<string|null>(null);
  const [alreadyIn,setAlreadyIn]=useState(false);

  useEffect(()=>{try{if(localStorage.getItem("codescope_user"))setAlreadyIn(true);}catch{};},[]);

  const handleLogin=(provider:string)=>{
    setLoading(provider);
    const name=NAMES[Math.floor(Math.random()*NAMES.length)];
    setTimeout(()=>{localStorage.setItem("codescope_user",JSON.stringify({name,provider,ts:Date.now()}));router.push("/");},1400);
  };

  return (
    <div style={{minHeight:"100vh",background:"#080810",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Inter',sans-serif",position:"relative",overflow:"hidden"}}>
      <div style={{position:"fixed",top:"15%",left:"10%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,130,246,.12),transparent 70%)",pointerEvents:"none"}}/>
      <div style={{position:"fixed",bottom:"15%",right:"10%",width:350,height:350,borderRadius:"50%",background:"radial-gradient(circle,rgba(168,85,247,.1),transparent 70%)",pointerEvents:"none"}}/>
      <div style={{width:"100%",maxWidth:460,padding:"0 20px"}}>
        <div style={{background:"rgba(13,13,26,.95)",border:"1px solid rgba(59,130,246,.2)",borderRadius:24,padding:"44px 40px",boxShadow:"0 0 80px rgba(59,130,246,.1),0 40px 80px rgba(0,0,0,.8)"}}>
          {alreadyIn?(
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:44,marginBottom:16}}>✅</div>
              <div style={{fontSize:20,fontWeight:800,color:"#3b82f6",marginBottom:8}}>You&apos;re signed in!</div>
              <p style={{color:"#475569",fontSize:14,marginBottom:24}}>You already have an active session.</p>
              <button onClick={()=>router.push("/")} style={{width:"100%",padding:"13px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#3b82f6,#a855f7)",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",marginBottom:10}}>Go to Homepage →</button>
              <button onClick={()=>{localStorage.removeItem("codescope_user");setAlreadyIn(false);}} style={{width:"100%",padding:"11px",borderRadius:12,border:"1px solid rgba(239,68,68,.25)",background:"rgba(239,68,68,.08)",color:"#ef4444",fontSize:13,cursor:"pointer"}}>Sign out and switch account</button>
            </div>
          ):(
            <>
              <div style={{textAlign:"center",marginBottom:36}}>
                <div style={{width:56,height:56,borderRadius:16,margin:"0 auto 16px",background:"linear-gradient(135deg,#3b82f6,#a855f7,#06b6d4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:900,color:"#fff",boxShadow:"0 0 30px rgba(59,130,246,.5)"}}>⚡</div>
                <h1 style={{fontSize:26,fontWeight:900,color:"#e2e8f0",marginBottom:8,letterSpacing:"-0.5px"}}>Welcome to CodeScope X</h1>
                <p style={{fontSize:13,color:"#475569"}}>Join <span style={{color:"#3b82f6",fontWeight:700}}>50,000+ engineers</span> who visualize execution.</p>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {PROVIDERS.map(p=>(
                  <button key={p.id} onClick={()=>handleLogin(p.id)} disabled={!!loading} style={{display:"flex",alignItems:"center",gap:14,padding:"13px 18px",borderRadius:12,border:`1px solid ${p.border}`,background:loading===p.id?p.bg.replace(".08",".15"):p.bg,cursor:loading?"not-allowed":"pointer",transition:"all .18s",opacity:loading&&loading!==p.id?.5:1}}
                    onMouseEnter={e=>{if(!loading)(e.currentTarget as HTMLElement).style.transform="translateY(-1px)";}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="translateY(0)";}}>
                    <span style={{fontSize:20,flexShrink:0}}>{loading===p.id?"⏳":p.icon}</span>
                    <span style={{fontSize:13,fontWeight:600,color:p.color,flex:1,textAlign:"left"}}>{loading===p.id?"Authenticating…":p.label}</span>
                    {loading!==p.id&&<span style={{fontSize:10,color:"#334155"}}>→</span>}
                  </button>
                ))}
              </div>
              <div style={{marginTop:28,paddingTop:20,borderTop:"1px solid rgba(255,255,255,.06)",textAlign:"center",fontSize:11,color:"#334155",lineHeight:1.8}}>
                By signing in you agree to our <span style={{color:"#3b82f6",cursor:"pointer"}}>Terms</span> and <span style={{color:"#3b82f6",cursor:"pointer"}}>Privacy Policy</span>.<br/>No spam. No BS. Just code.
              </div>
            </>
          )}
        </div>
        <p style={{textAlign:"center",marginTop:24,fontSize:12,color:"#1e293b",fontFamily:"'JetBrains Mono'",letterSpacing:1}}>CODESCOPE X · THE ULTIMATE C++ VISUALIZATION ENGINE</p>
      </div>
    </div>
  );
}
