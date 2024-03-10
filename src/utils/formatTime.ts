import { format, parseISO } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date: Date, newFormat?: string): string {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function minutesToHours(minutes: number): string {
  return `${(minutes - (minutes % 60)) / 60}h ${minutes % 60}min`;
}

export function formatDateToLocale(date: string): string {
  const x: string = format(parseISO(date), 'dd-MM-yyyy');
  console.log(x);
  return x;
}
