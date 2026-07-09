// VS Code Theme Definitions for CodeScope X & Execium
export interface VSTheme {
  id: string;
  name: string;
  type: 'dark' | 'light';
  // Editor
  editorBg: string;
  editorFg: string;
  editorLineHl: string;
  editorGutter: string;
  editorLineNum: string;
  editorCursor: string;
  editorSelection: string;
  // Syntax
  synKeyword: string;
  synString: string;
  synNumber: string;
  synComment: string;
  synFunction: string;
  synType: string;
  synOperator: string;
  synPreprocessor: string;
  synVariable: string;
  // UI
  uiBg: string;
  uiSurface: string;
  uiBorder: string;
  uiPanelHd: string;
  uiText: string;
  uiTextMuted: string;
  uiAccent: string;
  uiSidebar: string;
}

export const THEMES: Record<string, VSTheme> = {
  // ── Dark Themes ──────────────────────────────────────
  'dark-plus': {
    id: 'dark-plus', name: 'Dark+ (Default)', type: 'dark',
    editorBg: '#1e1e1e', editorFg: '#d4d4d4', editorLineHl: '#2a2d2e', editorGutter: '#1e1e1e',
    editorLineNum: '#858585', editorCursor: '#aeafad', editorSelection: '#264f78',
    synKeyword: '#569cd6', synString: '#ce9178', synNumber: '#b5cea8', synComment: '#6a9955',
    synFunction: '#dcdcaa', synType: '#4ec9b0', synOperator: '#d4d4d4', synPreprocessor: '#c586c0', synVariable: '#9cdcfe',
    uiBg: '#1e1e1e', uiSurface: '#252526', uiBorder: '#454545', uiPanelHd: '#2d2d30',
    uiText: '#cccccc', uiTextMuted: '#858585', uiAccent: '#0e7fd0', uiSidebar: '#252526',
  },
  'light-plus': {
    id: 'light-plus', name: 'Light+ (Default)', type: 'light',
    editorBg: '#ffffff', editorFg: '#000000', editorLineHl: '#f5f5f5', editorGutter: '#ffffff',
    editorLineNum: '#237893', editorCursor: '#000000', editorSelection: '#add6ff',
    synKeyword: '#0000ff', synString: '#a31515', synNumber: '#098658', synComment: '#008000',
    synFunction: '#795e26', synType: '#267f99', synOperator: '#000000', synPreprocessor: '#af00db', synVariable: '#001080',
    uiBg: '#f3f3f3', uiSurface: '#ffffff', uiBorder: '#e7e7e7', uiPanelHd: '#f3f3f3',
    uiText: '#333333', uiTextMuted: '#737373', uiAccent: '#005fb8', uiSidebar: '#f3f3f3',
  },
  'monokai': {
    id: 'monokai', name: 'Monokai', type: 'dark',
    editorBg: '#272822', editorFg: '#f8f8f2', editorLineHl: '#3e3d32', editorGutter: '#272822',
    editorLineNum: '#90908a', editorCursor: '#f8f8f0', editorSelection: '#49483e',
    synKeyword: '#f92672', synString: '#e6db74', synNumber: '#ae81ff', synComment: '#75715e',
    synFunction: '#a6e22e', synType: '#66d9ef', synOperator: '#f92672', synPreprocessor: '#f92672', synVariable: '#f8f8f2',
    uiBg: '#272822', uiSurface: '#2d2e27', uiBorder: '#75715e', uiPanelHd: '#3e3d32',
    uiText: '#f8f8f2', uiTextMuted: '#75715e', uiAccent: '#a6e22e', uiSidebar: '#272822',
  },
  'solarized-dark': {
    id: 'solarized-dark', name: 'Solarized Dark', type: 'dark',
    editorBg: '#002b36', editorFg: '#839496', editorLineHl: '#073642', editorGutter: '#002b36',
    editorLineNum: '#586e75', editorCursor: '#839496', editorSelection: '#073642',
    synKeyword: '#859900', synString: '#2aa198', synNumber: '#d33682', synComment: '#586e75',
    synFunction: '#268bd2', synType: '#b58900', synOperator: '#93a1a1', synPreprocessor: '#cb4b16', synVariable: '#268bd2',
    uiBg: '#002b36', uiSurface: '#073642', uiBorder: '#586e75', uiPanelHd: '#073642',
    uiText: '#839496', uiTextMuted: '#586e75', uiAccent: '#268bd2', uiSidebar: '#073642',
  },
  'solarized-light': {
    id: 'solarized-light', name: 'Solarized Light', type: 'light',
    editorBg: '#fdf6e3', editorFg: '#657b83', editorLineHl: '#eee8d5', editorGutter: '#fdf6e3',
    editorLineNum: '#93a1a1', editorCursor: '#657b83', editorSelection: '#eee8d5',
    synKeyword: '#859900', synString: '#2aa198', synNumber: '#d33682', synComment: '#93a1a1',
    synFunction: '#268bd2', synType: '#b58900', synOperator: '#657b83', synPreprocessor: '#cb4b16', synVariable: '#268bd2',
    uiBg: '#eee8d5', uiSurface: '#fdf6e3', uiBorder: '#93a1a1', uiPanelHd: '#eee8d5',
    uiText: '#657b83', uiTextMuted: '#93a1a1', uiAccent: '#268bd2', uiSidebar: '#eee8d5',
  },
  'dracula': {
    id: 'dracula', name: 'Dracula', type: 'dark',
    editorBg: '#282a36', editorFg: '#f8f8f2', editorLineHl: '#44475a', editorGutter: '#282a36',
    editorLineNum: '#6272a4', editorCursor: '#f8f8f2', editorSelection: '#44475a',
    synKeyword: '#ff79c6', synString: '#f1fa8c', synNumber: '#bd93f9', synComment: '#6272a4',
    synFunction: '#50fa7b', synType: '#8be9fd', synOperator: '#ff79c6', synPreprocessor: '#ff79c6', synVariable: '#f8f8f2',
    uiBg: '#21222c', uiSurface: '#282a36', uiBorder: '#44475a', uiPanelHd: '#44475a',
    uiText: '#f8f8f2', uiTextMuted: '#6272a4', uiAccent: '#bd93f9', uiSidebar: '#21222c',
  },
  'nord': {
    id: 'nord', name: 'Nord', type: 'dark',
    editorBg: '#2e3440', editorFg: '#d8dee9', editorLineHl: '#3b4252', editorGutter: '#2e3440',
    editorLineNum: '#4c566a', editorCursor: '#d8dee9', editorSelection: '#434c5e',
    synKeyword: '#81a1c1', synString: '#a3be8c', synNumber: '#b48ead', synComment: '#4c566a',
    synFunction: '#88c0d0', synType: '#8fbcbb', synOperator: '#81a1c1', synPreprocessor: '#5e81ac', synVariable: '#d8dee9',
    uiBg: '#2e3440', uiSurface: '#3b4252', uiBorder: '#434c5e', uiPanelHd: '#3b4252',
    uiText: '#d8dee9', uiTextMuted: '#4c566a', uiAccent: '#88c0d0', uiSidebar: '#3b4252',
  },
  'github-dark': {
    id: 'github-dark', name: 'GitHub Dark', type: 'dark',
    editorBg: '#0d1117', editorFg: '#e6edf3', editorLineHl: '#161b22', editorGutter: '#0d1117',
    editorLineNum: '#6e7681', editorCursor: '#58a6ff', editorSelection: '#264f78',
    synKeyword: '#ff7b72', synString: '#a5d6ff', synNumber: '#79c0ff', synComment: '#8b949e',
    synFunction: '#d2a8ff', synType: '#79c0ff', synOperator: '#ff7b72', synPreprocessor: '#ffa657', synVariable: '#e6edf3',
    uiBg: '#0d1117', uiSurface: '#161b22', uiBorder: '#30363d', uiPanelHd: '#161b22',
    uiText: '#e6edf3', uiTextMuted: '#6e7681', uiAccent: '#58a6ff', uiSidebar: '#161b22',
  },
  'github-light': {
    id: 'github-light', name: 'GitHub Light', type: 'light',
    editorBg: '#ffffff', editorFg: '#24292f', editorLineHl: '#f6f8fa', editorGutter: '#ffffff',
    editorLineNum: '#6e7781', editorCursor: '#0969da', editorSelection: '#bde3ff',
    synKeyword: '#cf222e', synString: '#0a3069', synNumber: '#0550ae', synComment: '#6e7781',
    synFunction: '#8250df', synType: '#0550ae', synOperator: '#cf222e', synPreprocessor: '#953800', synVariable: '#24292f',
    uiBg: '#f6f8fa', uiSurface: '#ffffff', uiBorder: '#d0d7de', uiPanelHd: '#f6f8fa',
    uiText: '#24292f', uiTextMuted: '#6e7781', uiAccent: '#0969da', uiSidebar: '#f6f8fa',
  },
  'one-dark-pro': {
    id: 'one-dark-pro', name: 'One Dark Pro', type: 'dark',
    editorBg: '#282c34', editorFg: '#abb2bf', editorLineHl: '#2c313c', editorGutter: '#282c34',
    editorLineNum: '#495162', editorCursor: '#528bff', editorSelection: '#3e4451',
    synKeyword: '#c678dd', synString: '#98c379', synNumber: '#d19a66', synComment: '#5c6370',
    synFunction: '#61afef', synType: '#e5c07b', synOperator: '#c678dd', synPreprocessor: '#c678dd', synVariable: '#e06c75',
    uiBg: '#21252b', uiSurface: '#282c34', uiBorder: '#181a1f', uiPanelHd: '#21252b',
    uiText: '#abb2bf', uiTextMuted: '#5c6370', uiAccent: '#528bff', uiSidebar: '#21252b',
  },
  'tokyo-night': {
    id: 'tokyo-night', name: 'Tokyo Night', type: 'dark',
    editorBg: '#1a1b26', editorFg: '#a9b1d6', editorLineHl: '#20213a', editorGutter: '#1a1b26',
    editorLineNum: '#444b6a', editorCursor: '#c0caf5', editorSelection: '#283457',
    synKeyword: '#bb9af7', synString: '#9ece6a', synNumber: '#ff9e64', synComment: '#444b6a',
    synFunction: '#7aa2f7', synType: '#0db9d7', synOperator: '#89ddff', synPreprocessor: '#bb9af7', synVariable: '#c0caf5',
    uiBg: '#16161e', uiSurface: '#1a1b26', uiBorder: '#292e42', uiPanelHd: '#1f2335',
    uiText: '#a9b1d6', uiTextMuted: '#444b6a', uiAccent: '#7aa2f7', uiSidebar: '#1f2335',
  },
  'tokyo-night-storm': {
    id: 'tokyo-night-storm', name: 'Tokyo Night Storm', type: 'dark',
    editorBg: '#24283b', editorFg: '#a9b1d6', editorLineHl: '#2e3347', editorGutter: '#24283b',
    editorLineNum: '#545c7e', editorCursor: '#c0caf5', editorSelection: '#364a82',
    synKeyword: '#bb9af7', synString: '#9ece6a', synNumber: '#ff9e64', synComment: '#565f89',
    synFunction: '#7aa2f7', synType: '#0db9d7', synOperator: '#89ddff', synPreprocessor: '#bb9af7', synVariable: '#c0caf5',
    uiBg: '#1f2335', uiSurface: '#24283b', uiBorder: '#292e42', uiPanelHd: '#1f2335',
    uiText: '#a9b1d6', uiTextMuted: '#545c7e', uiAccent: '#7aa2f7', uiSidebar: '#1f2335',
  },
  'catppuccin-mocha': {
    id: 'catppuccin-mocha', name: 'Catppuccin Mocha', type: 'dark',
    editorBg: '#1e1e2e', editorFg: '#cdd6f4', editorLineHl: '#313244', editorGutter: '#1e1e2e',
    editorLineNum: '#585b70', editorCursor: '#f5e0dc', editorSelection: '#45475a',
    synKeyword: '#cba6f7', synString: '#a6e3a1', synNumber: '#fab387', synComment: '#585b70',
    synFunction: '#89b4fa', synType: '#94e2d5', synOperator: '#cba6f7', synPreprocessor: '#f38ba8', synVariable: '#cdd6f4',
    uiBg: '#181825', uiSurface: '#1e1e2e', uiBorder: '#313244', uiPanelHd: '#181825',
    uiText: '#cdd6f4', uiTextMuted: '#6c7086', uiAccent: '#89b4fa', uiSidebar: '#181825',
  },
  'catppuccin-latte': {
    id: 'catppuccin-latte', name: 'Catppuccin Latte', type: 'light',
    editorBg: '#eff1f5', editorFg: '#4c4f69', editorLineHl: '#e6e9ef', editorGutter: '#eff1f5',
    editorLineNum: '#8c8fa1', editorCursor: '#dc8a78', editorSelection: '#ccd0da',
    synKeyword: '#8839ef', synString: '#40a02b', synNumber: '#fe640b', synComment: '#8c8fa1',
    synFunction: '#1e66f5', synType: '#179299', synOperator: '#8839ef', synPreprocessor: '#d20f39', synVariable: '#4c4f69',
    uiBg: '#e6e9ef', uiSurface: '#eff1f5', uiBorder: '#ccd0da', uiPanelHd: '#e6e9ef',
    uiText: '#4c4f69', uiTextMuted: '#8c8fa1', uiAccent: '#1e66f5', uiSidebar: '#e6e9ef',
  },
  'ayu-dark': {
    id: 'ayu-dark', name: 'Ayu Dark', type: 'dark',
    editorBg: '#0a0e14', editorFg: '#b3b1ad', editorLineHl: '#0d1017', editorGutter: '#0a0e14',
    editorLineNum: '#3d4751', editorCursor: '#e6b450', editorSelection: '#273747',
    synKeyword: '#ff8f40', synString: '#aad94c', synNumber: '#e6b450', synComment: '#626a73',
    synFunction: '#ffb454', synType: '#59c2ff', synOperator: '#f29668', synPreprocessor: '#ff8f40', synVariable: '#b3b1ad',
    uiBg: '#0a0e14', uiSurface: '#0d1017', uiBorder: '#1a2233', uiPanelHd: '#0d1017',
    uiText: '#b3b1ad', uiTextMuted: '#3d4751', uiAccent: '#59c2ff', uiSidebar: '#0d1017',
  },
  'ayu-light': {
    id: 'ayu-light', name: 'Ayu Light', type: 'light',
    editorBg: '#fafafa', editorFg: '#5c6166', editorLineHl: '#f3f3f3', editorGutter: '#fafafa',
    editorLineNum: '#8a9199', editorCursor: '#ff9940', editorSelection: '#d1e4f4',
    synKeyword: '#fa8d3e', synString: '#86b300', synNumber: '#a37acc', synComment: '#abb0b6',
    synFunction: '#f2ae49', synType: '#399ee6', synOperator: '#ed9366', synPreprocessor: '#fa8d3e', synVariable: '#5c6166',
    uiBg: '#f0f0f0', uiSurface: '#fafafa', uiBorder: '#d9d8d7', uiPanelHd: '#f0f0f0',
    uiText: '#5c6166', uiTextMuted: '#8a9199', uiAccent: '#399ee6', uiSidebar: '#f0f0f0',
  },
  'night-owl': {
    id: 'night-owl', name: 'Night Owl', type: 'dark',
    editorBg: '#011627', editorFg: '#d6deeb', editorLineHl: '#01223a', editorGutter: '#011627',
    editorLineNum: '#496891', editorCursor: '#80a4c2', editorSelection: '#1d3b53',
    synKeyword: '#c792ea', synString: '#ecc48d', synNumber: '#f78c6c', synComment: '#637777',
    synFunction: '#82aaff', synType: '#addb67', synOperator: '#c792ea', synPreprocessor: '#7fdbca', synVariable: '#d7dbe0',
    uiBg: '#01111d', uiSurface: '#011627', uiBorder: '#1d3b53', uiPanelHd: '#01111d',
    uiText: '#d6deeb', uiTextMuted: '#496891', uiAccent: '#82aaff', uiSidebar: '#01111d',
  },
  'material-palenight': {
    id: 'material-palenight', name: 'Material Palenight', type: 'dark',
    editorBg: '#292d3e', editorFg: '#a6accd', editorLineHl: '#32374d', editorGutter: '#292d3e',
    editorLineNum: '#676e95', editorCursor: '#ffcb6b', editorSelection: '#4c5269',
    synKeyword: '#c792ea', synString: '#c3e88d', synNumber: '#f78c6c', synComment: '#676e95',
    synFunction: '#82aaff', synType: '#ffcb6b', synOperator: '#89ddff', synPreprocessor: '#c792ea', synVariable: '#a6accd',
    uiBg: '#1b1e2b', uiSurface: '#292d3e', uiBorder: '#4c5269', uiPanelHd: '#1b1e2b',
    uiText: '#a6accd', uiTextMuted: '#676e95', uiAccent: '#82aaff', uiSidebar: '#1b1e2b',
  },
  'gruvbox-dark': {
    id: 'gruvbox-dark', name: 'Gruvbox Dark', type: 'dark',
    editorBg: '#282828', editorFg: '#ebdbb2', editorLineHl: '#3c3836', editorGutter: '#282828',
    editorLineNum: '#7c6f64', editorCursor: '#ebdbb2', editorSelection: '#504945',
    synKeyword: '#fb4934', synString: '#b8bb26', synNumber: '#d3869b', synComment: '#928374',
    synFunction: '#fabd2f', synType: '#8ec07c', synOperator: '#fb4934', synPreprocessor: '#fb4934', synVariable: '#83a598',
    uiBg: '#1d2021', uiSurface: '#282828', uiBorder: '#504945', uiPanelHd: '#32302f',
    uiText: '#ebdbb2', uiTextMuted: '#928374', uiAccent: '#fabd2f', uiSidebar: '#32302f',
  },
  'cyberpunk': {
    id: 'cyberpunk', name: 'Cyberpunk', type: 'dark',
    editorBg: '#000c1e', editorFg: '#00f7f7', editorLineHl: '#001428', editorGutter: '#000c1e',
    editorLineNum: '#005f5f', editorCursor: '#ff0090', editorSelection: '#002040',
    synKeyword: '#ff0090', synString: '#ffe100', synNumber: '#bd93f9', synComment: '#005f5f',
    synFunction: '#00f7f7', synType: '#ff0090', synOperator: '#ffe100', synPreprocessor: '#ff0090', synVariable: '#00c8ff',
    uiBg: '#00060f', uiSurface: '#000c1e', uiBorder: '#003060', uiPanelHd: '#000c1e',
    uiText: '#00f7f7', uiTextMuted: '#005f5f', uiAccent: '#ff0090', uiSidebar: '#00060f',
  },
};

export const THEME_LIST = Object.values(THEMES);
export const DEFAULT_THEME_ID = 'dark-plus';
