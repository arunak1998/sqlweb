import { useEffect, useState } from "react";
import { CONCEPTS } from "../data/concepts";

// The page is three tabs. The URL hash says where you are:
//   #tricks            -> Tricks tab
//   #basics/where      -> Basics tab, WHERE concept
//   #advanced          -> Advanced tab, first concept
export const TABS = [
  { id: "tricks", label: "Tricks" },
  { id: "basics", label: "Basics", part: "basic" },
  { id: "advanced", label: "Advanced", part: "advanced" },
];

const TAB_FOR_PART = { basic: "basics", advanced: "advanced" };

export function conceptHref(conceptId) {
  const concept = CONCEPTS.find((c) => c.id === conceptId);
  return `#${TAB_FOR_PART[concept.part]}/${conceptId}`;
}

export function parseHash(hash) {
  const [tab, id] = hash.replace(/^#/, "").split("/");
  const known = TABS.some((t) => t.id === tab);
  return { tab: known ? tab : "tricks", id: id || null };
}

// Current { tab, id } from the URL; jumps to the top whenever it changes.
export function useRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));

  useEffect(() => {
    function onHashChange() {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}
