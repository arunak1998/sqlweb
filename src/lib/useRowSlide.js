import { useLayoutEffect, useRef } from "react";

// When rows change position between renders (sorting, grouping),
// slide each row from its old spot to its new one instead of jumping.
export function useRowSlide() {
  const rows = useRef(new Map());
  const lastTop = useRef(new Map());

  useLayoutEffect(() => {
    const nextTop = new Map();
    rows.current.forEach((el, key) => {
      const top = el.offsetTop;
      nextTop.set(key, top);
      const before = lastTop.current.get(key);
      if (before === undefined || before === top) return;
      el.style.transition = "none";
      el.style.transform = `translateY(${before - top}px)`;
      requestAnimationFrame(() => {
        el.style.transition = "transform 500ms ease";
        el.style.transform = "";
      });
    });
    lastTop.current = nextTop;
  });

  // Use as: <tr ref={rowRef(key)}>
  return (key) => (el) => {
    if (el) rows.current.set(key, el);
    else rows.current.delete(key);
  };
}
