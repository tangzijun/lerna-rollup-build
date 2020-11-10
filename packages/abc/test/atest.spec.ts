import { sum } from "@test/abc";
import { isArray } from "lodash";
import { edf } from "@test/edf";
import { DeselectAction } from "@solidoc/vm-common";

test("adds 1 + 2 to equal 3", () => {
  console.info("isArray", isArray(""));
  console.info("edf", edf(), DeselectAction.create());
  expect(sum(1, 2)).toBe(3);
});
