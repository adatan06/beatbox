// src/lexer.ts

type TokenType =
  | 'KEYWORD'
  | 'IDENTIFIER'
  | 'NUMBER'
  | 'STRING'
  | 'COLON'
  | 'LBRACKET'
  | 'RBRACKET'
  | 'DASH';

interface Token {
  type: TokenType;
  value: string;
}

const RULES = [
  { regex: /^\s+/, type: null },
  { regex: /^(BEAT|BPM|LOOP|TRACK|PLAY|REST|SYNC|LOAD)\b/, type: 'KEYWORD' },
  { regex: /^[a-zA-Z_]\w*/, type: 'IDENTIFIER' },
  { regex: /^\d+(\.\d+)?/, type: 'NUMBER' },
  { regex: /^"[^"]*"/, type: 'STRING' },
  { regex: /^:/, type: 'COLON' },
  { regex: /^\[/, type: 'LBRACKET' },
  { regex: /^\]/, type: 'RBRACKET' },
  { regex: /^--/, type: 'DASH' }
];

export function tokenize(rawInput: string): Token[] {
  const tokens: Token[] = [];

  while (rawInput.length > 0) {
    let matchFound = false;

    for (const rule of RULES) {
      
      const match = rule.regex.exec(rawInput);

      if (match) {
        const value = match[0];
        matchFound = true;

        if (rule.type !== null) {
          tokens.push({
            type: rule.type as TokenType,
            value: value
          });
        }

        rawInput = rawInput.slice(value.length);
        break;
      }
    }

    if (!matchFound) {
      throw new Error(`Unexpected character: ${rawInput[0]}`);
    }
  }

  return tokens;
}
