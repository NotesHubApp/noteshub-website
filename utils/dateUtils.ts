export function dateToString(date: Date): string {
  return date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
}

// Post dates have no time and parse as local midnight, so this keeps their calendar day in any time zone.
export function dateToIsoString(date: Date): string {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString();
}
