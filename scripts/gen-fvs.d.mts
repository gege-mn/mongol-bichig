import type { FvsRegistration, JoiningPosition } from '../src/types.js';

export function readStandardizedVariants(): Array<{
  base: number;
  fvs: number;
  notInUse: boolean;
  positions: string[];
}>;

export function deriveFvs(): {
  hudum: FvsRegistration[];
  otherWritingSystems: Array<{ base: number; position: JoiningPosition; fvs: number }>;
  notInUse: Array<{ base: number; fvs: number }>;
};
