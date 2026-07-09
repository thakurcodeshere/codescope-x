"use client";
import { useStudioStore } from "@/lib/store";

const TYPE_COLORS: Record<string, string> = {
  int: '#3b82f6', float: '#06b6d4', double: '#06b6d4', char: '#10b981',
  bool: '#f59e0b', string: '#10b981', pointer: '#a855f7', array: '#f97316',
};

export default function VariablesPanel() {
  const { steps, currentStep } = useStudioStore();
  const step = steps[currentStep];

  if (!step) return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      <div className="panel-header">
        <div className="dot dot-green" />
        <span className="panel-title">Variables</span>
      </div>
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:'#334155', fontSize:12, fontFamily:"'JetBrains Mono'" }}>
        No variables yet
      </div>
    </div>
  );

  const allVars = step.stack.flatMap(f => f.variables.map(v => ({ ...v, frameName: f.functionName })));

  const grouped: Record<string, typeof allVars> = {};
  allVars.forEach(v => {
    if (!grouped[v.frameName]) grouped[v.frameName] = [];
    grouped[v.frameName].push(v);
  });

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      <div className="panel-header">
        <div className="dot dot-green" />
        <span className="panel-title">Variables</span>
        <span style={{ marginLeft:'auto', fontSize:10, color:'#475569', fontFamily:"'JetBrains Mono'" }}>{allVars.length} vars</span>
      </div>

      <div style={{ flex:1, overflow:'auto', padding:12 }}>
        {/* Table header */}
        <div style={{ display:'grid', gridTemplateColumns:'24px 1fr 80px 70px 54px', gap:8, padding:'4px 6px', marginBottom:4, borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
          {['', 'Name', 'Value', 'Type', 'Addr'].map((h, i) => (
            <div key={i} style={{ fontSize:9, fontWeight:800, color:'#334155', fontFamily:"'JetBrains Mono'", textTransform:'uppercase', letterSpacing:1 }}>{h}</div>
          ))}
        </div>

        {allVars.length === 0 ? (
          <div style={{ textAlign:'center', color:'#334155', fontSize:11, fontFamily:"'JetBrains Mono'", padding:'20px 0' }}>no variables in scope</div>
        ) : allVars.map((v, i) => {
          const tc = TYPE_COLORS[v.type] ?? '#64748b';
          return (
            <div key={v.id} style={{
              display:'grid', gridTemplateColumns:'24px 1fr 80px 70px 54px', gap:8,
              padding:'6px 6px', borderRadius:5, transition:'all 0.3s',
              background: v.isNew ? `${tc}15` : v.isMutated ? 'rgba(245,158,11,0.08)' : i%2===0 ? 'rgba(255,255,255,0.015)' : 'transparent',
              borderBottom:'1px solid rgba(255,255,255,0.03)',
              boxShadow: v.isNew ? `0 0 10px ${tc}25` : 'none',
            }}>
              {/* Indicator */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background: v.isNew ? tc : v.isMutated ? '#f59e0b' : '#334155', transition:'all 0.3s', boxShadow: v.isNew ? `0 0 6px ${tc}` : 'none' }} />
              </div>
              {/* Name */}
              <div style={{ fontFamily:"'JetBrains Mono'", fontSize:12, color: v.isPointer ? '#a855f7' : '#e2e8f0', fontWeight: v.isNew ? 700 : 400, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                {v.isPointer ? '*' : ''}{v.name}
              </div>
              {/* Value */}
              <div style={{ fontFamily:"'JetBrains Mono'", fontSize:12, color: v.isMutated ? '#f59e0b' : v.isNew ? tc : '#94a3b8', fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                {String(v.value)}
              </div>
              {/* Type */}
              <div style={{ display:'flex', alignItems:'center' }}>
                <span className="badge" style={{ background:`${tc}18`, color:tc, border:`1px solid ${tc}30`, fontSize:9, padding:'1px 5px' }}>{v.type}</span>
              </div>
              {/* Address */}
              <div style={{ fontFamily:"'JetBrains Mono'", fontSize:9, color:'#334155', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                {v.address}
              </div>
            </div>
          );
        })}

        {/* Previous step comparison */}
        {step.changedVars.length > 0 && (
          <div style={{ marginTop:12, padding:'8px 10px', background:'rgba(245,158,11,0.07)', border:'1px solid rgba(245,158,11,0.2)', borderRadius:6 }}>
            <div style={{ fontSize:9, color:'#f59e0b', fontFamily:"'JetBrains Mono'", fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:4 }}>⚡ Mutated this step</div>
            {step.changedVars.map(id => <span key={id} style={{ fontSize:10, color:'#f59e0b', fontFamily:"'JetBrains Mono'" }}>{id} </span>)}
          </div>
        )}
      </div>
    </div>
  );
}
