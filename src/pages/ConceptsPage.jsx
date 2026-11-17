import ConceptSection from "../components/ConceptSection";
import { CONCEPTS } from "../data/concepts";
import { conceptHref } from "../lib/routes";

const PART_INFO = {
  basic: { title: "Basics", intro: "The 10 building blocks. Every advanced query is made of these." },
  advanced: { title: "Advanced", intro: "The 10 patterns that come up again and again in interviews." },
};

// Numbered buttons to pick a concept inside the tab.
function ConceptPicker({ concepts, activeId }) {
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {concepts.map((c) => {
        const active = c.id === activeId;
        return (
          <a
            key={c.id}
            href={conceptHref(c.id)}
            className={`flex min-h-9 items-center gap-1.5 rounded-lg border px-2.5 text-[13.5px] font-semibold transition-colors ${
              active ? "border-accent bg-new text-ink" : "border-line bg-surface text-muted hover:text-ink"
            }`}
          >
            <span className={active ? "text-accent" : ""}>{CONCEPTS.indexOf(c) + 1}</span>
            {c.short || c.title}
          </a>
        );
      })}
    </div>
  );
}

// "← previous" and "next →" across all 20 concepts (and back to Tricks at the start).
function PrevNext({ index }) {
  const prev = CONCEPTS[index - 1];
  const next = CONCEPTS[index + 1];
  const card = "flex min-h-14 flex-1 flex-col justify-center rounded-xl border border-line bg-surface px-4 py-2 hover:border-accent";
  return (
    <div className="mt-8 flex gap-3">
      <a href={prev ? conceptHref(prev.id) : "#tricks"} className={card}>
        <span className="text-xs font-semibold text-muted">← Previous</span>
        <span className="text-[15px] font-semibold">{prev ? `${index}. ${prev.title}` : "Tricks"}</span>
      </a>
      {next && (
        <a href={conceptHref(next.id)} className={`${card} text-right`}>
          <span className="text-xs font-semibold text-muted">Next →</span>
          <span className="text-[15px] font-semibold">{`${index + 2}. ${next.title}`}</span>
        </a>
      )}
    </div>
  );
}

export default function ConceptsPage({ part, conceptId }) {
  const concepts = CONCEPTS.filter((c) => c.part === part);
  const concept = concepts.find((c) => c.id === conceptId) || concepts[0];
  const index = CONCEPTS.indexOf(concept);
  const info = PART_INFO[part];

  return (
    <>
      <h1 className="text-[2rem] leading-tight font-extrabold tracking-tight sm:text-4xl">{info.title}</h1>
      <p className="mt-1 text-soft">{info.intro}</p>
      <ConceptPicker concepts={concepts} activeId={concept.id} />
      {/* key: a new concept starts its animation from step 1 */}
      <ConceptSection key={concept.id} concept={concept} number={index + 1} />
      <PrevNext index={index} />
    </>
  );
}
