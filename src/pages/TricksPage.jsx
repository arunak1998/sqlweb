import DraftExample from "../components/DraftExample";
import RunOrder from "../components/RunOrder";
import SampleTable from "../components/SampleTable";
import WordsTable from "../components/WordsTable";

export default function TricksPage() {
  return (
    <>
      <h1 className="text-[2rem] leading-tight font-extrabold tracking-tight sm:text-5xl">
        SQL <span className="text-accent">Easy Tricks</span>
      </h1>
      <p className="mt-2 text-lg text-soft">
        Start here. Three tricks that make every SQL question easier. Then go to <b className="text-ink">Basics</b> and{" "}
        <b className="text-ink">Advanced</b>: one concept at a time, each with an animation of what happens to the table.
      </p>

      <SampleTable />
      <RunOrder />
      <DraftExample />
      <WordsTable />

      <a
        href="#basics"
        className="mt-10 flex min-h-12 items-center justify-center rounded-xl bg-button px-4 text-base font-semibold text-white hover:opacity-90"
      >
        Start the Basics →
      </a>
    </>
  );
}
