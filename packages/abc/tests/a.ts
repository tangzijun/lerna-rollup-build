import { edf } from "@test/edf";
import { isArray } from "lodash";

export function sum(a: number, b: number): number {
  console.info("abc:", edf(), isArray([]));
  return a + b;
}
