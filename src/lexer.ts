// Token Types
type TokenType =
  | 'KEYWORD'
  | 'IDENTIFIER'
  | 'NUMBER'
  | 'STRING'
  | 'COLON'
  | 'LBRACKET'
  | 'RBRACKET'
  | 'DASH';

// Token Rule Interface
interface Rule {
  regex: RegExp;
  type: TokenType | null;
}

// Lexer Rules
const RULES: Rule[] = [
  { regex: /^\s+/, type: null },
  { regex: /^(BEAT|BPM|LOAD|TRACK|LOOP|SYNC|PLAY)\b/, type: 'KEYWORD' },
  { regex: /^[a-zA-Z_][a-zA-Z0-9_]*\b/, type: 'IDENTIFIER' },
  { regex: /^\d+\b/, type: 'NUMBER' },
  { regex: /^".*?"/, type: 'STRING' },
  { regex: /^:/, type: 'COLON' },
  { regex: /^\[/, type: 'LBRACKET' },
  { regex: /^\]/, type: 'RBRACKET' },
  { regex: /^--/, type: 'DASH' }
];

export default RULES;
