import { DRAFT_CLAUSES, DRAFT_EXAMPLE, DRAFT_QUESTIONS, DRAFT_STEPS } from "../data/guide";
import CodeBlock from "./CodeBlock";
import StepViz from "./StepViz";
import { Callout, Card, PlainTable, SubLabel } from "./ui";

// Question text pieces: plain strings, or { b: "bold phrase" }.
function Question({ parts }) {
  return (
    <p>
      "{parts.map((p, i) => (typeof p === "string" ? p : <b key={i}>{p.b}</b>))}"
    </p>
  );
}

function PhraseMap({ mapping }) {
  return (
    <ul className="mt-2">
      {mapping.map(([phrase, sql]) => (
        <li key={phrase} className="flex flex-wrap items-center gap-2 border-t border-line py-2">
          <span className="text-[15px] font-semibold text-amber">{phrase}</span>
          <span className="text-sm text-muted">→</span>
          <code className="font-mono text-sm text-accent">{sql}</code>
        </li>
      ))}
    </ul>
  );
}

export default function DraftExample() {
  return (
    <section className="mt-10" id="draft">
      <h2 className="text-xl font-bold tracking-tight">Trick #2: turn any question into SQL</h2>
      <p className="mt-2 text-soft">Ask these six questions in order. Each answer is one line of your query.</p>
      <Card>
        <PlainTable
          head={["Ask yourself", "Write"]}
          rows={DRAFT_QUESTIONS}
          renderRight={(row) => <code className="font-mono text-sm text-accent">{row[1]}</code>}
        />
      </Card>

      <Callout kind="example" title="Worked example">
        <Question parts={DRAFT_EXAMPLE.question} />
        <PhraseMap mapping={DRAFT_EXAMPLE.mapping} />
        <CodeBlock code={DRAFT_EXAMPLE.sql} />
        <SubLabel>Watch SQL run it, clause by clause</SubLabel>
        <StepViz steps={DRAFT_STEPS} clauses={DRAFT_CLAUSES} />
      </Callout>
    </section>
  );
}
