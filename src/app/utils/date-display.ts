const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatOrdinalDay(day: number): string {
  if (day >= 11 && day <= 13) return `${day}th`;
  switch (day % 10) {
    case 1: return `${day}st`;
    case 2: return `${day}nd`;
    case 3: return `${day}rd`;
    default: return `${day}th`;
  }
}

export function formatShortMonthDay(date: Date, now: Date = new Date(), options?: { yearFormat?: 'full' | 'short' }): string {
  const label = `${MONTH_SHORT[date.getMonth()]} ${formatOrdinalDay(date.getDate())}`;
  if (date.getFullYear() === now.getFullYear()) return label;
  if (options?.yearFormat === 'short') {
    return `${label} '${String(date.getFullYear()).slice(-2)}`;
  }
  return `${label}, ${date.getFullYear()}`;
}
