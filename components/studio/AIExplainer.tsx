"use client";
import { useStudioStore } from "@/lib/store";

const AI_TIPS: Record<string, string[]> = {
  beginner: [
    "Think of the call stack like a stack of plates — you can only add to or remove from the top!",
    "Every time a function is called, a new 'frame' is pushed. When it returns, the frame is popped.",
    "Stack memory is fast and automatic — variables are created and destroyed with their function.",
    "Heap memory (new/malloc) stays around until you delete it. Forgetting to delete causes memory leaks!",
    "Pointers are variables that store addresses — they 'point' to where data lives in memory.",
  ],
  intermediate: [
    "Each stack frame contains: return address, saved registers, local variables, and parameters.",
    "The base pointer (BP) tracks the current frame; the stack pointer (SP) tracks the top of stack.",
    "Heap allocation uses OS calls (sbrk/mmap) under the hood — much slower than stack allocation.",
    "Recursive calls consume O(n) stack space — deep recursion risks stack overflow.",
    "Pointer arithmetic is powerful but dangerous: arr[i] == *(arr + i) in C++.",
  ],
  expert: [
    "Stack frames are aligned to 16-byte boundaries on x86-64 (System V ABI requirement).",
    "The heap allocator maintains free lists — malloc has amortized O(1) but worst-case is unpredictable.",
    "Virtual functions use vtables: an array of function pointers stored in the object's type layout.",
    "Tail call optimization (TCO) can eliminate recursive stack frames in gcc with -O2.",
    "Cache coherency: stack variables are hot in L1/L2 cache; heap traversal causes cache misses.",
  ],
};

export default function AIExplainer() {
  const { steps, currentStep, aiMode, setAIMode } = useStudioStore();
  const step = steps[currentStep];

  const tips = AI_TIPS[aiMode];
  const tip = tips[currentStep % tips.length];

  const modeColors = { beginner:'#10b981', intermediate:'#3b82f6', expert:'#a855f7' };
  const mc = modeColors[aiMode];

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column' }}>
      <div className="panel-header">
        <div style={{ fontSize:14 }}>🤖</div>
        <span className="panel-title">AI Explainer</span>
      </div>

      {/* Mode selector */}
      <div style={{ padding:'10px 12px', borderBottom:'1px solid rgba(255,255,255,0.05)', display:'flex', gap:4 }}>
        {(['beginner','intermediate','expert'] as const).map(m => (
          <button key={m} onClick={() => setAIMode(m)} style={{
            flex:1, padding:'5px 4px', borderRadius:6, border:`1px solid ${aiMode===m ? modeColors[m]+'50' : 'rgba(255,255,255,0.06)'}`,
            background: aiMode===m ? `${modeColors[m]}15` : 'transparent',
            color: aiMode===m ? modeColors[m] : '#475569', fontSize:9, fontWeight:700,
            cursor:'pointer', fontFamily:"'JetBrains Mono'", textTransform:'uppercase', letterSpacing:0.5, transition:'all 0.2s',
          }}>{m.slice(0,3)}</button>
        ))}
      </div>

      <div style={{ flex:1, overflow:'auto', padding:14, display:'flex', flexDirection:'column', gap:12 }}>

        {/* Current step explanation */}
        {step ? (
          <>
            <div style={{ padding:'12px', background:`${mc}10`, border:`1px solid ${mc}25`, borderRadius:8 }}>
              <div style={{ fontSize:9, fontWeight:800, color:mc, fontFamily:"'JetBrains Mono'", textTransform:'uppercase', letterSpacing:1, marginBottom:8, display:'flex', alignItems:'center', gap:6 }}>
                <div className="dot" style={{ background:mc, boxShadow:`0 0 6px ${mc}` }} />
                What happened?
              </div>
              <p style={{ fontSize:12, color:'#94a3b8', lineHeight:1.7, fontFamily:"'Inter'" }}>
                {aiMode === 'beginner' ? step.explanationBeginner : step.explanation}
              </p>
            </div>

            {/* Step type explanation */}
            <div style={{ padding:'10px 12px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:8 }}>
              <div style={{ fontSize:9, color:'#475569', fontFamily:"'JetBrains Mono'", textTransform:'uppercase', letterSpacing:1, marginBottom:6 }}>Operation Type</div>
              <div className="badge" style={{ background:`${mc}15`, color:mc, border:`1px solid ${mc}30`, fontSize:10 }}>
                {step.stepType.replace(/_/g,' ')}
              </div>
              <p style={{ fontSize:11, color:'#64748b', marginTop:8, lineHeight:1.6, fontFamily:"'Inter'" }}>
                {step.stepType === 'declaration' && 'A new variable is being declared and initialized in memory.'}
                {step.stepType === 'assignment' && 'An existing variable\'s value is being updated.'}
                {step.stepType === 'function_call' && 'A new stack frame is being pushed for this function.'}
                {step.stepType === 'recursion' && 'A function is calling itself — the stack grows deeper.'}
                {step.stepType === 'return' && 'Function is returning — its stack frame will be popped.'}
                {step.stepType === 'loop_start' && 'A loop is beginning — control will repeat this block.'}
                {step.stepType === 'comparison' && 'A condition is being evaluated — true or false?'}
                {step.stepType === 'allocation' && 'Memory is being allocated on the heap with new/malloc.'}
                {step.stepType === 'output' && 'Data is being written to the standard output stream.'}
              </p>
            </div>
          </>
        ) : (
          <div style={{ padding:'14px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:8, textAlign:'center', color:'#334155', fontSize:12, fontFamily:"'JetBrains Mono'" }}>
            Press ▶ to start<br />AI will explain each step
          </div>
        )}

        {/* "Why did this happen?" section */}
        <div style={{ padding:'12px', background:'rgba(6,182,212,0.07)', border:'1px solid rgba(6,182,212,0.2)', borderRadius:8 }}>
          <div style={{ fontSize:9, fontWeight:800, color:'#06b6d4', fontFamily:"'JetBrains Mono'", textTransform:'uppercase', letterSpacing:1, marginBottom:8 }}>
            💡 Did you know?
          </div>
          <p style={{ fontSize:11, color:'#64748b', lineHeight:1.7, fontFamily:"'Inter'" }}>{tip}</p>
        </div>

        {/* Operation counter */}
        {step && (
          <div style={{ padding:'10px 12px', background:'rgba(168,85,247,0.07)', border:'1px solid rgba(168,85,247,0.2)', borderRadius:8 }}>
            <div style={{ fontSize:9, color:'#a855f7', fontFamily:"'JetBrains Mono'", textTransform:'uppercase', letterSpacing:1, marginBottom:4 }}>Operations Executed</div>
            <div style={{ fontFamily:"'JetBrains Mono'", fontSize:22, fontWeight:900, color:'#e2e8f0' }}>
              {step.operationCount}
              <span style={{ fontSize:12, color:'#475569', marginLeft:4 }}>ops</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
