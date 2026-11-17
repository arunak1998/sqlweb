import { SAMPLE_TABLE } from "../data/tables";
import VizTable from "./VizTable";
import { Card } from "./ui";

function Swatch({ className }) {
  return <i className={`mr-1 inline-block size-3 rounded-[3px] align-[-1px] ${className}`} />;
}

function Legend() {
  return (
    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted">
      <span><Swatch className="bg-keep" />row kept</span>
      <span><Swatch className="bg-surface-2" /><s>row removed</s></span>
      <span><Swatch className="bg-g1" /><Swatch className="bg-g2" /><Swatch className="bg-g3" />same group</span>
      <span><Swatch className="bg-new" />new column</span>
      <span><i className="text-amber">amber words</i> = replace with yours</span>
    </div>
  );
}

export default function SampleTable() {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold tracking-tight">The table we use everywhere</h2>
      <Card>
        <p className="mb-3 text-sm text-soft">
          Almost every example uses this one small table, so you learn it once. A few concepts add a tiny table of their own.
          Every concept has an animation: press <b className="text-ink">▶ Play</b>, or step through it with <b className="text-ink">Next →</b>.
        </p>
        <VizTable table={SAMPLE_TABLE} />
        <Legend />
      </Card>
    </section>
  );
}
