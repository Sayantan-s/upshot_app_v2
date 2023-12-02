import React from "react";

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: Function
) => {
  const handleClick = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target as HTMLElement))
      callback();
  };
  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};
