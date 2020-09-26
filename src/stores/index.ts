import { connect } from "./db";
import { makeResultsStore } from "./results-store";

const db = connect();
export const resultsStore = makeResultsStore(db);
