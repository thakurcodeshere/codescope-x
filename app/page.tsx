"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FeedbackModal from "@/components/FeedbackModal";

function BgOrbs() {
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
      <div style={{position:"absolute",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,130,246,.07) 0%,transparent 70%)",top:-100,left:-100,filter:"blur(40px)"}}/>
      <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(168,85,247,.07) 0%,transparent 70%)",bottom:-50,right:-50,filter:"blur(40px)"}}/>
    </div>
  );
}

const TOPICS = [
  {icon:"📦",color:"#10b981",ver:"C++11",cat:"Basics",title:"Variables & Types",desc:"int, float, auto, const, references, and type deduction."},
  {icon:"🔄",color:"#3b82f6",ver:"C++11",cat:"Basics",title:"Control Flow",desc:"if/else, switch, for, while, range-based for loops."},
  {icon:"⚙️",color:"#a855f7",ver:"C++11",cat:"Basics",title:"Functions & Lambdas",desc:"Overloading, default args, inline, lambda expressions."},
  {icon:"🏗️",color:"#f97316",ver:"C++11",cat:"OOP",title:"Classes & Objects",desc:"Constructors, destructors, access specifiers, methods."},
  {icon:"🧬",color:"#ec4899",ver:"C++11",cat:"OOP",title:"Inheritance & Polymorphism",desc:"Virtual functions, abstract classes, vtables, override."},
  {icon:"📚",color:"#06b6d4",ver:"C++11",cat:"STL",title:"Containers",desc:"vector, list, map, set, unordered_map, deque."},
  {icon:"🔀",color:"#8b5cf6",ver:"C++11",cat:"STL",title:"Algorithms & Iterators",desc:"sort, find, transform, accumulate, begin/end."},
  {icon:"🧠",color:"#f59e0b",ver:"C++11",cat:"Memory",title:"Pointers & References",desc:"Raw pointers, pointer arithmetic, nullptr, const."},
  {icon:"🔒",color:"#ef4444",ver:"C++11",cat:"Memory",title:"Smart Pointers",desc:"unique_ptr, shared_ptr, weak_ptr — RAII ownership."},
  {icon:"🚀",color:"#10b981",ver:"C++11",cat:"Modern",title:"Move Semantics",desc:"rvalue refs, std::move, move constructors, forwarding."},
  {icon:"📐",color:"#3b82f6",ver:"C++11",cat:"Modern",title:"Templates",desc:"Function/class templates, specialization, SFINAE."},
  {icon:"🌊",color:"#a855f7",ver:"C++17",cat:"C++17",title:"Structured Bindings",desc:"auto [a,b]; if constexpr; optional; variant; filesystem."},
  {icon:"⚡",color:"#f97316",ver:"C++17",cat:"C++17",title:"Parallel Algorithms",desc:"std::execution policies, parallel sort, transform_reduce."},
  {icon:"🧵",color:"#06b6d4",ver:"C++11",cat:"Concurrency",title:"Threads & Mutex",desc:"std::thread, mutex, lock_guard, condition_variable."},
  {icon:"🔮",color:"#8b5cf6",ver:"C++20",cat:"C++20",title:"Concepts & Ranges",desc:"requires clauses, concept definitions, std::ranges."},
  {icon:"🌌",color:"#ec4899",ver:"C++20",cat:"C++20",title:"Coroutines",desc:"co_await, co_yield, co_return, async generators."},
  {icon:"🔬",color:"#ef4444",ver:"C++11",cat:"Advanced",title:"Metaprogramming",desc:"constexpr, type traits, enable_if, variadic templates."},
  {icon:"🧩",color:"#f59e0b",ver:"C++23",cat:"C++23",title:"C++23 Features",desc:"std::print, std::expected, deducing this, if consteval."},
];

