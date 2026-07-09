"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const path=usePathname();
  const [user,setUser]=useState<{name:string;provider:string}|null>(null);
  const [menuOpen,setMenuOpen]=useState(false);

  useEffect(()=>{try{const u=localStorage.getItem("codescope_user");if(u)setUser(JSON.parse(u));}catch{};});

  const isActive=(href:string)=>href==="/"?path==="/":path.startsWith(href);

  const links=[{href:"/",label:"Home"},{href:"/guidelines",label:"Guidelines"},{href:"/studio",label:"Studio ⚡"}];

  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,height:60,display:"flex",alignItems:"center",padding:"0 32px",gap:12,background:"rgba(8,8,16,.88)",borderBottom:"1px solid rgba(255,255,255,.06)",backdropFilter:"blur(24px)",fontFamily:"'Inter',sans-serif"}}>
      <Link href="/" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:32,height:32,borderRadius:9,background:"linear-gradient(135deg,#3b82f6,#a855f7,#06b6d4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:900,color:"#fff",boxShadow:"0 0 22px rgba(59,130,246,.55)"}}>⚡</div>
        <div>
          <div style={{fontFamily:"'JetBrains Mono'",fontWeight:800,fontSize:14,background:"linear-gradient(90deg,#3b82f6,#a855f7,#06b6d4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>CodeScope X</div>
          <div style={{fontSize:8,color:"#334155",fontFamily:"'JetBrains Mono'",letterSpacing:1}}>C++ VISUALIZATION ENGINE</div>
        </div>
      </Link>
      <div style={{display:"flex",gap:2,marginLeft:24}}>
        {links.map(l=>(
          <Link key={l.href} href={l.href} style={{padding:"6px 14px",borderRadius:8,textDecoration:"none",fontSize:13,fontWeight:isActive(l.href)?700:500,color:isActive(l.href)?"#3b82f6":"#64748b",background:isActive(l.href)?"rgba(59,130,246,.1)":"transparent",transition:"all .15s"}}>{l.label}</Link>
        ))}
      </div>
      <div style={{flex:1}}/>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        <div style={{width:6,height:6,borderRadius:"50%",background:"#10b981",boxShadow:"0 0 8px #10b981"}}/>
        <span style={{fontSize:10,color:"#10b981",fontFamily:"'JetBrains Mono'"}}>LIVE</span>
      </div>
      <Link href="/settings" style={{width:36,height:36,borderRadius:9,border:"1px solid rgba(255,255,255,.08)",background:"rgba(255,255,255,.04)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,textDecoration:"none",color:"#64748b"}} title="Settings">⚙</Link>
      {user?(
        <div style={{position:"relative"}}>
          <button onClick={()=>setMenuOpen(o=>!o)} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 10px",borderRadius:10,border:"1px solid rgba(59,130,246,.25)",background:"rgba(59,130,246,.1)",cursor:"pointer"}}>
            <div style={{width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,#3b82f6,#a855f7)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:"#fff"}}>{user.name[0].toUpperCase()}</div>
            <span style={{fontSize:12,color:"#e2e8f0",fontWeight:600}}>{user.name}</span>
          </button>
          {menuOpen&&(
            <div style={{position:"absolute",top:"calc(100% + 8px)",right:0,width:180,background:"#0d0d1a",border:"1px solid rgba(255,255,255,.08)",borderRadius:12,overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,.7)"}}>
              <Link href="/settings" style={{display:"block",padding:"10px 14px",fontSize:13,color:"#94a3b8",textDecoration:"none"}} onClick={()=>setMenuOpen(false)}>⚙ Settings</Link>
              <button onClick={()=>{localStorage.removeItem("codescope_user");setUser(null);setMenuOpen(false);}} style={{width:"100%",padding:"10px 14px",textAlign:"left",fontSize:13,color:"#ef4444",background:"none",border:"none",cursor:"pointer"}}>↩ Sign Out</button>
            </div>
          )}
        </div>
      ):(
        <Link href="/login">
          <button style={{padding:"7px 18px",borderRadius:9,border:"1px solid rgba(59,130,246,.35)",background:"rgba(59,130,246,.12)",color:"#3b82f6",fontSize:12,fontFamily:"'JetBrains Mono'",fontWeight:700,cursor:"pointer",transition:"all .18s"}}>Sign In</button>
        </Link>
      )}
    </nav>
  );
}
