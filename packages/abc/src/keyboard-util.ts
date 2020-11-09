import keyboardjs, { KeyEvent } from 'keyboardjs';

export const keyBoardUtil = {
  triggerContexts: <string[]>[],
  hotkeyToTriggerMap: new Map<string, string[]>(),

  saveToTriggerMap: (hotkey: string) => {
    const triggerContexts = keyBoardUtil.triggerContexts;
    if (!keyBoardUtil.hotkeyToTriggerMap[hotkey]) {
      keyBoardUtil.hotkeyToTriggerMap[hotkey] = [];
    }
    const contexts = keyBoardUtil.hotkeyToTriggerMap[hotkey];
    triggerContexts.forEach(context => {
      if (!contexts.includes(context)) {
        contexts.push(context);
      }
    });
  },

  checkIsTrigger: (hotkey: string): boolean => {
    const contexts: [string] = keyBoardUtil.hotkeyToTriggerMap[hotkey];
    return !!keyBoardUtil.triggerContexts.find(context => {
      return contexts.includes(context);
    });
  },

  bindKeyBoard: (
    hotkey: string,
    downCallback?: ((hotkey: string, event?: KeyEvent) => void) | null,
    upCallback?: (hotkey: string, event?: KeyEvent) => void,
  ) => {
    keyBoardUtil.saveToTriggerMap(hotkey);

    keyboardjs.bind(
      hotkey,
      (event?: KeyEvent) => {
        if (!downCallback) return;
        // if (!keyBoardUtil.checkIsTrigger(hotkey)) return;
        downCallback(hotkey, event);
      },
      (event?: KeyEvent) => {
        if (!upCallback) return;
        // if (!keyBoardUtil.checkIsTrigger(hotkey)) return;
        upCallback(hotkey, event);
      },
    );
  },

  withContext: (monitorContext: string, triggerContexts: string[], fun: () => void) => {
    keyBoardUtil.triggerContexts = triggerContexts;
    keyboardjs.withContext(monitorContext, fun);
  },

  setContext: (monitorContext: string, triggerContexts: string[]) => {
    keyBoardUtil.triggerContexts = triggerContexts;
    if (keyboardjs.getContext() != monitorContext) {
      keyboardjs.setContext(monitorContext);
    }
  },

  getContext: (): [string, string[]] => {
    return [keyboardjs.getContext(), keyBoardUtil.triggerContexts];
  },

  setGlobalContext: () => {
    keyBoardUtil.setContext('global', []);
  },
};
