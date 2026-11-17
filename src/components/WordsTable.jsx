import { WORDS } from "../data/guide";
import { conceptHref } from "../lib/routes";
import { Card, PlainTable } from "./ui";

export default function WordsTable() {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold tracking-tight">Trick #3: words in the question → SQL</h2>
      <p className="mt-2 text-soft">Interview questions hide the answer in their words. Spot the word, pick the tool.</p>
      <Card>
        <PlainTable
          head={["If the question says", "Use"]}
          rows={WORDS.map(([phrase, use, id]) => [`"${phrase}"`, use, id])}
          renderRight={([, use, id]) => (
            <a href={conceptHref(id)} className="font-mono text-sm text-accent hover:underline">{use}</a>
          )}
        />
      </Card>
    </section>
  );
}
