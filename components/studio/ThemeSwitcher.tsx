"use client";
import { useState, useRef, useEffect } from "react";
import { useStudioStore } from "@/lib/store";
import { THEME_LIST, VSTheme } from "@/lib/themes";

const GROUPS = [
  { label: 'Dark Themes',  ids: ['dark-plus','monokai','dracula','nord','github-dark','one-dark-pro','tokyo-night','tokyo-night-storm','catppuccin-mocha','ayu-dark','night-owl','material-palenight','gruvbox-dark','cyberpunk','solarized-dark'] },
  { label: 'Light Themes', ids: ['light-plus','github-light','solarized-light','catppuccin-latte','ayu-light'] },
];

function ThemePreview({ theme }: { theme: VSTheme }) {
  return (
    <div style={{
      width: 44, height: 34, borderRadius: 5, overflow: 'hidden', flexShrink: 0,
      border: `1px solid ${theme.uiBorder}`, display: 'flex', flexDirection: 'column',
    }}>
      {/* Title bar */}
      <div style={{ height: 7, background: theme.uiPanelHd, display: 'flex', alignItems: 'center', paddingLeft: 3, gap: 2 }}>
        {['#ef4444','#f59e0b','#10b981'].map((c,i)=>(
          <div key={i} style={{ width: 2, height: 2, borderRadius: '50%', background: c }} />
        ))}
      </div>
      {/* Code lines */}
      <div style={{ flex: 1, background: theme.editorBg, padding: '2px 3px', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <div style={{ display: 'flex', gap: 2 }}>
          <div style={{ width: 10, height: 2, borderRadius: 1, background: theme.synKeyword }} />
          <div style={{ width: 14, height: 2, borderRadius: 1, background: theme.synFunction }} />
        </div>
        <div style={{ display: 'flex', gap: 2, paddingLeft: 4 }}>
          <div style={{ width: 8,  height: 2, borderRadius: 1, background: theme.synString }} />
          <div style={{ width: 6,  height: 2, borderRadius: 1, background: theme.synNumber }} />
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          <div style={{ width: 16, height: 2, borderRadius: 1, background: theme.synComment, opacity: .6 }} />
        </div>
      </div>
    </div>
  );
}

export default function ThemeSwitcher() {
  const { theme, setTheme } = useStudioStore();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = THEME_LIST.filter(t =>
    !search || t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px',
          borderRadius: 7, border: `1px solid ${theme.uiBorder}`,
          background: theme.uiSurface, cursor: 'pointer', transition: 'all .18s',
        }}
      >
        <ThemePreview theme={theme} />
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: theme.uiText, fontFamily: "'JetBrains Mono'" }}>
            {theme.name}
          </div>
          <div style={{ fontSize: 9, color: theme.uiTextMuted, fontFamily: "'JetBrains Mono'", textTransform: 'uppercase', letterSpacing: 1 }}>
            {theme.type} · Color Theme
          </div>
        </div>
        <span style={{ color: theme.uiTextMuted, fontSize: 10, marginLeft: 2 }}>▾</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 8px)', left: 0, width: 320,
          background: theme.uiSurface, border: `1px solid ${theme.uiBorder}`,
          borderRadius: 12, overflow: 'hidden', zIndex: 300,
          boxShadow: '0 -24px 80px rgba(0,0,0,.7)',
        }}>
          {/* Header */}
          <div style={{ padding: '10px 12px', borderBottom: `1px solid ${theme.uiBorder}`, background: theme.uiPanelHd }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: theme.uiAccent, fontFamily: "'JetBrains Mono'", textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
              🎨 VS Code Color Themes
            </div>
            <input
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search themes…"
              style={{
                width: '100%', padding: '6px 10px', borderRadius: 6, outline: 'none',
                border: `1px solid ${theme.uiBorder}`, background: theme.uiBg,
                color: theme.uiText, fontSize: 11, fontFamily: "'JetBrains Mono'",
              }}
            />
          </div>

          {/* Theme list */}
          <div style={{ maxHeight: 380, overflowY: 'auto', padding: '6px 0' }}>
            {GROUPS.map(g => {
              const items = filtered.filter(t => g.ids.includes(t.id));
              if (!items.length) return null;
              return (
                <div key={g.label}>
                  <div style={{
                    padding: '5px 14px 3px', fontSize: 9, fontWeight: 800, letterSpacing: 1.5,
                    textTransform: 'uppercase', color: theme.uiTextMuted, fontFamily: "'JetBrains Mono'",
                  }}>{g.label}</div>
                  {items.map(t => (
                    <button key={t.id} onClick={() => { setTheme(t.id); setOpen(false); }}
                      style={{
                        width: '100%', padding: '7px 14px', display: 'flex', alignItems: 'center',
                        gap: 10, border: 'none', cursor: 'pointer', textAlign: 'left',
                        background: t.id === theme.id ? `${theme.uiAccent}18` : 'transparent',
                        borderLeft: t.id === theme.id ? `3px solid ${theme.uiAccent}` : '3px solid transparent',
                        transition: 'all .12s',
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = `${theme.uiAccent}12`}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = t.id === theme.id ? `${theme.uiAccent}18` : 'transparent'}
                    >
                      <ThemePreview theme={t} />
                      <div>
                        <div style={{ fontSize: 12, fontWeight: t.id === theme.id ? 700 : 400, color: t.id === theme.id ? theme.uiAccent : theme.uiText }}>
                          {t.name}
                        </div>
                        <div style={{ fontSize: 9, color: theme.uiTextMuted, fontFamily: "'JetBrains Mono'" }}>
                          {t.type}
                        </div>
                      </div>
                      {t.id === theme.id && (
                        <span style={{ marginLeft: 'auto', color: theme.uiAccent, fontSize: 12 }}>✓</span>
                      )}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
