import { useEffect, useRef } from "react";

const useDidMount = (callback: () => void) => {
  const isMount = useRef(false);
  useEffect(() => {
    if (isMount.current) {
      return;
    }
    isMount.current = true;
    return callback();
    // Because we are interested in a single call during first mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useDidMount;
