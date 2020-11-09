import { isArray } from "lodash";
import { edf } from "@test/edf";
// import { JsxTest } from "./jsxTest";

export * from "./environment";
// export * from "./keyboard-util";
export * from "./unique-event";
// export * from "./state-machine";

export const abc = () => {
  const isBool = isArray([]);
  console.info("isBool:", isBool);
  console.info("==11=", edf());
  console.info("=112=3322=");
  const a = Array.from([1, 2, 3]);

  // // 我是注释
  // const anc = [1, 2, 3].map((n) => n + 1);
  // const findtest = [1, 2, 3].find((n) => n > 1);
  // console.info("findtest", findtest);
  // console.info("anc", anc);
  // console.info("JsxTest:", JsxTest);
  console.info("====");
  debugger;
  // document.addEventListener("click", () => {
  //   console.info("====");
  // });

  return "我3第4包" + edf() + a + isBool + new ATest().bTest?.a;
};

class ATest {
  bTest?: BTest | undefined = new BTest();
}

class BTest {
  a: number | undefined = 123;
}
