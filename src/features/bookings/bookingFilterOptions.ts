export const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "checked-out", label: "Checked out" },
  { value: "checked-in", label: "Checked in" },
  { value: "unconfirmed", label: "Unconfirmed" },
] as const;

export const FILTER_OPERATIONS = {
  "=": "eq",
  ">": "gt",
  "<": "lt",
  ">=": "gte",
  "<=": "lte",
  CaseSensitive: "like",
  CaseInsensitive: "ilike",
  null: "is",
  "!=": "neq",
} as const;
