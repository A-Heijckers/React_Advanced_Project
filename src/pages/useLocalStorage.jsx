import { useEffect, useState } from "react";

export const useLocalStorage = (key, defaultValue = "") => {
  const [state, setState] = useState(
    () => window.localStorage.getItem(key) || defaultValue
  );

  useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [key, state]);

  // localStorage.clear(); // To clear domain = Takes no arguments, and empties the entire storage object for that domain
  return [state, setState];
};