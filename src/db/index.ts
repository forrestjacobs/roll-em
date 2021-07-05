import sqlite from "sqlite3";
import { v4 } from "uuid";

export type Room = {
  id: string;
  name: string;
};

const db = new sqlite.Database("rollem.sqlite3");

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS room (id TEXT PRIMARY KEY, name TEXT)");
});

export function getRoom(id: string): Promise<Room | void> {
  return new Promise((resolve, reject) => {
    db.get("SELECT id, name FROM room WHERE id = $id", { id }, (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve();
      } else {
        resolve({ id, name: row.name });
      }
    });
  });
}

export function createRoom(name: string): Promise<Room> {
  const id = v4();
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO room VALUES ($id, $name)", { id, name }, (err) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve({ id, name });
      }
    });
  });
}