const ARTICLES = [
  {icon:"📝",color:"#3b82f6",tag:"Deep Dive",time:"8 min",title:"Understanding RAII in Modern C++",excerpt:"Resource Acquisition Is Initialization explained with unique_ptr, lock_guard, and file handles — making your code exception-safe by default."},
  {icon:"🧪",color:"#a855f7",tag:"Tutorial",time:"12 min",title:"Move Semantics Explained Visually",excerpt:"rvalue references, std::move, perfect forwarding — with step-by-step memory diagrams showing exactly what happens during a move."},
  {icon:"🔬",color:"#10b981",tag:"Performance",time:"6 min",title:"Cache-Friendly Data Structures",excerpt:"AoS vs SoA layouts, CPU cache efficiency, and why cache misses silently kill performance in vector vs list traversal."},
  {icon:"⚡",color:"#f97316",tag:"C++20",time:"10 min",title:"Concepts: The Type System Revolution",excerpt:"C++20 Concepts give us readable template constraints. Learn requires clauses, named concepts, and replace cryptic SFINAE."},
  {icon:"🧵",color:"#06b6d4",tag:"Concurrency",time:"9 min",title:"Lock-Free Programming with Atomics",excerpt:"std::atomic enables safe shared state without mutex overhead. Memory ordering models: relaxed, acquire, release, seq_cst."},
  {icon:"🎯",color:"#ec4899",tag:"Patterns",time:"7 min",title:"Design Patterns in Modern C++",excerpt:"Classic GoF patterns rewritten with lambdas, templates, and type erasure — Strategy, Observer, CRTP with zero virtual overhead."},
];

const CATS = ["All","Basics","OOP","STL","Memory","Modern","Concurrency","C++17","C++20","C++23","Advanced"];
const VER_COLOR: Record<string,string> = {"C++11":"#64748b","C++14":"#f59e0b","C++17":"#06b6d4","C++20":"#8b5cf6","C++23":"#ef4444"};

