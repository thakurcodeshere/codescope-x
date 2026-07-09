"use client";
import dynamic from "next/dynamic";
import { useStudioStore } from "@/lib/store";
import { getAllPrograms } from "@/lib/execution-engine";
import { useState } from "react";
import CallStackPanel from "@/components/studio/CallStackPanel";
import MemoryPanel from "@/components/studio/MemoryPanel";
import VariablesPanel from "@/components/studio/VariablesPanel";
import OutputPanel from "@/components/studio/OutputPanel";
import AIExplainer from "@/components/studio/AIExplainer";
import ExecutionTimeline from "@/components/studio/ExecutionTimeline";
import ExecutionControls from "@/components/studio/ExecutionControls";
import ExecutionFlow from "@/components/studio/ExecutionFlow";
import ThemeSwitcher from "@/components/studio/ThemeSwitcher";
import Link from "next/link";

const CodeEditor = dynamic(() => import("@/components/studio/CodeEditor"), { ssr: false });

type RightTab = 'flow' | 'memory' | 'stack' | 'variables';

const TAB_CONFIG: Array<{ id: RightTab; label: string; icon: string; col: string }> = [
  { id: 'flow',      label: 'Execution Flow', icon: '📋', col: '#06b6d4' },
  { id: 'memory',    label: 'Memory',         icon: '📦', col: '#f97316' },
  { id: 'stack',     label: 'Call Stack',     icon: '🌀', col: '#a855f7' },
  { id: 'variables', label: 'Variables',      icon: '✏️', col: '#10b981' },
];

const CAT_COLORS: Record<string, string> = {
  Basics: '#10b981', Recursion: '#a855f7', Sorting: '#f59e0b',
  'Data Structures': '#f97316', Algorithms: '#3b82f6',
};

const HL: Record<string, string> = {
  blue: '#3b82f6', green: '#10b981', yellow: '#f59e0b',
  red: '#ef4444', purple: '#a855f7', orange: '#f97316',
};

