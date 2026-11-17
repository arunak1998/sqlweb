import { RUN_ORDER, WRITE_ORDER } from "../data/guide";
import { Callout, Card } from "./ui";

function ClauseFlow({ label, clauses, hot }) {
  return (
    <div className="mt-2">
      <p className="text-sm font-semibold text-muted">{label}</p>
      <div className="mt-1 flex flex-wrap items-center gap-1.5">
        {clauses.map((c, i) => (
          <span key={c} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-sm text-muted">→</span>}
            <span className={`rounded-lg px-2 py-0.5 font-mono text-sm font-semibold ${hot ? "bg-new text-accent" : "bg-surface-2"}`}>
              {c}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function RunOrder() {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold tracking-tight">Trick #1: the order SQL really runs</h2>
      <p className="mt-2 text-soft">You write SELECT first, but SQL reads it almost last. Knowing this order fixes most beginner errors.</p>
      <Card>
        <ClauseFlow label="You write" clauses={WRITE_ORDER} />
        <ClauseFlow label="SQL runs" clauses={RUN_ORDER} hot />
        <Callout kind="trick" title="Remember it">
          <p>
            <b>F</b>rank <b>W</b>as <b>G</b>etting <b>H</b>ungry, <b>S</b>o <b>O</b>rdered <b>L</b>unch.
          </p>
          <p className="text-soft">From · Where · Group by · Having · Select · Order by · Limit</p>
        </Callout>
        <p className="mt-3 text-sm text-soft">
          That's why a name you give in SELECT (<code className="font-mono">AS total</code>) can't be used in WHERE: WHERE has
          already run. ORDER BY runs after SELECT, so it can use it.
        </p>
      </Card>
    </section>
  );
}
