import { RefObject, useEffect } from "react";

export const useWindowScroll = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: (target: HTMLElement) => void
) => {
  useEffect(() => {
    function scrollAction(eve: Event) {
      const target = eve.target as HTMLElement;
      callback(target);
    }
    ref.current?.addEventListener("scroll", scrollAction);
    return () => {
      ref.current?.removeEventListener("scroll", scrollAction);
    };
  }, []);
};
