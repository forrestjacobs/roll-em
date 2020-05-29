import { randomInt } from "./rng";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
const NUM_CHARS = CHARS.length;
const ID_LEN = 20;

export function id(): string {
  let result = "";
  for (let i = 0; i < ID_LEN; i++) {
    result += CHARS[randomInt(NUM_CHARS)];
  }
  return result;
}
