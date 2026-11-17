import Header from "./components/Header";
import { TABS, useRoute } from "./lib/routes";
import ConceptsPage from "./pages/ConceptsPage";
import TricksPage from "./pages/TricksPage";

export default function App() {
  const { tab, id } = useRoute();
  const part = TABS.find((t) => t.id === tab).part;

  return (
    <div className="flex min-h-dvh flex-col font-sans antialiased">
      <Header activeTab={tab} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-8 text-[17px] leading-relaxed sm:px-6 sm:pt-10">
        {part ? <ConceptsPage part={part} conceptId={id} /> : <TricksPage />}
      </main>
      <footer className="mt-16 border-t border-line px-4 py-6 text-center text-sm text-muted">
        Made by <span className="font-semibold text-soft">Arunkumar Ravichandran</span>
      </footer>
    </div>
  );
}
