// The small sample tables every example uses.

export const EMP_COLS = ["id", "name", "dept", "salary"];
export const EMP = [
  [1, "Asha", "IT", 9000],
  [2, "Ravi", "IT", 7000],
  [3, "Meena", "HR", 5000],
  [4, "John", "Sales", 7000],
  [5, "Priya", "Sales", 6000],
  [6, "Karan", "HR", 6500],
];
// Colour per row by department: IT = g1, Sales = g2, HR = g3.
export const DEPT_MARKS = ["g1", "g1", "g3", "g2", "g2", "g3"];

// name + salary only
export const EMP_NS = EMP.map((r) => [r[1], r[3]]);
// name + dept + salary
export const EMP_NDS = EMP.map((r) => [r[1], r[2], r[3]]);

// Highest salary first; John before Ravi on the tie (by name).
export const EMP_NS_SORTED = [
  ["Asha", 9000],
  ["John", 7000],
  ["Ravi", 7000],
  ["Karan", 6500],
  ["Priya", 6000],
  ["Meena", 5000],
];

export const DAILY_COLS = ["day", "sales"];
export const DAILY = [[1, 10], [2, 20], [3, 30], [4, 20], [5, 40]];

export const SAMPLE_TABLE = { name: "employees", cols: EMP_COLS, rows: EMP, marks: DEPT_MARKS };

// Build a table object; `id` keeps the same table across animation steps.
export function table(name, cols, rows, extra = {}) {
  return { name, cols, rows, ...extra };
}
