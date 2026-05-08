// src/lexer.ts
import { Token, TokenType } from './token'; 

// Token Rule Interfaace
interface Rule {
  regex: RegExp;
  type: TokenType | null;
}

const RULES: Rule[] = [
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

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let workingInput = input; 

  while (workingInput.length > 0) {
    let matched = false;

    for (const rule of RULES) {
      const match = workingInput.match(rule.regex);

      if (match) {
        matched = true;
        if (rule.type) {
          tokens.push({
            type: rule.type,
            value: match[0]
          });
        }
        workingInput = workingInput.slice(match[0].length);
        break;
      }
    }

    if (!matched) {
      throw new Error(`Unexpected character: ${workingInput[0]}`);
    }
  }

  return tokens;
}
