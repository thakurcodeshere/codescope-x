"use client";
import { useState } from "react";

interface FeedbackEntry { id:string; rating:number; category:string; message:string; ts:string; }

export default function FeedbackModal() {
  const [open,setOpen]=useState(false);
  const [rating,setRating]=useState(0);
  const [hover,setHover]=useState(0);
  const [category,setCategory]=useState("general");
  const [message,setMessage]=useState("");
  const [submitted,setSubmitted]=useState(false);

  const submit=()=>{
    if(!message.trim()||rating===0)return;
    const entry:FeedbackEntry={id:Date.now().toString(),rating,category,message,ts:new Date().toISOString()};
    const ex=JSON.parse(localStorage.getItem("codescope_feedback")??"[]");
    localStorage.setItem("codescope_feedback",JSON.stringify([...ex,entry]));
    setSubmitted(true);
    setTimeout(()=>{setOpen(false);setSubmitted(false);setRating(0);setMessage("");setCategory("general");},1800);
  };

  return (
    <>
      <button onClick={()=>setOpen(true)} title="Send Feedback" style={{position:"fixed",bottom:28,right:28,zIndex:999,width:52,height:52,borderRadius:"50%",background:"linear-gradient(135deg,#3b82f6,#a855f7)",border:"none",cursor:"pointer",fontSize:22,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 24px rgba(59,130,246,.55),0 4px 20px rgba(0,0,0,.4)",transition:"transform .2s"}} onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.12)")} onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}>💬</button>
      {open&&(
        <div onClick={()=>setOpen(false)} style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(0,0,0,.65)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div onClick={e=>e.stopPropagation()} style={{width:440,background:"#0d0d1a",border:"1px solid rgba(59,130,246,.25)",borderRadius:20,padding:32,boxShadow:"0 0 80px rgba(59,130,246,.12),0 40px 80px rgba(0,0,0,.8)",fontFamily:"'Inter',sans-serif"}}>
            {submitted?(
              <div style={{textAlign:"center",padding:"32px 0"}}>
                <div style={{fontSize:52,marginBottom:16}}>🎉</div>
                <div style={{fontSize:20,fontWeight:800,color:"#3b82f6"}}>Thanks for your feedback!</div>
                <div style={{color:"#475569",marginTop:8,fontSize:14}}>Your input helps improve CodeScope X.</div>
              </div>
            ):(
              <>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
                  <div><div style={{fontSize:18,fontWeight:800,color:"#e2e8f0"}}>Share Feedback</div><div style={{fontSize:12,color:"#475569",marginTop:2}}>Help us make CodeScope X better</div></div>
                  <button onClick={()=>setOpen(false)} style={{background:"none",border:"none",color:"#475569",fontSize:20,cursor:"pointer"}}>✕</button>
                </div>
                <div style={{marginBottom:20}}>
                  <div style={{fontSize:11,color:"#64748b",fontFamily:"'JetBrains Mono'",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Rating</div>
                  <div style={{display:"flex",gap:8}}>
                    {[1,2,3,4,5].map(s=>(
                      <button key={s} onClick={()=>setRating(s)} onMouseEnter={()=>setHover(s)} onMouseLeave={()=>setHover(0)} style={{background:"none",border:"none",fontSize:30,cursor:"pointer",filter:s<=(hover||rating)?"none":"grayscale(1) opacity(.35)",transform:s<=(hover||rating)?"scale(1.15)":"scale(1)",transition:"all .15s"}}>⭐</button>
                    ))}
                  </div>
                </div>
                <div style={{marginBottom:20}}>
                  <div style={{fontSize:11,color:"#64748b",fontFamily:"'JetBrains Mono'",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Category</div>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    {["general","bug","feature","content","performance"].map(c=>(
                      <button key={c} onClick={()=>setCategory(c)} style={{padding:"5px 14px",borderRadius:20,fontSize:11,cursor:"pointer",border:`1px solid ${category===c?"#3b82f6":"rgba(255,255,255,.1)"}`,background:category===c?"rgba(59,130,246,.15)":"transparent",color:category===c?"#3b82f6":"#475569",fontFamily:"'JetBrains Mono'",transition:"all .15s",textTransform:"capitalize"}}>{c}</button>
                    ))}
                  </div>
                </div>
                <div style={{marginBottom:24}}>
                  <div style={{fontSize:11,color:"#64748b",fontFamily:"'JetBrains Mono'",textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Message</div>
                  <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Tell us what you think..." rows={4} style={{width:"100%",background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,padding:"12px 14px",color:"#e2e8f0",fontSize:13,fontFamily:"'Inter'",resize:"vertical",outline:"none",boxSizing:"border-box"}}/>
                </div>
                <button onClick={submit} disabled={!message.trim()||rating===0} style={{width:"100%",padding:"13px",borderRadius:12,border:"none",background:message.trim()&&rating>0?"linear-gradient(135deg,#3b82f6,#a855f7)":"rgba(255,255,255,.06)",color:message.trim()&&rating>0?"#fff":"#334155",fontFamily:"'JetBrains Mono'",fontSize:13,fontWeight:800,cursor:message.trim()&&rating>0?"pointer":"not-allowed",transition:"all .2s"}}>Submit Feedback ✦</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