export default function StudioPage() {
  const { activeProgramId, loadProgram, steps, currentStep, showAI, toggleAI, theme } = useStudioStore();
  const programs = getAllPrograms();
  const [showProgramList, setShowProgramList] = useState(false);
  const [rightTab, setRightTab] = useState<RightTab>('flow');

  const step = steps[currentStep];
  const progress = steps.length > 0 ? (currentStep / (steps.length - 1)) * 100 : 0;
  const hlCol = step ? (HL[step.highlight] ?? '#3b82f6') : '#3b82f6';
  const T = theme;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column',
      background: T.uiBg, overflow: 'hidden', transition: 'background .3s' }}>

      {/* ── Top Bar ── */}
      <header style={{ height: 50, display: 'flex', alignItems: 'center', padding: '0 14px',
        borderBottom: `1px solid ${T.uiBorder}`, background: T.uiPanelHd,
        gap: 10, flexShrink: 0, zIndex: 50 }}>

        <Link href="/">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <div style={{ width: 24, height: 24, borderRadius: 6,
              background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>⚡</div>
            <span style={{ fontFamily: "'JetBrains Mono'", fontWeight: 700, fontSize: 13,
              background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CodeScope X</span>
          </div>
        </Link>

        <div style={{ width: 1, height: 24, background: T.uiBorder }} />

        {/* Program selector */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowProgramList(p => !p)} style={{
            display: 'flex', alignItems: 'center', gap: 7, padding: '4px 12px',
            borderRadius: 7, border: `1px solid ${T.uiBorder}`, background: T.uiSurface,
            color: T.uiText, cursor: 'pointer', fontFamily: "'JetBrains Mono'", fontSize: 11,
          }}>
            <span style={{ color: hlCol }}>▶</span>
            {programs.find(p => p.id === activeProgramId)?.title ?? 'Select Program'}
            <span style={{ color: T.uiTextMuted, fontSize: 9 }}>▾</span>
          </button>
          {showProgramList && (
            <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, width: 310,
              background: T.uiSurface, border: `1px solid ${T.uiBorder}`,
              borderRadius: 12, overflow: 'hidden', zIndex: 200,
              boxShadow: '0 20px 60px rgba(0,0,0,.7)' }}>
              {programs.map(p => (
                <button key={p.id} onClick={() => { loadProgram(p.id); setShowProgramList(false); }}
                  style={{ width: '100%', padding: '10px 14px', display: 'flex',
                    alignItems: 'center', gap: 10,
                    background: p.id === activeProgramId ? `${T.uiAccent}15` : 'transparent',
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    borderBottom: `1px solid ${T.uiBorder}`, transition: 'background .12s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = `${T.uiAccent}0e`}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = p.id === activeProgramId ? `${T.uiAccent}15` : 'transparent'}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%',
                    background: CAT_COLORS[p.category] ?? '#3b82f6',
                    boxShadow: `0 0 6px ${CAT_COLORS[p.category] ?? '#3b82f6'}` }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: T.uiText }}>{p.title}</div>
                    <div style={{ fontSize: 9, color: T.uiTextMuted, fontFamily: "'JetBrains Mono'",
                      textTransform: 'uppercase', letterSpacing: .5 }}>
                      {p.category} · {p.description.slice(0, 40)}…
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Step badges */}
        {step && (
          <div className="badge" style={{ background: `${hlCol}15`, color: hlCol,
            border: `1px solid ${hlCol}35`, fontSize: 9 }}>
            Step {currentStep + 1}/{steps.length}
          </div>
        )}
        {step && (
          <div className="badge" style={{ background: `${hlCol}10`, color: hlCol,
            border: `1px solid ${hlCol}25`, fontSize: 9 }}>
            Line {step.line} · {step.stepType.replace(/_/g, ' ')}
          </div>
        )}

        {/* Progress bar */}
        <div style={{ flex: 1, height: 2, background: T.uiBorder, borderRadius: 1,
          overflow: 'hidden', margin: '0 6px' }}>
          <div style={{ height: '100%', width: `${progress}%`,
            background: `linear-gradient(90deg, ${hlCol}, #a855f7)`,
            borderRadius: 1, transition: 'width 0.4s ease' }} />
        </div>

        <ThemeSwitcher />

        <button onClick={toggleAI} style={{
          display: 'flex', alignItems: 'center', gap: 5, padding: '4px 12px',
          borderRadius: 7, border: `1px solid ${showAI ? 'rgba(6,182,212,.3)' : T.uiBorder}`,
          background: showAI ? 'rgba(6,182,212,.1)' : T.uiSurface,
          color: showAI ? '#06b6d4' : T.uiTextMuted, cursor: 'pointer',
          fontFamily: "'JetBrains Mono'", fontSize: 10, transition: 'all .18s',
        }}>🤖 AI {showAI ? 'ON' : 'OFF'}</button>

        <div style={{ fontSize: 11, color: T.uiTextMuted, fontFamily: "'JetBrains Mono'" }}>
          ops: {step?.operationCount ?? 0}
        </div>
      </header>

      {/* ── Main Layout ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Left: Code Editor */}
        <div style={{ width: 420, flexShrink: 0, display: 'flex', flexDirection: 'column',
          borderRight: `1px solid ${T.uiBorder}`, background: T.editorBg }}>
          <div className="panel-header" style={{ borderRadius: 0, background: T.uiPanelHd,
            borderBottom: `1px solid ${T.uiBorder}` }}>
            <div className="dot dot-blue" />
            <span className="panel-title">Code Editor</span>
            <span style={{ marginLeft: 'auto', fontSize: 10, color: T.uiTextMuted,
              fontFamily: "'JetBrains Mono'" }}>C++ · Line {step?.line ?? 1}</span>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <CodeEditor />
          </div>
        </div>

        {/* Center: Tabbed panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Tab bar */}
          <div style={{ display: 'flex', borderBottom: `1px solid ${T.uiBorder}`,
            background: T.uiPanelHd, flexShrink: 0 }}>
            {TAB_CONFIG.map(tab => (
              <button key={tab.id} onClick={() => setRightTab(tab.id)} style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px',
                border: 'none',
                borderBottom: rightTab === tab.id ? `2px solid ${tab.col}` : '2px solid transparent',
                background: rightTab === tab.id ? `${tab.col}10` : 'transparent',
                color: rightTab === tab.id ? tab.col : T.uiTextMuted,
                cursor: 'pointer', fontFamily: "'JetBrains Mono'",
                fontSize: 10, fontWeight: rightTab === tab.id ? 800 : 400,
                transition: 'all .15s',
              }}>
                <span style={{ fontSize: 11 }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ flex: 1, overflow: 'hidden', background: T.uiSurface }}>
            {rightTab === 'flow'      && <ExecutionFlow />}
            {rightTab === 'memory'    && <MemoryPanel />}
            {rightTab === 'stack'     && <CallStackPanel />}
            {rightTab === 'variables' && <VariablesPanel />}
          </div>

          {/* Console always visible */}
          <div style={{ height: 180, flexShrink: 0, borderTop: `1px solid ${T.uiBorder}`,
            background: T.editorBg }}>
            <OutputPanel />
          </div>

          {/* Timeline */}
          <div style={{ height: 88, borderTop: `1px solid ${T.uiBorder}`, flexShrink: 0,
            background: T.uiPanelHd }}>
            <ExecutionTimeline />
          </div>

          {/* Controls */}
          <div style={{ height: 52, borderTop: `1px solid ${T.uiBorder}`, flexShrink: 0,
            background: T.uiPanelHd }}>
            <ExecutionControls />
          </div>
        </div>

        {/* Right: AI Explainer */}
        {showAI && (
          <div style={{ width: 280, flexShrink: 0, borderLeft: `1px solid ${T.uiBorder}`,
            background: T.uiSurface, overflow: 'hidden' }}>
            <AIExplainer />
          </div>
        )}
      </div>
    </div>
  );
}
