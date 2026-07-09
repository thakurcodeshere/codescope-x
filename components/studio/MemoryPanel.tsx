"use client";
import { useStudioStore } from "@/lib/store";
import { useState, useEffect } from "react";

const SEGMENT_COLORS: Record<string, { bg: string; border: string; label: string }> = {
  stack:  { bg:'rgba(59,130,246,0.12)', border:'#3b82f6', label:'STACK' },
  heap:   { bg:'rgba(249,115,22,0.12)', border:'#f97316', label:'HEAP' },
  static: { bg:'rgba(168,85,247,0.12)', border:'#a855f7', label:'STATIC' },
};

export default function MemoryPanel() {
  const { steps, currentStep } = useStudioStore();
  const step = steps[currentStep];
  const [animating, setAnimating] = useState<string[]>([]);

  const prevStep = steps[currentStep - 1];

  useEffect(() => {
    if (!step) return;
    const newHeap = step.heap.filter(b => b.isNew).map(b => b.id);
    if (newHeap.length) {
      setAnimating(newHeap);
      setTimeout(() => setAnimating([]), 800);
    }
  }, [currentStep]);

  if (!step) return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      <div className="panel-header">
        <div className="dot dot-orange" />
        <span className="panel-title">Memory Map</span>
      </div>
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:'#334155', fontSize:12, fontFamily:"'JetBrains Mono'" }}>
        Press ▶ to visualize memory
      </div>
    </div>
  );

  const stackVars = step.stack.flatMap(f => f.variables);

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      <div className="panel-header">
        <div className="dot dot-orange" />
        <span className="panel-title">Memory Map</span>
        <span style={{ marginLeft:'auto', fontSize:10, color:'#475569', fontFamily:"'JetBrains Mono'" }}>
          stack: {stackVars.length * 4}B · heap: {step.heap.filter(h => !h.isFreed).reduce((a,b) => a + b.size, 0)}B
        </span>
      </div>

      <div style={{ flex:1, overflow:'auto', padding:12, display:'flex', flexDirection:'column', gap:12 }}>

        {/* Stack segment */}
        <div>
          <div style={{ fontSize:9, fontWeight:800, letterSpacing:2, color:'#3b82f6', marginBottom:8, fontFamily:"'JetBrains Mono'", textTransform:'uppercase' }}>◈ Stack Memory</div>
          <div style={{ display:'flex', flexDirection:'column-reverse', gap:4 }}>
            {stackVars.length === 0 ? (
              <div style={{ padding:'8px 10px', background:'rgba(59,130,246,0.05)', border:'1px dashed rgba(59,130,246,0.2)', borderRadius:6, fontSize:11, color:'#334155', textAlign:'center', fontFamily:"'JetBrains Mono'" }}>empty</div>
            ) : stackVars.map(v => (
              <div key={v.id} style={{
                padding:'7px 10px', background: v.isNew ? 'rgba(59,130,246,0.2)' : v.isMutated ? 'rgba(245,158,11,0.12)' : 'rgba(59,130,246,0.07)',
                border: `1px solid ${v.isNew ? '#3b82f6' : v.isMutated ? '#f59e0b' : 'rgba(59,130,246,0.2)'}`,
                borderRadius:6, display:'flex', alignItems:'center', gap:8, transition:'all 0.3s',
                boxShadow: v.isNew ? '0 0 12px rgba(59,130,246,0.3)' : v.isMutated ? '0 0 12px rgba(245,158,11,0.2)' : 'none',
              }}>
                <div style={{ fontFamily:"'JetBrains Mono'", fontSize:9, color:'#334155', width:54, flexShrink:0 }}>{v.address}</div>
                <div style={{ width:3, height:24, background: v.isNew ? '#3b82f6' : v.isMutated ? '#f59e0b' : '#334155', borderRadius:2, flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:12, fontWeight:700, color: v.isPointer ? '#a855f7' : '#e2e8f0', fontFamily:"'JetBrains Mono'" }}>{v.name}</span>
                    <span style={{ fontSize:11, color: v.isNew ? '#3b82f6' : v.isMutated ? '#f59e0b' : '#10b981', fontFamily:"'JetBrains Mono'", fontWeight:600 }}>
                      {v.isPointer ? <span style={{ color:'#a855f7' }}>*{v.value}</span> : String(v.value)}
                    </span>
                  </div>
                  <div style={{ fontSize:9, color:'#475569', fontFamily:"'JetBrains Mono'" }}>{v.type} · {v.size}B</div>
                </div>
                {v.isNew && <div className="badge" style={{ background:'rgba(59,130,246,0.2)', color:'#3b82f6', fontSize:8, padding:'1px 6px' }}>NEW</div>}
                {v.isMutated && <div className="badge" style={{ background:'rgba(245,158,11,0.2)', color:'#f59e0b', fontSize:8, padding:'1px 6px' }}>MUT</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Stack pointer arrow visual */}
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.05)' }} />
          <span style={{ fontSize:9, color:'#334155', fontFamily:"'JetBrains Mono'" }}>── SP ──</span>
          <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.05)' }} />
        </div>

        {/* Heap segment */}
        <div>
          <div style={{ fontSize:9, fontWeight:800, letterSpacing:2, color:'#f97316', marginBottom:8, fontFamily:"'JetBrains Mono'", textTransform:'uppercase' }}>◈ Heap Memory</div>
          {step.heap.length === 0 ? (
            <div style={{ padding:'8px 10px', background:'rgba(249,115,22,0.05)', border:'1px dashed rgba(249,115,22,0.2)', borderRadius:6, fontSize:11, color:'#334155', textAlign:'center', fontFamily:"'JetBrains Mono'" }}>no heap allocations</div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
              {step.heap.map(block => (
                <div key={block.id} style={{
                  padding:'8px 10px', borderRadius:7, transition:'all 0.4s',
                  background: block.isNew ? 'rgba(249,115,22,0.2)' : block.isFreed ? 'rgba(239,68,68,0.08)' : 'rgba(249,115,22,0.08)',
                  border: `1px solid ${block.isNew ? '#f97316' : block.isFreed ? '#ef4444' : 'rgba(249,115,22,0.25)'}`,
                  boxShadow: block.isNew ? '0 0 20px rgba(249,115,22,0.3)' : 'none',
                  opacity: block.isFreed ? 0.5 : 1,
                  animation: animating.includes(block.id) ? 'block-appear 0.35s cubic-bezier(0.34,1.56,0.64,1) both' : 'none',
                }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                    <span style={{ fontSize:10, color:'#f97316', fontFamily:"'JetBrains Mono'", fontWeight:700 }}>{block.address}</span>
                    <div style={{ display:'flex', gap:6 }}>
                      <div className="badge" style={{ background:'rgba(249,115,22,0.15)', color:'#f97316', fontSize:8 }}>{block.type}</div>
                      <div className="badge" style={{ background:'rgba(255,255,255,0.05)', color:'#64748b', fontSize:8 }}>{block.size}B</div>
                      {block.isFreed && <div className="badge" style={{ background:'rgba(239,68,68,0.15)', color:'#ef4444', fontSize:8 }}>freed</div>}
                    </div>
                  </div>
                  {/* Value display */}
                  <div style={{ display:'flex', gap:3, flexWrap:'wrap' }}>
                    {Array.isArray(block.value) ? block.value.map((v, i) => (
                      <div key={i} style={{ padding:'2px 8px', background:'rgba(255,255,255,0.05)', borderRadius:4, fontSize:11, fontFamily:"'JetBrains Mono'", color: v === 'null' ? '#ef4444' : '#e2e8f0' }}>
                        {String(v)}
                      </div>
                    )) : (
                      <div style={{ fontSize:12, fontFamily:"'JetBrains Mono'", color:'#e2e8f0' }}>{String(block.value)}</div>
                    )}
                  </div>
                  <div style={{ fontSize:9, color:'#475569', marginTop:4, fontFamily:"'JetBrains Mono'" }}>alloc'd by: {block.allocatedBy}()</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pointer arrows */}
        {stackVars.filter(v => v.isPointer && v.pointsTo).map(v => (
          <div key={v.id} style={{ display:'flex', alignItems:'center', gap:8, padding:'6px 10px', background:'rgba(168,85,247,0.07)', border:'1px solid rgba(168,85,247,0.2)', borderRadius:6 }}>
            <span style={{ fontSize:11, color:'#a855f7', fontFamily:"'JetBrains Mono'", fontWeight:700 }}>*{v.name}</span>
            <span style={{ color:'#a855f7', fontSize:16 }}>→</span>
            <span style={{ fontSize:11, color:'#c084fc', fontFamily:"'JetBrains Mono'" }}>{v.pointsTo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
