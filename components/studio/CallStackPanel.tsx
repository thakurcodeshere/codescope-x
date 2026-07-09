"use client";
import { useStudioStore } from "@/lib/store";

export default function CallStackPanel() {
  const { steps, currentStep } = useStudioStore();
  const step = steps[currentStep];

  if (!step) return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      <div className="panel-header">
        <div className="dot dot-purple" />
        <span className="panel-title">Call Stack</span>
      </div>
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:'#334155', fontSize:12, fontFamily:"'JetBrains Mono'" }}>
        Awaiting execution...
      </div>
    </div>
  );

  const frames = [...step.stack].reverse(); // top of stack first

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      <div className="panel-header">
        <div className="dot dot-purple" />
        <span className="panel-title">Call Stack</span>
        <span style={{ marginLeft:'auto', fontSize:10, color:'#475569', fontFamily:"'JetBrains Mono'" }}>depth: {step.stack.length}</span>
      </div>

      <div style={{ flex:1, overflow:'auto', padding:12, display:'flex', flexDirection:'column', gap:6 }}>

        {/* Stack depth bar */}
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
          <span style={{ fontSize:9, color:'#475569', fontFamily:"'JetBrains Mono'" }}>DEPTH</span>
          <div style={{ flex:1, height:4, background:'rgba(255,255,255,0.05)', borderRadius:2, overflow:'hidden' }}>
            <div style={{ height:'100%', width:`${Math.min(step.stack.length * 25, 100)}%`, background:'linear-gradient(90deg, #a855f7, #3b82f6)', borderRadius:2, transition:'width 0.4s ease', boxShadow:'0 0 10px rgba(168,85,247,0.5)' }} />
          </div>
          <span style={{ fontSize:9, color:'#a855f7', fontFamily:"'JetBrains Mono'" }}>{step.stack.length}/8</span>
        </div>

        {/* Stack frames — rendered as physical stack */}
        {frames.map((frame, i) => {
          const isTop = i === 0;
          const depthColor = frame.depth === 0 ? '#3b82f6' : frame.depth === 1 ? '#10b981' : frame.depth === 2 ? '#f59e0b' : frame.depth === 3 ? '#f97316' : '#a855f7';

          return (
            <div key={frame.id} style={{
              padding:'10px 12px', borderRadius:8, transition:'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
              background: isTop ? `rgba(${frame.depth===0?'59,130,246':frame.depth===1?'16,185,129':frame.depth===2?'245,158,11':frame.depth===3?'249,115,22':'168,85,247'},0.15)` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${isTop ? depthColor + '60' : 'rgba(255,255,255,0.06)'}`,
              boxShadow: isTop ? `0 0 20px ${depthColor}25` : 'none',
              opacity: frame.isActive ? 1 : 0.6,
              transform: isTop ? 'scale(1)' : 'scale(0.98)',
              marginLeft: `${frame.depth * 8}px`,
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:frame.variables.length ? 8 : 0 }}>
                {/* Return address chip */}
                <div style={{ fontSize:9, color:'#334155', fontFamily:"'JetBrains Mono'", background:'rgba(255,255,255,0.04)', padding:'1px 6px', borderRadius:3 }}>{frame.returnAddress}</div>
                <div style={{ flex:1, fontFamily:"'JetBrains Mono'", fontSize:13, fontWeight:700, color: isTop ? depthColor : '#94a3b8' }}>
                  {frame.functionName}()
                </div>
                {isTop && <div className="badge" style={{ background:`${depthColor}20`, color:depthColor, border:`1px solid ${depthColor}40`, fontSize:8 }}>ACTIVE</div>}
                {frame.returnValue !== undefined && frame.returnValue !== null && (
                  <div className="badge" style={{ background:'rgba(16,185,129,0.15)', color:'#10b981', border:'1px solid rgba(16,185,129,0.3)', fontSize:8 }}>→ {String(frame.returnValue)}</div>
                )}
              </div>

              {/* Local variables in frame */}
              {frame.variables.length > 0 && (
                <div style={{ display:'flex', flexWrap:'wrap', gap:4, paddingLeft:8, borderLeft:`2px solid ${depthColor}30` }}>
                  {frame.variables.map(v => (
                    <div key={v.id} style={{ padding:'2px 8px', background:'rgba(255,255,255,0.04)', border:`1px solid ${v.isNew ? depthColor : 'rgba(255,255,255,0.06)'}`, borderRadius:4, fontSize:10, fontFamily:"'JetBrains Mono'", color: v.isNew ? depthColor : '#64748b', transition:'all 0.3s' }}>
                      <span style={{ color:'#475569' }}>{v.type} </span>{v.name}
                      <span style={{ color: v.isMutated ? '#f59e0b' : '#94a3b8' }}> = {String(v.value)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Line indicator */}
              <div style={{ marginTop:6, fontSize:9, color:'#334155', fontFamily:"'JetBrains Mono'" }}>line {frame.line} · frame depth {frame.depth}</div>
            </div>
          );
        })}

        {/* Stack bottom indicator */}
        <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:4 }}>
          <div style={{ flex:1, height:3, background:'linear-gradient(90deg, #334155, transparent)', borderRadius:2 }} />
          <span style={{ fontSize:9, color:'#334155', fontFamily:"'JetBrains Mono'" }}>── stack bottom ──</span>
          <div style={{ flex:1, height:3, background:'linear-gradient(270deg, #334155, transparent)', borderRadius:2 }} />
        </div>
      </div>
    </div>
  );
}
