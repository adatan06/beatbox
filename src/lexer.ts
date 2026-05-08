export type TokenType =
  | 'KEYWORD'
  | 'IDENTIFIER'
  | 'NUMBER'
  | 'STRING'
  | 'COLON'
  | 'LBRACKET'
  | 'RBRACKET'
  | 'DASH';

export interface Token {
  type: TokenType;
  value: string;
}

interface Rule {
  regex: RegExp;
  type: TokenType | null;
}

const RULES: Rule[] = [
  { regex: /^\s+/, type: null },

  {
    regex: /^(BEAT|BPM|LOOP|TRACK|PLAY|REST|SYNC|LOAD)\b/,
    type: 'KEYWORD'
  },

  { regex: /^[a-zA-Z_]\w*/, type: 'IDENTIFIER' },

  { regex: /^\d+(\.\d+)?/, type: 'NUMBER' },

  { regex: /^"[^"]*"/, type: 'STRING' },

  { regex: /^:/, type: 'COLON' },

  { regex: /^\[/, type: 'LBRACKET' },

  { regex: /^\]/, type: 'RBRACKET' },

  { regex: /^--/, type: 'DASH' }
];

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];

  while (input.length > 0) {
    let matched = false;

    for (const rule of RULES) {
      const match = input.match(rule.regex);

      if (match) {
        matched = true;

        if (rule.type) {
          tokens.push({
            type: rule.type,
            value: match[0]
          });
        }

        input = input.slice(match[0].length);
        break;
      }
    }

    if (!matched) {
      throw new Error(`Unexpected token: ${input[0]}`);
    }
  }

  return tokens;
}

// TEST CODE
const code = `
BEAT kick
BPM 120
PLAY "music"
`;

console.log(tokenize(code));


//TOKENS 
export type TokenType =
  | 'KEYWORD'
  | 'IDENTIFIER'
  | 'NUMBER'
  | 'STRING'
  | 'COLON'
  | 'LBRACKET'
  | 'RBRACKET'
  | 'DASH';

export interface Token {
  type: TokenType;
  value: string;
}

