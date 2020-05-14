type Sign = { sign: 1 | -1 };

export type RollTermFormula = Sign & { type: "roll"; number: number; sides: number };
export type NumberTerm = Sign & { type: "number"; value: number };
export type FormulaTerm = RollTermFormula | NumberTerm;
export type Formula = FormulaTerm[];

export type RollTerm = RollTermFormula & { value: number[] };
export type ResultTerm = RollTerm | NumberTerm;
export type Result = ResultTerm[];
