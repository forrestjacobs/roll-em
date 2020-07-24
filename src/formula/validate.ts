import type { Formula } from "./types";

const MAX_TERMS = 5000;
const MAX_SIDES = 1000;
const MAX_NUMBER = 5000;

const MAX_TERMS_ERROR_MESSAGE = `Cannot add more than ${MAX_TERMS} dice and numbers`;
const MAX_SIDES_ERROR_MESSAGE = `Cannot roll a die with more than ${MAX_SIDES} sides`;
const MAX_NUMBER_ERROR_MESSAGE = `Cannot add a number greater than ${MAX_NUMBER} or less than ${-MAX_NUMBER}`;

export function validate(formula: Formula): void {
  let numTerms = 0;
  for (const term of formula) {
    if (term.type === "roll") {
      numTerms += term.count;
      if (term.sides > MAX_SIDES) {
        throw new Error(MAX_SIDES_ERROR_MESSAGE);
      }
    } else {
      numTerms++;
      if (term.value > MAX_NUMBER || term.value < -MAX_NUMBER) {
        throw new Error(MAX_NUMBER_ERROR_MESSAGE);
      }
    }
    if (numTerms > MAX_TERMS) {
      throw new Error(MAX_TERMS_ERROR_MESSAGE);
    }
  }
}
