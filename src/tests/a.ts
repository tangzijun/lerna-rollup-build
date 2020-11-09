import { abc } from "@test/abc";
import { isArray } from "lodash";

export function sum(a: number, b: number): number {
  console.info("abc:", abc(), isArray([]));
  return a + b;
}
