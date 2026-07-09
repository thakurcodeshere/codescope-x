"use client";
import { useStudioStore } from "@/lib/store";
import { useEffect, useRef } from "react";

export default function OutputPanel() {
  const { steps, currentStep } = useStudioStore();
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [currentStep]);

  // Build incremental log — track which step produced each output line
  type LogEntry = { text: string; stepIdx: number; isNew: boolean };
  const log: LogEntry[] = [];
  steps.slice(0, currentStep + 1).forEach((step, i) => {
    const prevLen = i > 0 ? steps[i - 1].output.length : 0;
    step.output.slice(prevLen).forEach(line => {
      log.push({ text: line, stepIdx: i, isNew: i === currentStep });
    });
  });

  const curStep = steps[currentStep];
  const isPrinting = curStep?.stepType === 'output';

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="panel-header" style={{ borderRadius: 0 }}>
        <div className="dot dot-green" />
        <span className="panel-title">Console Output</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          {isPrinting && (
            <span style={{
              background: 'rgba(16,185,129,.15)', border: '1px solid rgba(16,185,129,.35)',
              borderRadius: 4, padding: '1px 7px', fontSize: 9, color: '#10b981',
              fontFamily: "'JetBrains Mono'", fontWeight: 800,
            }}>● PRINTING</span>
          )}
          <span style={{ fontSize: 10, color: '#475569', fontFamily: "'JetBrains Mono'" }}>
            {log.length} line{log.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '10px 14px',
        background: '#050508', fontFamily: "'JetBrains Mono'", fontSize: 12.5 }}>
        {/* Prompt */}
        <div style={{ color: '#334155', marginBottom: 8, fontSize: 10,
          display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: '#a855f7' }}>$</span>
          <span style={{ color: '#334155' }}>./codescope run</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.04)', marginLeft: 4 }} />
        </div>

        {log.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#334155' }}>
            <span style={{ color: '#3b82f6', fontSize: 16 }} className="cursor">█</span>
            <span style={{ fontSize: 10 }}>waiting for output...</span>
          </div>
        ) : (
          <>
            {log.map((entry, i) => (
              <div key={i} style={{
                display: 'flex', gap: 10, alignItems: 'flex-start', lineHeight: 1.85,
                padding: '1px 0',
                background: entry.isNew ? 'rgba(16,185,129,.07)' : 'transparent',
                borderLeft: `2px solid ${entry.isNew ? '#10b981' : 'transparent'}`,
                paddingLeft: entry.isNew ? 6 : 0,
                borderRadius: 2, transition: 'all .2s',
              }} className={entry.isNew ? 'float-in' : ''}>
                <span style={{ color: '#1e293b', userSelect: 'none', fontSize: 9,
                  width: 28, flexShrink: 0, paddingTop: 2, textAlign: 'right' }}>
                  S{entry.stepIdx + 1}
                </span>
                <span style={{ color: '#334155', fontSize: 10, paddingTop: 2 }}>›</span>
                <span style={{
                  color: entry.isNew ? '#10b981' : '#4ade80',
                  fontWeight: entry.isNew ? 700 : 400,
                  fontSize: entry.isNew ? 13 : 12.5, flex: 1,
                }}>
                  {entry.text}
                </span>
                {entry.isNew && (
                  <span style={{ fontSize: 8, color: '#10b981', paddingTop: 3, fontWeight: 800, flexShrink: 0 }}>NEW</span>
                )}
              </div>
            ))}
            {currentStep === steps.length - 1 && (
              <div style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,.05)',
                display: 'flex', gap: 8, fontSize: 10, color: '#334155', alignItems: 'center' }}>
                <span>Process finished with exit code</span>
                <span style={{ color: '#10b981', fontWeight: 700 }}>0</span>
                <span style={{ color: '#1e293b' }}>·</span>
                <span>{log.length} output line{log.length !== 1 ? 's' : ''}</span>
              </div>
            )}
          </>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
