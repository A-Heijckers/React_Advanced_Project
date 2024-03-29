import { useEffect, useState } from "react";

export const useLocalStorage = (key, defaultValue = "") => {
  const [state, setState] = useState(
    () => window.localStorage.getItem(key) || defaultValue
  );

  useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
};
