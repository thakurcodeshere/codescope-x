"use client";
import { useStudioStore } from "@/lib/store";

const HIGHLIGHT_COLORS: Record<string, string> = {
  blue:'#3b82f6', green:'#10b981', yellow:'#f59e0b', purple:'#a855f7', orange:'#f97316', red:'#ef4444',
};

const STEP_ICONS: Record<string, string> = {
  declaration:'📦', assignment:'✏️', comparison:'⚖️', function_call:'📞',
  return:'↩', loop_start:'🔄', recursion:'🌀', output:'📤', allocation:'🟠',
};

export default function ExecutionTimeline() {
  const { steps, currentStep, jumpToStep, playbackState } = useStudioStore();

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      <div className="panel-header">
        <div className="dot" style={{ background:'#3b82f6', boxShadow:'0 0 6px #3b82f6' }} />
        <span className="panel-title">Execution Timeline</span>
        <span style={{ marginLeft:'auto', fontSize:10, color:'#475569', fontFamily:"'JetBrains Mono'" }}>
          {currentStep + 1} / {steps.length} steps
        </span>
      </div>

      {/* Scrubber track */}
      <div style={{ flex:1, overflow:'hidden', padding:'0 16px', display:'flex', alignItems:'center', gap:3, overflowX:'auto' }}>
        {steps.length === 0 ? (
          <div style={{ color:'#334155', fontSize:11, fontFamily:"'JetBrains Mono'", width:'100%', textAlign:'center' }}>
            No execution steps loaded
          </div>
        ) : steps.map((s, i) => {
          const color = HIGHLIGHT_COLORS[s.highlight] ?? '#3b82f6';
          const isActive = i === currentStep;
          const isPast = i < currentStep;

          return (
            <button key={s.id} onClick={() => jumpToStep(i)} title={`Step ${i+1}: ${s.stepType} · Line ${s.line}`} style={{
              width: isActive ? 36 : 22, height: isActive ? 36 : 22,
              borderRadius: isActive ? 8 : '50%',
              background: isActive ? `${color}30` : isPast ? `${color}15` : 'rgba(255,255,255,0.03)',
              border: `2px solid ${isActive ? color : isPast ? color+'40' : 'rgba(255,255,255,0.06)'}`,
              cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
              fontSize: isActive ? 14 : 8, flexShrink:0,
              boxShadow: isActive ? `0 0 14px ${color}50` : 'none',
              transition:'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
              color: isActive ? color : isPast ? color+'80' : '#334155',
              position:'relative',
            }}>
              {isActive ? (STEP_ICONS[s.stepType] ?? '●') : (
                <div style={{ width:6, height:6, borderRadius:'50%', background: isPast ? color : 'rgba(255,255,255,0.1)' }} />
              )}

              {/* Connection line */}
              {i < steps.length - 1 && (
                <div style={{
                  position:'absolute', left:'100%', top:'50%', transform:'translateY(-50%)',
                  width:3, height:2,
                  background: isPast ? `${HIGHLIGHT_COLORS[steps[i+1]?.highlight]}40` : 'rgba(255,255,255,0.04)',
                  zIndex:-1,
                }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
