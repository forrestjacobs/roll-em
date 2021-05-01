import type { Readable } from "svelte/store";
import { derived } from "svelte/store";
import type {
  GroupedResults,
  ResultsStoreState,
  ResultsStoreValue,
  StoredResult,
} from "./types";

export interface ListResultsStoreValue {
  results: StoredResult[];
  state: ResultsStoreState;
}

/*@__PURE__*/
function toDay(date: Date | undefined): Date | undefined {
  if (date === undefined) {
    return undefined;
  }

  const day = new Date(date);
  day.setHours(0, 0, 0, 0);
  return day;
}

function groupResults(results: StoredResult[]): GroupedResults[] {
  const groups: GroupedResults[] = [];

  let groupIndex = -1;
  let groupDay = undefined;
  for (const result of results) {
    const day = toDay(result.date);
    if (groupIndex !== -1 && groupDay === day?.getTime()) {
      groups[groupIndex].results.push(result);
    } else {
      groups.push({ day, results: [result] });
      groupIndex++;
      groupDay = groups[groupIndex].day?.getTime();
    }
  }
  return groups;
}

export function grouped(
  store: Readable<ListResultsStoreValue>
): Readable<ResultsStoreValue> {
  return derived(store, (v) => ({
    groups: groupResults(v.results),
    state: v.state,
  }));
}
