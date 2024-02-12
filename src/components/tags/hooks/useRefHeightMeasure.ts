import { useCallback, useState } from "react";

export const useRefHeightMeasure = <T extends HTMLElement>() => {
  const [height, setHeight] = useState(0);

  const refCallback = useCallback((node: T) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return { height, refCallback };
};
