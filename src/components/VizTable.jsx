import { useRowSlide } from "../lib/useRowSlide";

// A table in a picture: { name, cols, rows, marks?, colMarks? }
//   marks:    one per row  -> "keep" | "drop" | "g1" | "g2" | "g3" | ""
//   colMarks: { colIndex: "new" | "dim" }

const ROW_BG = {
  keep: "bg-keep",
  g1: "bg-g1",
  g2: "bg-g2",
  g3: "bg-g3",
};

const COL_CLASS = {
  new: "bg-new! text-accent font-semibold",
  dim: "opacity-35",
};

// Stable key per row (first two cells), so a row keeps its identity
// when the table is sorted or a column is added.
function rowKeys(rows) {
  const seen = new Map();
  return rows.map((row) => {
    const base = `${row[0]}|${row[1]}`;
    const n = (seen.get(base) || 0) + 1;
    seen.set(base, n);
    return `${base}#${n}`;
  });
}

function Cell({ value, colMark }) {
  const base = "border-t border-line px-2.5 py-1.5 whitespace-nowrap transition-[background-color,opacity] duration-500";
  const extra = COL_CLASS[colMark] || "";
  if (value === null) {
    return <td className={`${base} ${extra} text-muted italic anim-in`}>NULL</td>;
  }
  return <td className={`${base} ${extra} anim-in`}>{value}</td>;
}

export default function VizTable({ table }) {
  const rowRef = useRowSlide();
  const colMarks = table.colMarks || {};
  const keys = rowKeys(table.rows);

  return (
    <div className="max-w-full overflow-x-auto anim-in">
      <p className="mb-1 font-mono text-[13px] font-semibold text-muted">{table.name}</p>
      <table className="border-separate border-spacing-0 overflow-hidden rounded-lg border border-line bg-surface font-mono text-[13.5px]">
        <thead>
          <tr>
            {table.cols.map((col, i) => (
              <th
                key={col}
                className={`bg-surface-2 px-2.5 py-1.5 text-left font-semibold text-soft anim-in ${colMarks[i] === "dim" ? "opacity-35" : ""} ${colMarks[i] === "new" ? "text-accent!" : ""}`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, r) => {
            const mark = table.marks?.[r] || "";
            const dropped = mark === "drop";
            return (
              <tr
                key={keys[r]}
                ref={rowRef(keys[r])}
                className={`transition-opacity duration-500 ${ROW_BG[mark] || ""} ${dropped ? "line-through opacity-35" : ""}`}
              >
                {row.map((value, c) => (
                  // Keyed by value: when a value changes, the cell pops in again.
                  <Cell key={`${table.cols[c]}:${value}`} value={value} colMark={colMarks[c]} />
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
