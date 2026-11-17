import { TABS } from "../lib/routes";

function TabBar({ activeTab }) {
  return (
    <nav aria-label="Sections" className="flex rounded-xl border border-line bg-surface p-1">
      {TABS.map((tab) => {
        const active = tab.id === activeTab;
        return (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-9 items-center rounded-lg px-3 text-[14px] font-semibold transition-colors sm:px-4 sm:text-[15px] ${
              active ? "bg-button text-white shadow-[0_0_20px_rgba(106,92,240,0.35)]" : "text-muted hover:text-ink"
            }`}
          >
            {tab.label}
          </a>
        );
      })}
    </nav>
  );
}

export default function Header({ activeTab }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-2 px-4 sm:px-6">
        <a href="#tricks" className="flex min-h-11 items-center text-lg font-bold tracking-tight">
          SQL<span className="text-accent">.notes</span>
        </a>
        <TabBar activeTab={activeTab} />
      </div>
    </header>
  );
}
