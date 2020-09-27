import { connect } from "./db";
import { makeResultsStore } from "./results-store";

export { ResultSource, ResultsStoreState } from "./results-store";
export type { StoredResult } from "./results-store";

const db = connect();
export const resultsStore = makeResultsStore(db);
