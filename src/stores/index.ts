export { makeResultsStore as getPersonalResultsStore } from "./personal";
export { makeResultsStore as getRoomResultsStore } from "./room";
export {
  RESULTS_STORE_HAS_MORE,
  RESULTS_STORE_HAS_NO_MORE,
  RESULTS_STORE_LOADING,
} from "./types";
export type {
  ClearableResultsStore,
  GroupedResults,
  ResultsStore,
  ResultsStoreState,
  StoredResult,
} from "./types";
