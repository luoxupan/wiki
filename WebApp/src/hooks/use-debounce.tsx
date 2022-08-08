import * as React from "react";

export function useDebounce(fn: Function, delay: number) {
  const ref = React.useRef({ fn, timer: null } as any);

  React.useEffect(function() {
    ref.current.fn = fn;
  }, [fn]);

  return React.useCallback(function(...args: []) {
    // @ts-ignore
    const self = this;
    if (ref.current.timer) {
      clearTimeout(ref.current.timer);
    }
    ref.current.timer = setTimeout(function() {
      ref.current.fn.apply(self, args);
    }, delay);
  }, []);
}