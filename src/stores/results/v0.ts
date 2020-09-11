import type { StoredResult } from "./types";

type ResultTermV0 =
  | { type: "number"; value: number }
  | { type: "roll"; count: number; sides: number; value: number[] };

interface StoredResultV0 {
  id: string;
  result: ResultTermV0[];
}

const LOCAL_STORAGE_KEY = "results";

export function load(): StoredResult[] | undefined {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  return stored === null ? undefined : (JSON.parse(stored) as StoredResultV0[]);
}

export function clean(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}
