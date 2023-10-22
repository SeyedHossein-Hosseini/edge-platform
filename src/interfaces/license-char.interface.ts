export enum LicensePlateChars {
  F = 'F',
  Z = 'Z',
  d = 'd',
  s = 's',
  R = 'R',
  W = 'W',
  A = 'A',
  G = 'G',
  O = 'O',
  Y = 'Y',
  T = 'T',
  K = 'K',
  P = 'P',
  B = 'B',
  D = 'D',
  H = 'H',
  J = 'J',
  L = 'L',
  M = 'M',
  N = 'N',
  Q = 'Q',
  C = 'C',
  S = 'S',
  U = 'U',
  V = 'V',
  E = 'E',
}

export type LicensePlateCharsInterface = {
  [key in keyof typeof LicensePlateChars]: {
    color: string;
    text?: string;
    char: string
  };
};
