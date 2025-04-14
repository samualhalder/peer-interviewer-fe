import React, { useEffect } from "react";

export default function useOutSideClick(
  currentRef: React.MutableRefObject<HTMLDivElement | null | any>,
  cb: () => void,
  isOpened: boolean
) {
  useEffect(() => {
    if (!isOpened) return;
    const element = currentRef.current;
    if (!element) return;
    const handle = (e: any) => {
      if (!element.contains(e.target)) cb();
    };
    document.addEventListener("click", handle);
    return () => {
      document.removeEventListener("click", handle);
    };
  }, [currentRef, cb]);
}
