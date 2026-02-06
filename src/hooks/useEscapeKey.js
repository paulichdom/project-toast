import { useEffect } from "react";

export const useEscapeKey = (callback) => {
  useEffect(() => {
    const escapeKeyListener = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        callback();
      }
    };

    document.addEventListener("keydown", escapeKeyListener);

    return () => {
      document.removeEventListener("keydown", escapeKeyListener);
    };
  }, [callback]);
};
