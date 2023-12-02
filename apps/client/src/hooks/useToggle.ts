import { useState } from "react";

interface IActions {
  toggle: () => void;
  on: () => void;
  off: () => void;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

type ReturnType = [boolean, IActions];

export const useToggle = (initialState?: boolean): ReturnType => {
  const [state, setState] = useState(initialState || false);
  return [
    state,
    {
      toggle: () => setState((prevState) => !prevState),
      on: () => setState(true),
      off: () => setState(false),
      setState,
    },
  ];
};
