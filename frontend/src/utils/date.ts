/**
 * Formats an ISO date string or Date object into a readable month and year,
 * e.g., "Jul 2023".
 */
export function formatMonthYear(dateString?: string | Date): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC' // Keep date as stored
  }).format(date);
}

/**
 * Formats a start and end date range into "Jul 2023 — May 2025" or "Aug 2025 — Present".
 */
export function formatDateRange(startDate?: string | Date, endDate?: string | Date): string {
  const start = formatMonthYear(startDate);
  const end = formatMonthYear(endDate);

  if (start && end) {
    return `${start} — ${end}`;
  }
  if (start && !end) {
    return `${start} — Present`;
  }
  if (!start && end) {
    return end;
  }
  return '';
}
