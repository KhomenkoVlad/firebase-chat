import { useCallback, useState } from "react";

export function useToggle(initial: boolean = false) {
  const [state, setState] = useState(initial);

  const toggle = useCallback(() => {
    setState(prev => !prev);
  }, []);

  return <[boolean, () => void]>[state, toggle];
}
