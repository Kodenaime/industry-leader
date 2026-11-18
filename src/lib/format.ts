export function formatDate(value: string, options?: Intl.DateTimeFormatOptions) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
    ...options,
  }).format(date);
}

export function formatShortDate(value: string) {
  return formatDate(value, { month: "short", day: "numeric", year: "numeric" });
}

export function formatMonthYear(value: string) {
  return formatDate(value, { month: "long", year: "numeric" });
}
