declare module "quickselect" {
  export default function quickselect<T>(
    arr: T[],
    k: number,
    left?: number,
    right?: number,
    compare?: (lhs: T, rhs: T) => number
  ): void;
}
