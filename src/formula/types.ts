export type RollPlan = {
  type: "roll";
  count: number;
  sides: number;
  dropLowest?: number | undefined;
};
export type NumberTerm = { type: "number"; value: number };
export type FormulaTerm = RollPlan | NumberTerm;
export type Formula = FormulaTerm[];

export type RollTerm = RollPlan & {
  value: number[];
  droppedIndexes?: number[] | undefined;
};
export type ResultTerm = RollTerm | NumberTerm;
export type Result = ResultTerm[];

export type RollValue = {
  value: number;
  drop: boolean;
};
