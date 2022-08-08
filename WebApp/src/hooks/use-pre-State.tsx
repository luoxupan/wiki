import * as React from "react";

/**
 * @param state 
 * @returns 
 * hooks获取上一次的state
 */
export function usePreState(state: any) {
  const ref = React.useRef(null as any);
  React.useEffect(() => {
    ref.current = state
  }, [state]);
  return ref.current;
}
