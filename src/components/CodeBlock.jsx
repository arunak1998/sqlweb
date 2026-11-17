import { useState } from "react";
import { plainSql, tokenizeSql } from "../lib/sql";

const TOKEN_CLASS = {
  plain: "",
  keyword: "text-accent font-semibold",
  string: "text-good",
  number: "text-teal",
  comment: "text-muted italic",
  placeholder: "text-amber italic",
};

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Clipboard blocked (insecure page or old browser): nothing to do.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="absolute right-1.5 bottom-1.5 min-h-[30px] cursor-pointer rounded-md border border-line bg-surface px-2.5 text-xs font-semibold text-muted hover:text-ink"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function CodeBlock({ code }) {
  return (
    <div className="relative mt-1.5">
      <pre className="overflow-x-auto rounded-lg bg-surface-2 px-3 py-2.5 font-mono text-[13.5px] leading-relaxed">
        {tokenizeSql(code).map((t, i) => (
          <span key={i} className={TOKEN_CLASS[t.type]}>{t.text}</span>
        ))}
      </pre>
      <CopyButton text={plainSql(code)} />
    </div>
  );
}
