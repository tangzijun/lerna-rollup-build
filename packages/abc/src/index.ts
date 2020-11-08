import { isArray } from "lodash";
import { edf } from "@test/edf";
import { test } from "./test";
// import { JsxTest } from "./jsxTest";

export function abc() {
  const isBool = isArray([]);
  console.info("isBool:", isBool);
  console.info("===", edf());
  console.info("=2=3322=", test());

  // // 我是注释
  // const anc = [1, 2, 3].map((n) => n + 1);
  // const findtest = [1, 2, 3].find((n) => n > 1);
  // console.info("findtest", findtest);
  // console.info("anc", anc);
  // console.info("JsxTest:", JsxTest);
  console.info("====");
  test();
  debugger;
  // document.addEventListener("click", () => {
  //   console.info("====");
  // });

  return "我来敖34包" + edf() + test() + isBool + new ATest().bTest?.a;
}

class ATest {
  bTest?: BTest | undefined;
}

class BTest {
  a: number | undefined;
}
