import { sum } from "@test/abc";
import { isArray } from "lodash";
import { edf } from "@test/edf";
import { DeselectAction } from "@solidoc/vm-common";
import { ITst } from "@test/edf";

test("adds 1 + 2 to equal 3", () => {
  const a: ITst = { abc: 111 };
  console.info("isArray", isArray(""), a);
  console.info("edf", edf(), DeselectAction.create());
  expect(sum(1, 2)).toBe(3);
});