export default function HomePage() {
  const [cat,setCat]=useState("All");
  const [search,setSearch]=useState("");
  const [visLine,setVisLine]=useState(0);
  const [activeStep,setActiveStep]=useState(0);

  useEffect(()=>{
    let i=0;
    const iv=setInterval(()=>{if(i<12){setVisLine(i+1);i++;}else{clearInterval(iv);setTimeout(()=>{setVisLine(0);i=0;},2000);}},200);
    return()=>clearInterval(iv);
  },[]);

  useEffect(()=>{
    const iv=setInterval(()=>setActiveStep(s=>(s+1)%4),2500);
    return()=>clearInterval(iv);
  },[]);

  const filtered=TOPICS.filter(t=>(cat==="All"||t.cat===cat)&&(!search||t.title.toLowerCase().includes(search.toLowerCase())||t.desc.toLowerCase().includes(search.toLowerCase())));

  const CODE_LINES=[
    {t:"#include <iostream>",c:"#475569"},{t:"using namespace std;",c:"#475569"},{t:"",c:""},
    {t:"int fib(int n) {",c:"#3b82f6"},{t:"  if (n <= 1) return n;",c:"#f59e0b"},
    {t:"  return fib(n-1)+fib(n-2);",c:"#a855f7"},{t:"}",c:"#3b82f6"},{t:"",c:""},
    {t:"int main() {",c:"#3b82f6"},{t:"  cout << fib(8);  // → 21",c:"#10b981"},
    {t:"  return 0;",c:"#3b82f6"},{t:"}",c:"#3b82f6"},
  ];

  return (
    <div style={{minHeight:"100vh",background:"#080810",position:"relative",overflow:"hidden",fontFamily:"'Inter',sans-serif"}}>
      <BgOrbs/>
      <Navbar/>

      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",padding:"80px 48px 60px",position:"relative",zIndex:2}}>
        <div style={{maxWidth:1200,margin:"0 auto",width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center"}}>
          <div>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(59,130,246,.1)",border:"1px solid rgba(59,130,246,.25)",borderRadius:50,padding:"5px 18px",marginBottom:28}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:"#3b82f6",boxShadow:"0 0 8px #3b82f6"}}/>
              <span style={{fontSize:10,fontWeight:800,color:"#3b82f6",fontFamily:"'JetBrains Mono'",letterSpacing:1.5,textTransform:"uppercase"}}>Live Execution Visualization</span>
            </div>
            <h1 style={{fontSize:"clamp(40px,5.5vw,72px)",fontWeight:900,lineHeight:1.0,letterSpacing:"-3px",marginBottom:24}}>
              Master C++<br/><span style={{background:"linear-gradient(120deg,#3b82f6,#a855f7,#06b6d4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>topic by topic.</span>
            </h1>
            <p style={{fontSize:17,color:"#64748b",lineHeight:1.8,maxWidth:480,marginBottom:36}}>
              Write code, visualize execution, explore every C++ concept — with live memory maps, call stacks, and AI explanations.
            </p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <Link href="/studio"><button style={{padding:"13px 28px",borderRadius:11,border:"none",background:"linear-gradient(135deg,#3b82f6,#a855f7)",color:"#fff",fontSize:13,fontWeight:800,cursor:"pointer",boxShadow:"0 0 24px rgba(59,130,246,.4)"}}>⚡ Launch Studio</button></Link>
              <Link href="/guidelines"><button style={{padding:"13px 24px",borderRadius:11,border:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.04)",color:"#64748b",fontSize:13,cursor:"pointer"}}>📖 How It Works</button></Link>
              <Link href="/login"><button style={{padding:"13px 24px",borderRadius:11,border:"1px solid rgba(59,130,246,.3)",background:"rgba(59,130,246,.08)",color:"#3b82f6",fontSize:13,cursor:"pointer"}}>🔐 Sign In</button></Link>
            </div>
          </div>
          {/* Live code window */}
          <div>
            <div style={{background:"#0d0d1a",border:"1px solid rgba(59,130,246,.2)",borderRadius:14,overflow:"hidden",boxShadow:"0 0 60px rgba(59,130,246,.08),0 40px 80px rgba(0,0,0,.7)"}}>
              <div style={{padding:"10px 16px",borderBottom:"1px solid rgba(255,255,255,.05)",display:"flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.02)"}}>
                {["#ef4444","#f59e0b","#10b981"].map((c,i)=><div key={i} style={{width:10,height:10,borderRadius:"50%",background:c}}/>)}
                <span style={{fontSize:10,color:"#334155",fontFamily:"'JetBrains Mono'",marginLeft:6}}>fibonacci.cpp · C++17</span>
                <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:5}}>
                  <div style={{width:6,height:6,borderRadius:"50%",background:"#3b82f6",boxShadow:"0 0 8px #3b82f6"}}/>
                  <span style={{fontSize:9,color:"#3b82f6",fontFamily:"'JetBrains Mono'"}}>EXECUTING</span>
                </div>
              </div>
              <div style={{padding:"16px",fontFamily:"'JetBrains Mono'",fontSize:12,lineHeight:2.2}}>
                {CODE_LINES.map((l,i)=>(
                  <div key={i} style={{display:"flex",gap:10,opacity:i<visLine?1:0,transition:"opacity .25s",background:i===9&&i<visLine?"rgba(16,185,129,.08)":"transparent",borderLeft:i===9&&i<visLine?"2px solid #10b981":"2px solid transparent",paddingLeft:6,marginLeft:-8}}>
                    <span style={{color:"#1e293b",width:18,textAlign:"right",userSelect:"none",fontSize:10}}>{l.t?i+1:""}</span>
                    <span style={{color:l.c||"#64748b"}}>{l.t||"\u00a0"}</span>
                  </div>
                ))}
              </div>
              <div style={{padding:"10px 16px",borderTop:"1px solid rgba(255,255,255,.05)",display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{fontSize:9,color:"#475569",fontFamily:"'JetBrains Mono'",textTransform:"uppercase",letterSpacing:1}}>Stack</span>
                {["main()","fib(8)","fib(7)","fib(6)"].slice(0,activeStep+1).map((fn,i)=>(
                  <div key={fn} style={{padding:"3px 10px",background:i===activeStep?"rgba(168,85,247,.2)":"rgba(255,255,255,.04)",border:`1px solid ${i===activeStep?"rgba(168,85,247,.5)":"rgba(255,255,255,.06)"}`,borderRadius:6,fontSize:10,color:i===activeStep?"#a855f7":"#64748b",fontFamily:"'JetBrains Mono'",transition:"all .3s"}}>{fn}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* C++ TOPICS */}
      <section style={{padding:"80px 48px",position:"relative",zIndex:2}} id="topics">
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <div style={{fontSize:10,color:"#3b82f6",fontFamily:"'JetBrains Mono'",textTransform:"uppercase",letterSpacing:3,marginBottom:12}}>// C++ Curriculum</div>
            <h2 style={{fontSize:"clamp(32px,4vw,52px)",fontWeight:900,letterSpacing:"-2px",color:"#e2e8f0",marginBottom:14}}>
              Every Topic. <span style={{background:"linear-gradient(120deg,#3b82f6,#a855f7)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Every Version.</span>
            </h2>
            <p style={{fontSize:15,color:"#64748b",maxWidth:560,margin:"0 auto"}}>From fundamentals to C++23 — explore every concept with live execution demos.</p>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",marginBottom:20}}>
            {CATS.map(c=>(
              <button key={c} onClick={()=>setCat(c)} style={{padding:"6px 16px",borderRadius:20,fontSize:11,cursor:"pointer",transition:"all .15s",fontFamily:"'JetBrains Mono'",fontWeight:cat===c?800:500,border:`1px solid ${cat===c?"#3b82f6":"rgba(255,255,255,.08)"}`,background:cat===c?"rgba(59,130,246,.15)":"rgba(255,255,255,.02)",color:cat===c?"#3b82f6":"#475569"}}>{c}</button>
            ))}
          </div>
          <div style={{display:"flex",justifyContent:"center",marginBottom:36}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search topics..." style={{width:"100%",maxWidth:400,padding:"10px 18px",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,color:"#e2e8f0",fontSize:13,outline:"none"}}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
            {filtered.map(t=>(
              <Link key={t.title} href="/studio" style={{textDecoration:"none"}}>
                <div style={{padding:22,borderRadius:14,background:"rgba(13,13,26,.8)",border:"1px solid rgba(255,255,255,.06)",cursor:"pointer",transition:"all .2s",height:"100%"}}
                  onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor=t.color+"50";el.style.transform="translateY(-3px)";el.style.boxShadow=`0 12px 40px ${t.color}12`;}}
                  onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(255,255,255,.06)";el.style.transform="translateY(0)";el.style.boxShadow="none";}}>
                  <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:12}}>
                    <div style={{width:42,height:42,borderRadius:11,background:`${t.color}18`,border:`1px solid ${t.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>{t.icon}</div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                      <span style={{fontSize:9,fontFamily:"'JetBrains Mono'",fontWeight:800,color:VER_COLOR[t.ver]||"#64748b",background:`${VER_COLOR[t.ver]||"#64748b"}15`,border:`1px solid ${VER_COLOR[t.ver]||"#64748b"}30`,borderRadius:5,padding:"2px 7px"}}>{t.ver}</span>
                      <span style={{fontSize:9,fontFamily:"'JetBrains Mono'",color:"#334155"}}>{t.cat}</span>
                    </div>
                  </div>
                  <h3 style={{fontSize:15,fontWeight:700,color:"#e2e8f0",marginBottom:6}}>{t.title}</h3>
                  <p style={{fontSize:12,color:"#475569",lineHeight:1.7}}>{t.desc}</p>
                  <div style={{marginTop:12,fontSize:10,color:t.color,fontFamily:"'JetBrains Mono'"}}>Open in Studio →</div>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length===0&&<div style={{textAlign:"center",padding:"60px 0",color:"#334155",fontSize:14}}>No topics match &quot;{search}&quot;. Try another filter.</div>}
        </div>
      </section>

      {/* ARTICLES */}
      <section style={{padding:"60px 48px",position:"relative",zIndex:2,background:"rgba(255,255,255,.01)"}} id="articles">
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{marginBottom:40}}>
            <div style={{fontSize:10,color:"#06b6d4",fontFamily:"'JetBrains Mono'",textTransform:"uppercase",letterSpacing:3,marginBottom:10}}>// C++ Articles</div>
            <h2 style={{fontSize:"clamp(28px,3.5vw,44px)",fontWeight:900,letterSpacing:"-1.5px",color:"#e2e8f0"}}>
              Learn From The <span style={{background:"linear-gradient(120deg,#3b82f6,#06b6d4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Best Minds in C++</span>
            </h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:16}}>
            {ARTICLES.map(a=>(
              <div key={a.title} style={{padding:24,borderRadius:14,background:"rgba(13,13,26,.8)",border:"1px solid rgba(255,255,255,.06)",cursor:"pointer",transition:"all .2s"}}
                onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor=a.color+"45";el.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="rgba(255,255,255,.06)";el.style.transform="translateY(0)";}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                  <div style={{width:38,height:38,borderRadius:10,background:`${a.color}15`,border:`1px solid ${a.color}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{a.icon}</div>
                  <div>
                    <span style={{fontSize:9,fontFamily:"'JetBrains Mono'",fontWeight:800,color:a.color,background:`${a.color}12`,border:`1px solid ${a.color}25`,borderRadius:5,padding:"2px 8px",textTransform:"uppercase",letterSpacing:.8}}>{a.tag}</span>
                    <div style={{fontSize:10,color:"#334155",marginTop:3}}>{a.time} read</div>
                  </div>
                </div>
                <h3 style={{fontSize:15,fontWeight:700,color:"#e2e8f0",marginBottom:8,lineHeight:1.4}}>{a.title}</h3>
                <p style={{fontSize:12,color:"#475569",lineHeight:1.75}}>{a.excerpt}</p>
                <div style={{marginTop:14,fontSize:10,color:a.color,fontFamily:"'JetBrains Mono'"}}>Read article →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{padding:"80px 48px",position:"relative",zIndex:2}} id="guidelines">
        <div style={{maxWidth:900,margin:"0 auto",textAlign:"center"}}>
          <div style={{fontSize:10,color:"#10b981",fontFamily:"'JetBrains Mono'",textTransform:"uppercase",letterSpacing:3,marginBottom:12}}>// How It Works</div>
          <h2 style={{fontSize:"clamp(28px,3.5vw,44px)",fontWeight:900,letterSpacing:"-1.5px",color:"#e2e8f0",marginBottom:14}}>
            From Zero to <span style={{background:"linear-gradient(120deg,#3b82f6,#a855f7)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Execution Clarity</span>
          </h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,marginTop:40,marginBottom:40}}>
            {[
              {n:"01",icon:"✍️",color:"#3b82f6",title:"Write or Paste Code",desc:"Monaco editor with full C++ support. Paste from clipboard, use templates, or write from scratch."},
              {n:"02",icon:"▶️",color:"#a855f7",title:"Simulate & Visualize",desc:"Ctrl+Enter to simulate. Watch memory, variables, and call stack update live."},
              {n:"03",icon:"🔍",color:"#10b981",title:"Explore & Understand",desc:"Step through execution, scrub the timeline, ask the AI — understand every byte."},
            ].map(s=>(
              <div key={s.n} style={{padding:28,borderRadius:14,background:"rgba(13,13,26,.8)",border:"1px solid rgba(255,255,255,.06)"}}>
                <div style={{width:48,height:48,borderRadius:13,background:`${s.color}18`,border:`1px solid ${s.color}35`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,margin:"0 auto 16px"}}>{s.icon}</div>
                <div style={{fontSize:10,color:s.color,fontFamily:"'JetBrains Mono'",fontWeight:800,marginBottom:8}}>{s.n}</div>
                <h3 style={{fontSize:15,fontWeight:700,color:"#e2e8f0",marginBottom:8}}>{s.title}</h3>
                <p style={{fontSize:12,color:"#475569",lineHeight:1.7}}>{s.desc}</p>
              </div>
            ))}
          </div>
          <Link href="/guidelines"><button style={{padding:"12px 28px",borderRadius:10,border:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.04)",color:"#64748b",fontSize:13,cursor:"pointer"}}>📖 Full Guidelines →</button></Link>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:"60px 48px 120px",textAlign:"center",position:"relative",zIndex:2}}>
        <div style={{maxWidth:640,margin:"0 auto"}}>
          <h2 style={{fontSize:"clamp(32px,4vw,52px)",fontWeight:900,letterSpacing:"-2px",color:"#e2e8f0",marginBottom:14,lineHeight:1.05}}>
            Stop guessing.<br/><span style={{background:"linear-gradient(120deg,#3b82f6,#a855f7)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>See your code think.</span>
          </h2>
          <p style={{fontSize:15,color:"#64748b",marginBottom:32}}>Every line. Every byte. Every pointer. Every moment. Visible.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/studio"><button style={{padding:"13px 32px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#3b82f6,#a855f7)",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",boxShadow:"0 0 24px rgba(59,130,246,.4)"}}>⚡ Launch Studio</button></Link>
            <Link href="/login"><button style={{padding:"13px 28px",borderRadius:12,border:"1px solid rgba(59,130,246,.3)",background:"rgba(59,130,246,.08)",color:"#3b82f6",fontSize:14,cursor:"pointer"}}>🔐 Join Free</button></Link>
          </div>
        </div>
      </section>

      <footer style={{position:"relative",zIndex:2,borderTop:"1px solid rgba(255,255,255,.04)",padding:"20px 48px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10,color:"#1e293b",fontSize:11,fontFamily:"'JetBrains Mono'"}}>
        <span>CodeScope X — The Ultimate C++ Visualization Engine</span>
        <div style={{display:"flex",gap:20}}>
          <Link href="/guidelines" style={{color:"#334155",textDecoration:"none"}}>Guidelines</Link>
          <Link href="/settings" style={{color:"#334155",textDecoration:"none"}}>Settings</Link>
          <Link href="/login" style={{color:"#334155",textDecoration:"none"}}>Sign In</Link>
        </div>
        <span>v1.0.0 · See your code think</span>
      </footer>
      <FeedbackModal/>
    </div>
  );
}
