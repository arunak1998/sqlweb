// Content for the three "Trick" sections at the top of the page.

import { EMP_NDS, table } from "./tables";

const NDS = ["name", "dept", "salary"];

export const WRITE_ORDER = ["SELECT", "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT"];
export const RUN_ORDER = ["FROM", "WHERE", "GROUP BY", "HAVING", "SELECT", "ORDER BY", "LIMIT"];

export const DRAFT_QUESTIONS = [
  ["1. Which table has the data?", "FROM / JOIN"],
  ["2. Which rows do I need?", "WHERE"],
  ["3. Does it say \"each\" or \"per\"?", "GROUP BY"],
  ["4. Filter after counting or summing?", "HAVING"],
  ["5. What should I show?", "SELECT"],
  ["6. Sorted? Only the top few?", "ORDER BY / LIMIT"],
];

export const DRAFT_EXAMPLE = {
  question: [
    "For ", { b: "each department" }, ", show the ", { b: "total salary" }, " of people ",
    { b: "earning more than 5500" }, ". Keep only departments with a ", { b: "total above 12000" },
    ", ", { b: "biggest first" }, ".",
  ],
  mapping: [
    ["earning more than 5500", "WHERE salary > 5500"],
    ["each department", "GROUP BY dept"],
    ["total above 12000", "HAVING SUM(salary) > 12000"],
    ["total salary", "SELECT dept, SUM(salary) AS total"],
    ["biggest first", "ORDER BY total DESC"],
  ],
  sql: "SELECT dept, SUM(salary) AS total\nFROM employees\nWHERE salary > 5500\nGROUP BY dept\nHAVING SUM(salary) > 12000\nORDER BY total DESC;",
};

// The worked example played in run order, one clause per step.
const AFTER_WHERE = [EMP_NDS[0], EMP_NDS[1], EMP_NDS[3], EMP_NDS[4], EMP_NDS[5]];

export const DRAFT_STEPS = [
  { clause: "FROM", caption: "FROM employees: SQL starts by getting the table.", tables: [table("employees", NDS, EMP_NDS, { id: "rows" })] },
  { clause: "WHERE", caption: "WHERE salary > 5500 checks each row. Meena (5000) is removed.", tables: [table("employees", NDS, EMP_NDS, { id: "rows", marks: ["keep", "keep", "drop", "keep", "keep", "keep"] })] },
  { clause: "GROUP BY", caption: "GROUP BY dept puts the remaining rows into department buckets.", tables: [table("buckets", NDS, AFTER_WHERE, { id: "rows", marks: ["g1", "g1", "g2", "g2", "g3"] })] },
  {
    clause: "HAVING",
    caption: "Each bucket is summed. HAVING SUM(salary) > 12000 removes HR (only 6500 left after WHERE).",
    tables: [
      table("buckets", NDS, AFTER_WHERE, { id: "rows", marks: ["g1", "g1", "g2", "g2", "g3"] }),
      table("groups", ["dept", "total"], [["HR", 6500], ["Sales", 13000], ["IT", 16000]], { id: "groups", marks: ["drop", "keep", "keep"] }),
    ],
  },
  { clause: "SELECT", caption: "SELECT dept, SUM(salary) AS total picks what to show.", tables: [table("groups", ["dept", "total"], [["Sales", 13000], ["IT", 16000]], { id: "groups", marks: ["g2", "g1"] })] },
  { clause: "ORDER BY", caption: "ORDER BY total DESC puts the biggest first. Done!", tables: [table("result", ["dept", "total"], [["IT", 16000], ["Sales", 13000]], { id: "groups", marks: ["g1", "g2"] })] },
];

export const DRAFT_CLAUSES = ["FROM", "WHERE", "GROUP BY", "HAVING", "SELECT", "ORDER BY"];

// "If the question says ... use ..." Third value = section id.
export const WORDS = [
  ["each / per / by", "GROUP BY", "group-by"],
  ["only / who / where", "WHERE", "where"],
  ["groups with more than N", "HAVING", "having"],
  ["unique / different", "DISTINCT", "distinct"],
  ["how many / total / average", "COUNT / SUM / AVG", "aggregates"],
  ["with their / along with", "JOIN", "joins"],
  ["never / without / missing", "LEFT JOIN … IS NULL", "joins"],
  ["label / category / if", "CASE WHEN", "case-when"],
  ["more than the average", "subquery or CTE", "subquery-cte"],
  ["duplicate / more than once", "GROUP BY … HAVING COUNT(*) > 1", "duplicates"],
  ["top N / highest N", "ORDER BY … DESC LIMIT N", "top-n"],
  ["2nd / Nth highest", "DISTINCT + OFFSET, or DENSE_RANK", "nth-highest"],
  ["next to each row", "window function OVER ()", "window"],
  ["rank / position", "RANK / DENSE_RANK", "rank"],
  ["highest in each", "ROW_NUMBER + PARTITION BY", "top-n-per-group"],
  ["running / cumulative / so far", "SUM() OVER (ORDER BY)", "running-total"],
  ["rolling / last 7 days", "AVG() OVER (ROWS …)", "moving-average"],
  ["vs last month / previous", "LAG()", "mom-growth"],
  ["A and B side by side", "SUM(CASE WHEN …)", "conditional-agg"],
];
