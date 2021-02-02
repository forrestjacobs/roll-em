function makeResultsStore(db: IDBDatabase): IDBObjectStore {
  const store = db.createObjectStore("results", {
    keyPath: "index",
    autoIncrement: true,
  });
  store.createIndex("date", "date", {
    unique: false,
  });
  return store;
}

export function migrate(db: IDBDatabase): void {
  makeResultsStore(db);

  // We used the Web Storage API before the current IndexedDB implemenation. We had migration code here before, but
  // it wasn't worth maintaining because no one used the site.
  localStorage.clear();
}
