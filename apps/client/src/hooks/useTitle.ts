import { useEffect } from "react";
import { useAuth } from "./useAuth";

export const useTitle = () => {
  const { user } = useAuth();
  useEffect(() => {
    const title = document.querySelector("title");
    if (title) {
      title.textContent = user ? `Upshot@${user.userName}` : `Upshot`;
    }
  }, [user]);
};
