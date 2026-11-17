import { useEffect, useState } from "react";
import VizTable from "./VizTable";

const STEP_MS = 2200;

// Plays a list of steps: { caption, clause?, tables: [table...] }.
// A table keeps its identity across steps through `id` (or its name),
// so rows can fade, recolour and slide instead of being redrawn.
export default function StepViz({ steps, clauses }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const step = steps[index];
  const last = steps.length - 1;

  useEffect(() => {
    if (!playing) return;
    if (index >= last) {
      setPlaying(false);
      return;
    }
    const timer = setTimeout(() => setIndex((i) => i + 1), STEP_MS);
    return () => clearTimeout(timer);
  }, [playing, index, last]);

  function play() {
    if (index >= last) setIndex(0);
    setPlaying(true);
  }

  function goTo(i) {
    setPlaying(false);
    setIndex(i);
  }

  return (
    <div data-stepviz className="mt-2 rounded-xl border border-line bg-surface/50 p-3">
      {clauses && <ClauseBar clauses={clauses} active={step.clause} />}

      <div className="flex flex-wrap items-center gap-2.5">
        {step.tables.map((table, i) => (
          <TableWithArrow key={table.id || table.name} table={table} first={i === 0} />
        ))}
      </div>

      <p key={index} className="anim-in mt-3 min-h-12 text-[15px] text-soft">
        <span className="mr-1.5 font-semibold text-accent">Step {index + 1}.</span>
        {step.caption}
      </p>

      <Controls
        index={index}
        count={steps.length}
        playing={playing}
        onBack={() => goTo(Math.max(0, index - 1))}
        onNext={() => goTo(Math.min(last, index + 1))}
        onPlay={play}
        onPause={() => setPlaying(false)}
        onDot={goTo}
      />
    </div>
  );
}

function TableWithArrow({ table, first }) {
  return (
    <>
      {!first && (
        <span className="anim-in text-xl font-bold text-muted" aria-hidden="true">
          {table.arrow || "→"}
        </span>
      )}
      <VizTable table={table} />
    </>
  );
}

function ClauseBar({ clauses, active }) {
  return (
    <div className="mb-3 flex flex-wrap gap-1.5">
      {clauses.map((c) => (
        <span
          key={c}
          className={`rounded-lg px-2 py-0.5 font-mono text-[13px] font-semibold transition-colors duration-300 ${
            c === active ? "bg-button text-white" : "bg-surface-2 text-muted"
          }`}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

const BTN = "min-h-11 cursor-pointer rounded-lg border border-line bg-surface px-3 text-sm font-semibold text-soft hover:text-ink disabled:cursor-default disabled:opacity-40";

function Controls({ index, count, playing, onBack, onNext, onPlay, onPause, onDot }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <button type="button" className={BTN} onClick={onBack} disabled={index === 0}>
        ← Back
      </button>
      <button type="button" className={BTN} onClick={onNext} disabled={index === count - 1}>
        Next →
      </button>
      <button
        type="button"
        className="min-h-11 cursor-pointer rounded-lg bg-button px-3.5 text-sm font-semibold text-white hover:opacity-90"
        onClick={playing ? onPause : onPlay}
      >
        {playing ? "❚❚ Pause" : index === count - 1 ? "↺ Replay" : "▶ Play"}
      </button>
      <div className="ml-auto flex items-center gap-1" aria-label="Steps">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to step ${i + 1}`}
            onClick={() => onDot(i)}
            className="grid size-6 cursor-pointer place-items-center"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === index ? "h-2.5 w-5 bg-accent" : "size-2.5 bg-line"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
