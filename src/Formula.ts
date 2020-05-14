type Sign = { sign: 1 | -1 };

export type RollPlan = Sign & { type: "roll"; count: number; sides: number };
export type NumberTerm = Sign & { type: "number"; value: number };
export type FormulaTerm = RollPlan | NumberTerm;
export type Formula = FormulaTerm[];

export type RollTerm = RollPlan & { value: number[] };
export type ResultTerm = RollTerm | NumberTerm;
export type Result = ResultTerm[];
