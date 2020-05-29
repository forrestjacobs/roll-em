import { randomInt } from "./rng";

function mockedRandomInt(
  mockRandomFn: jest.SpyInstance<number, []>,
  randomResult: number,
  exclusiveMax: number
): number {
  mockRandomFn.mockImplementationOnce(() => randomResult);
  return randomInt(exclusiveMax);
}

test("It generates a random int from the result of Math.random", () => {
  const randomFn = jest.spyOn(Math, "random");
  expect(mockedRandomInt(randomFn, 0, 8)).toBe(0);
  expect(mockedRandomInt(randomFn, 0.125, 8)).toBe(1);
  expect(mockedRandomInt(randomFn, 0.5, 8)).toBe(4);
  randomFn.mockRestore();
});

test("Its result is rounded down after scaling", () => {
  const randomFn = jest.spyOn(Math, "random");
  expect(mockedRandomInt(randomFn, 0.1249999999999999, 8)).toBe(0);
  expect(mockedRandomInt(randomFn, 0.2499999999999999, 8)).toBe(1);
  expect(mockedRandomInt(randomFn, 0.6249999999999999, 8)).toBe(4);
  randomFn.mockRestore();
});

test("Its result is scaled", () => {
  const randomFn = jest.spyOn(Math, "random");
  expect(mockedRandomInt(randomFn, 0.25, 4)).toBe(1);
  expect(mockedRandomInt(randomFn, 0.25, 12)).toBe(3);
  randomFn.mockRestore();
});
