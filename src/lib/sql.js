// Small SQL helpers for code blocks.
// In our SQL text, [word] marks a placeholder the reader should replace.

const KEYWORDS = new Set(
  ("SELECT FROM WHERE GROUP BY ORDER HAVING LIMIT OFFSET AS AND OR NOT IN BETWEEN LIKE IS NULL " +
    "DISTINCT JOIN LEFT RIGHT INNER FULL OUTER CROSS ON CASE WHEN THEN ELSE END WITH OVER PARTITION " +
    "ROWS PRECEDING FOLLOWING CURRENT ROW DESC ASC COUNT SUM AVG MIN MAX ROW_NUMBER RANK DENSE_RANK " +
    "LAG LEAD ROUND TOP FETCH FIRST ONLY UNION ALL").split(" ")
);

const TOKEN = /(\[[^\]\n]+\])|('[^'\n]*')|(--[^\n]*)|\b([A-Z_]{2,})\b|\b(\d+(?:\.\d+)?)\b/g;

// Split SQL into pieces: { type, text }. type is one of
// "plain" | "placeholder" | "string" | "comment" | "keyword" | "number".
export function tokenizeSql(code) {
  const tokens = [];
  let last = 0;
  for (const m of code.matchAll(TOKEN)) {
    if (m.index > last) tokens.push({ type: "plain", text: code.slice(last, m.index) });
    if (m[1]) tokens.push({ type: "placeholder", text: m[1].slice(1, -1) });
    else if (m[2]) tokens.push({ type: "string", text: m[2] });
    else if (m[3]) tokens.push({ type: "comment", text: m[3] });
    else if (m[4]) tokens.push({ type: KEYWORDS.has(m[4]) ? "keyword" : "plain", text: m[4] });
    else tokens.push({ type: "number", text: m[5] });
    last = m.index + m[0].length;
  }
  if (last < code.length) tokens.push({ type: "plain", text: code.slice(last) });
  return tokens;
}

// The text the Copy button puts on the clipboard: placeholders without brackets.
export function plainSql(code) {
  return code.replace(/\[([^\]\n]+)\]/g, "$1");
}
