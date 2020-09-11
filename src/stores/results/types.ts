import type { Result } from "../../formula";

export interface StoredResult {
  id: string;
  result: Result;
  date?: Date;
}
