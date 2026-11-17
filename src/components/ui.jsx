// Small shared building blocks.

export function Card({ children, className = "" }) {
  return <div className={`mt-3 rounded-xl border border-line bg-surface p-4 ${className}`}>{children}</div>;
}

const CALLOUT_COLOR = {
  trick: { border: "border-amber", title: "text-amber" },
  example: { border: "border-accent", title: "text-accent" },
};

// A box with a coloured left edge: "Easy trick" (amber) or "Example" (purple).
export function Callout({ kind, title, children }) {
  const color = CALLOUT_COLOR[kind];
  return (
    <div className={`mt-3 rounded-lg border-l-[3px] ${color.border} bg-surface px-3 py-2.5`}>
      <p className={`text-sm font-semibold ${color.title}`}>{title}</p>
      <div className="mt-1 text-[15px]">{children}</div>
    </div>
  );
}

export function SubLabel({ children }) {
  return <p className="mt-4 text-sm font-semibold text-ink">{children}</p>;
}

// Two-column table for cheat sheets. Each row is [left, right, ...extra];
// renderLeft / renderRight can draw a cell differently (e.g. as code).
export function PlainTable({ head, rows, renderLeft, renderRight }) {
  return (
    <table className="w-full text-left text-[15px]">
      {head && (
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} className="pb-1.5 font-semibold text-muted">{h}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-t border-line align-top">
            <td className="py-2 pr-3 text-soft">{renderLeft ? renderLeft(row) : row[0]}</td>
            <td className="py-2">{renderRight ? renderRight(row) : row[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
