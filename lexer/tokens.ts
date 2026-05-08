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

