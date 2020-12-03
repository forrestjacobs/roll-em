import { migrate as migrateV0 } from "./migrate-from-v0";

function wrapRequest<T, U>(
  request: IDBRequest<T>,
  callback: (value: T, resolve: (value: U) => void) => void
): Promise<U> {
  return new Promise((resolve, reject) => {
    const unlisten = () => {
      request.removeEventListener("success", success);
      request.removeEventListener("error", error);
    };
    const bufferedResolve = (value: U) => {
      resolve(value);
      unlisten();
    };
    const success = () => {
      callback(request.result, bufferedResolve);
    };
    const error = () => {
      reject(request.error);
      unlisten();
    };
    request.addEventListener("success", success);
    request.addEventListener("error", error);
  });
}

function wrapValueRequest<V>(request: IDBRequest<V>): Promise<V> {
  return wrapRequest(request, (value, resolve) => {
    resolve(value);
  });
}

function transactOnStore(
  db: IDBDatabase,
  store: string,
  mode: IDBTransactionMode
): IDBObjectStore {
  return db.transaction(store, mode).objectStore(store);
}

export function add(
  db: IDBDatabase,
  store: string,
  value: any
): Promise<IDBValidKey> {
  return wrapValueRequest(
    transactOnStore(db, store, "readwrite").add(value)
  ) as Promise<IDBValidKey>;
}

export function clear(db: IDBDatabase, store: string): Promise<void> {
  return wrapValueRequest(transactOnStore(db, store, "readwrite").clear());
}

export function select(
  db: IDBDatabase,
  store: string,
  query: IDBValidKey | IDBKeyRange | null,
  direction: IDBCursorDirection,
  callback: (cursor: IDBCursorWithValue) => boolean
): Promise<IDBCursorWithValue | null> {
  return wrapRequest(
    transactOnStore(db, store, "readonly").openCursor(query, direction),
    (cursor, resolve) => {
      if (cursor !== null && callback(cursor)) {
        cursor.continue();
      } else {
        resolve(cursor);
      }
    }
  );
}

const DB_NAME = "DiceDB";

export function makeDb(): Promise<IDBDatabase> {
  const openRequest = indexedDB.open(DB_NAME, 1);
  openRequest.addEventListener("upgradeneeded", (event) => {
    if (event.oldVersion <= 0) {
      migrateV0(openRequest.result);
    }
  });
  return wrapValueRequest(openRequest);
}
