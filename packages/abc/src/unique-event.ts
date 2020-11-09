export type CallbackFun = (...arg: any) => any;
export class UniqueEvent {
  public static eventMap = new WeakMap<HTMLElement, Map<string, CallbackFun>>();
  public static addEventListener(dom: HTMLElement, type: string, callback: CallbackFun) {
    if (!this.eventMap.has(dom)) {
      this.eventMap.set(dom, new Map());
    }
    const funMap = this.eventMap.get(dom);
    const oldCallback = funMap?.get(type);
    oldCallback && dom.removeEventListener(type, oldCallback);
    funMap?.set(type, callback);
    dom.addEventListener(type, callback);
  }
}
