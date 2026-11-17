import CodeBlock from "./CodeBlock";
import StepViz from "./StepViz";
import { Callout, PlainTable, SubLabel } from "./ui";

function SpotIt({ words }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[15px]">
      <span className="mr-1 font-semibold text-ink">Spot it in a question:</span>
      {words.map((w) => (
        <span key={w} className="rounded-lg bg-surface-2 px-2 py-0.5 font-medium text-amber">{w}</span>
      ))}
    </div>
  );
}

function Extra({ extra }) {
  return (
    <>
      <SubLabel>{extra.title}</SubLabel>
      <PlainTable
        rows={extra.rows}
        renderLeft={(row) => <code className="font-mono text-sm text-accent">{row[0]}</code>}
      />
    </>
  );
}

// One concept, always in the same order:
// keyword → meaning → trick → template → animation → example → extras → spot it → watch out.
export default function ConceptSection({ concept, number }) {
  const c = concept;
  return (
    <section className="anim-in mt-6 rounded-2xl border border-line bg-surface/60 p-4 sm:p-6">
      <h2 className="flex items-center gap-2.5 text-2xl font-extrabold tracking-tight">
        <span className="grid h-8 min-w-8 place-items-center rounded-lg bg-button px-2 text-base text-white">{number}</span>
        {c.title}
      </h2>
      <p className="mt-1 text-[15px] text-muted">
        <span className="font-semibold text-soft">Use it when:</span> {c.jump}
      </p>
      <p className="mt-2 rounded-lg bg-surface px-3 py-2 font-mono text-[15px] font-semibold break-words text-accent">{c.keyword}</p>
      <p className="mt-2.5 font-medium">{c.meaning}</p>

      <Callout kind="trick" title="Easy trick">{c.trick}</Callout>

      <SubLabel>Template</SubLabel>
      <CodeBlock code={c.template} />

      <SubLabel>See it, step by step</SubLabel>
      <StepViz steps={c.steps} />

      <Callout kind="example" title="Example question">
        <p>"{c.question}"</p>
        <CodeBlock code={c.sql} />
      </Callout>

      {c.extra && <Extra extra={c.extra} />}
      <SpotIt words={c.spot} />
      <p className="mt-3 text-soft">
        <span className="font-semibold text-ink">Watch out:</span> {c.watch}
      </p>
    </section>
  );
}
