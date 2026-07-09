import { create } from 'zustand';
import { ExecutionStep, getAllPrograms, getProgramSteps, SAMPLE_PROGRAMS } from './execution-engine';
import { VSTheme, THEMES, DEFAULT_THEME_ID } from './themes';

export type PanelView = 'memory' | 'stack' | 'variables' | 'output' | 'ai';
export type PlaybackState = 'idle' | 'playing' | 'paused' | 'finished';

interface StudioState {
  // Editor
  code: string;
  activeProgramId: string;
  setCode: (code: string) => void;
  setActiveProgram: (id: string) => void;

  // Execution
  steps: ExecutionStep[];
  currentStep: number;
  playbackState: PlaybackState;
  playbackSpeed: number; // ms between steps
  autoPlayInterval: ReturnType<typeof setInterval> | null;

  // Actions
  loadProgram: (id: string) => void;
  play: () => void;
  pause: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  restart: () => void;
  setSpeed: (speed: number) => void;
  jumpToStep: (step: number) => void;

  // UI
  activePanels: PanelView[];
  togglePanel: (panel: PanelView) => void;
  showAI: boolean;
  toggleAI: () => void;
  aiMode: 'beginner' | 'intermediate' | 'expert';
  setAIMode: (mode: 'beginner' | 'intermediate' | 'expert') => void;
  // Theme
  theme: VSTheme;
  setTheme: (id: string) => void;
}

export const useStudioStore = create<StudioState>((set, get) => ({
  code: SAMPLE_PROGRAMS.for_loop.code,
  activeProgramId: 'for_loop',
  steps: getProgramSteps('for_loop'),
  currentStep: 0,
  playbackState: 'idle',
  playbackSpeed: 1200,
  autoPlayInterval: null,
  activePanels: ['memory', 'stack', 'variables', 'output'],
  showAI: true,
  aiMode: 'beginner',
  theme: THEMES[DEFAULT_THEME_ID],

  setCode: (code) => set({ code }),

  setActiveProgram: (id) => {
    set({ activeProgramId: id, code: SAMPLE_PROGRAMS[id]?.code ?? '', steps: getProgramSteps(id), currentStep: 0, playbackState: 'idle' });
  },

  loadProgram: (id) => {
    const { autoPlayInterval } = get();
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    set({
      activeProgramId: id,
      code: SAMPLE_PROGRAMS[id]?.code ?? '',
      steps: getProgramSteps(id),
      currentStep: 0,
      playbackState: 'idle',
      autoPlayInterval: null
    });
  },

  play: () => {
    const { steps, currentStep, playbackSpeed, autoPlayInterval } = get();
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    if (currentStep >= steps.length - 1) { set({ currentStep: 0 }); }

    const interval = setInterval(() => {
      const { currentStep, steps } = get();
      if (currentStep >= steps.length - 1) {
        clearInterval(interval);
        set({ playbackState: 'finished', autoPlayInterval: null });
        return;
      }
      set({ currentStep: currentStep + 1 });
    }, playbackSpeed);

    set({ playbackState: 'playing', autoPlayInterval: interval });
  },

  pause: () => {
    const { autoPlayInterval } = get();
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    set({ playbackState: 'paused', autoPlayInterval: null });
  },

  stepForward: () => {
    const { currentStep, steps, autoPlayInterval } = get();
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    if (currentStep < steps.length - 1) {
      set({ currentStep: currentStep + 1, playbackState: 'paused', autoPlayInterval: null });
    }
  },

  stepBackward: () => {
    const { currentStep, autoPlayInterval } = get();
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1, playbackState: 'paused', autoPlayInterval: null });
    }
  },

  restart: () => {
    const { autoPlayInterval } = get();
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    set({ currentStep: 0, playbackState: 'idle', autoPlayInterval: null });
  },

  setSpeed: (speed) => {
    const { playbackState, autoPlayInterval } = get();
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    set({ playbackSpeed: speed, autoPlayInterval: null });
    if (playbackState === 'playing') get().play();
  },

  jumpToStep: (step) => {
    const { autoPlayInterval, steps } = get();
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    set({ currentStep: Math.max(0, Math.min(step, steps.length - 1)), playbackState: 'paused', autoPlayInterval: null });
  },

  togglePanel: (panel) => {
    const { activePanels } = get();
    set({ activePanels: activePanels.includes(panel) ? activePanels.filter(p => p !== panel) : [...activePanels, panel] });
  },

  toggleAI: () => set((s) => ({ showAI: !s.showAI })),
  setAIMode: (mode) => set({ aiMode: mode }),
  setTheme: (id) => set({ theme: THEMES[id] ?? THEMES[DEFAULT_THEME_ID] }),
}));
