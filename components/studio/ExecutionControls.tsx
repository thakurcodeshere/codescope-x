"use client";
import { useStudioStore } from "@/lib/store";

const SPEEDS = [
  { label: '0.5×', ms: 2400 },
  { label: '1×',   ms: 1200 },
  { label: '2×',   ms: 600  },
  { label: '4×',   ms: 300  },
];

export default function ExecutionControls() {
  const { playbackState, currentStep, steps, playbackSpeed, play, pause, stepForward, stepBackward, restart, setSpeed } = useStudioStore();

  const isPlaying = playbackState === 'playing';
  const isFinished = playbackState === 'finished';
  const canForward = currentStep < steps.length - 1;
  const canBackward = currentStep > 0;

  const btnStyle = (active: boolean, color = '#3b82f6') => ({
    display:'flex', alignItems:'center', justifyContent:'center',
    width:36, height:36, borderRadius:8, border:`1px solid ${active ? color+'50' : 'rgba(255,255,255,0.07)'}`,
    background: active ? `${color}20` : 'rgba(255,255,255,0.03)', color: active ? color : '#64748b',
    cursor:'pointer', fontSize:14, transition:'all 0.2s', boxShadow: active ? `0 0 12px ${color}30` : 'none',
  });

  return (
    <div style={{ height:'100%', display:'flex', alignItems:'center', padding:'0 20px', gap:12, background:'rgba(255,255,255,0.01)', borderTop:'1px solid rgba(255,255,255,0.04)' }}>

      {/* Restart */}
      <button onClick={restart} style={btnStyle(false)} title="Restart">⟳</button>

      {/* Step back */}
      <button onClick={stepBackward} disabled={!canBackward} style={{ ...btnStyle(canBackward, '#a855f7'), opacity: canBackward ? 1 : 0.3, cursor: canBackward ? 'pointer' : 'default' }} title="Step Back">⏮</button>

      {/* Play / Pause */}
      <button onClick={isPlaying ? pause : play} style={{
        display:'flex', alignItems:'center', justifyContent:'center',
        width:46, height:46, borderRadius:10,
        background: isPlaying ? 'rgba(245,158,11,0.2)' : isFinished ? 'rgba(16,185,129,0.2)' : 'rgba(16,185,129,0.2)',
        border: `2px solid ${isPlaying ? '#f59e0b' : '#10b981'}`,
        color: isPlaying ? '#f59e0b' : '#10b981',
        cursor:'pointer', fontSize:18, boxShadow: isPlaying ? '0 0 20px rgba(245,158,11,0.3)' : '0 0 20px rgba(16,185,129,0.3)',
        transition:'all 0.2s',
      }} title={isPlaying ? 'Pause' : isFinished ? 'Replay' : 'Play'}>
        {isPlaying ? '⏸' : isFinished ? '↩' : '▶'}
      </button>

      {/* Step forward */}
      <button onClick={stepForward} disabled={!canForward} style={{ ...btnStyle(canForward, '#3b82f6'), opacity: canForward ? 1 : 0.3, cursor: canForward ? 'pointer' : 'default' }} title="Step Forward">⏭</button>

      {/* Divider */}
      <div style={{ width:1, height:24, background:'rgba(255,255,255,0.07)', margin:'0 4px' }} />

      {/* Speed selector */}
      <div style={{ display:'flex', alignItems:'center', gap:4 }}>
        <span style={{ fontSize:10, color:'#334155', fontFamily:"'JetBrains Mono'", marginRight:4 }}>SPEED</span>
        {SPEEDS.map(s => (
          <button key={s.label} onClick={() => setSpeed(s.ms)} style={{
            padding:'4px 10px', borderRadius:6, border:`1px solid ${playbackSpeed===s.ms ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.06)'}`,
            background: playbackSpeed===s.ms ? 'rgba(59,130,246,0.15)' : 'transparent',
            color: playbackSpeed===s.ms ? '#3b82f6' : '#475569',
            cursor:'pointer', fontSize:11, fontFamily:"'JetBrains Mono'", fontWeight:700, transition:'all 0.15s',
          }}>{s.label}</button>
        ))}
      </div>

      {/* Divider */}
      <div style={{ width:1, height:24, background:'rgba(255,255,255,0.07)', margin:'0 4px' }} />

      {/* Progress indicator */}
      <div style={{ flex:1, display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ flex:1, height:3, background:'rgba(255,255,255,0.05)', borderRadius:2, cursor:'pointer', position:'relative' }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;
            const targetStep = Math.round(ratio * (steps.length - 1));
            useStudioStore.getState().jumpToStep(targetStep);
          }}>
          <div style={{ height:'100%', width:`${steps.length > 1 ? (currentStep/(steps.length-1))*100 : 0}%`, background:'linear-gradient(90deg, #10b981, #3b82f6, #a855f7)', borderRadius:2, transition:'width 0.3s ease', position:'relative' }}>
            <div style={{ position:'absolute', right:-4, top:-4, width:10, height:10, borderRadius:'50%', background:'#fff', border:'2px solid #3b82f6', boxShadow:'0 0 8px #3b82f6' }} />
          </div>
        </div>
        <span style={{ fontSize:10, color:'#475569', fontFamily:"'JetBrains Mono'", whiteSpace:'nowrap', flexShrink:0 }}>
          {currentStep + 1} / {steps.length}
        </span>
      </div>

      {/* Status */}
      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
        <div className="dot pulse" style={{ background: isPlaying ? '#f59e0b' : isFinished ? '#10b981' : '#334155', boxShadow: isPlaying ? '0 0 6px #f59e0b' : isFinished ? '0 0 6px #10b981' : 'none' }} />
        <span style={{ fontSize:10, fontFamily:"'JetBrains Mono'", color: isPlaying ? '#f59e0b' : isFinished ? '#10b981' : '#334155', textTransform:'uppercase', letterSpacing:0.5 }}>
          {isPlaying ? 'RUNNING' : isFinished ? 'DONE' : playbackState === 'paused' ? 'PAUSED' : 'READY'}
        </span>
      </div>
    </div>
  );
}
