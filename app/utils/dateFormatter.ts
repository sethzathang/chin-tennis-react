/**
 * Formats a date string from MM/DD/YYYY format to "Month Day, Year" format
 * @param dateString - Date string in MM/DD/YYYY format
 * @returns Formatted date string (e.g., "June 15, 2024")
 */
export function formatDate(dateString: string): string {
  // Split the date string into month, day, and year
  const [month, day, year] = dateString.split('/').map(Number);
  // Create a new date object (month is 0-based in JavaScript Date)
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
} 