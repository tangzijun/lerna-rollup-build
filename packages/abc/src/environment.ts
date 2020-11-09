export class Env {
  public static isIos(): boolean {
    return (
      typeof navigator !== 'undefined' &&
      typeof window !== 'undefined' &&
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !window.MSStream
    );
  }

  public static isApple(): boolean {
    return typeof navigator !== 'undefined' && /Mac OS X/.test(navigator.userAgent);
  }
}
