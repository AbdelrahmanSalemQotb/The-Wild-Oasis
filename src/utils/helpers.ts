import { differenceInDays, formatDistance, parseISO } from "date-fns";

/**
 * Calculates the difference in days between two dates, accepting both `Date` objects and date strings.
 * Converts date strings into `Date` objects for consistency in calculation.
 *
 * @param date1 - The first date, as a string or Date object.
 * @param date2 - The second date, as a string or Date object.
 * @returns The difference in days between the two dates.
 * @example
 * const daysDiff = subtractDates("2024-12-01", "2024-12-05");
 * console.log(daysDiff); // Output: -4
 */

export const subtractDates = (
  date1: string | Date,
  date2: string | Date
): number => {
  // Convert date1 and date2 to Date objects if they are strings
  const parsedDate1 = typeof date1 === "string" ? parseISO(date1) : date1;
  const parsedDate2 = typeof date2 === "string" ? parseISO(date2) : date2;

  // Calculate and return the difference in days
  return differenceInDays(parsedDate1, parsedDate2);
};

/**
 * Formats the distance between the provided date and the current date, returning a human-readable string.
 * The string will be relative to "now", e.g., "In 3 days" or "2 hours ago".
 *
 * @param dateStr - The date string to compare against the current date.
 * @returns A string representing the relative time distance from the current date.
 * @example
 * const relativeTime = formatDistanceFromNow("2024-12-10");
 * console.log(relativeTime); // Output: "In 5 days" (depending on the current date)
 */
export const formatDistanceFromNow = (dateStr: string): string => {
  // Parse the input date string into a Date object
  const parsedDate = parseISO(dateStr);

  // Format the distance between the parsed date and the current date
  return formatDistance(parsedDate, new Date(), { addSuffix: true })
    .replace("about ", "") // Remove "about " prefix
    .replace("in", "In"); // Capitalize "in"
};

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time

interface OptionsProps {
  end?: boolean; // Optional flag to set the time to the end of the day.
}
/**
 * Generates an ISO date string for the current day, with the time set to either the start or end of the day.
 * Useful for comparisons with Supabase timestamps, ensuring consistency regardless of milliseconds.
 *
 * @param options - Optional settings for the date output.
 * @param options.end - If true, sets the time to the last millisecond of the day (23:59:59.999); if false or omitted, sets to 00:00:00.000.
 * @returns A string representing today's date in ISO format, adjusted to either the start or end of the day.
 * @example
 * const startOfDay = getToday();
 * console.log(startOfDay); // Output: "2024-12-05T00:00:00.000Z"
 *
 * const endOfDay = getToday({ end: true });
 * console.log(endOfDay); // Output: "2024-12-05T23:59:59.999Z"
 */
export const getToday = (options: OptionsProps = {}): string => {
  const today = new Date();

  // Adjust the time based on the `end` option
  if (options.end) {
    // Set to the last millisecond of the day
    today.setUTCHours(23, 59, 59, 999);
  } else {
    // Set to the first millisecond of the day (midnight)
    today.setUTCHours(0, 0, 0, 0);
  }

  // Return the ISO string representation of the adjusted date
  return today.toISOString();
};

/**
 * Formats a numeric value as a currency string.
 * Converts a number to a currency string based on the specified or default currency (e.g., `$1,234.56` for USD).
 *
 * @param value - The number to format.
 * @param currency - The currency code (e.g., `"USD"`, `"EUR"`, `"GBP"`). Default is `"USD"`.
 *
 * @returns The formatted currency string.
 *
 * @example
 * const formatted = formatCurrency(1234.56);
 * console.log(formatted); // Output: "$1,234.56"
 *
 * const formattedEUR = formatCurrency(1234.56, "EUR");
 * console.log(formattedEUR); // Output: "€1,234.56"
 */
export const formatCurrency = (
  value: number,
  currency: string = "USD"
): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(value);

/**
 * Natural sort function for strings or numbers.
 *
 * @param a - The first value to compare.
 * @param b - The second value to compare.
 * @returns A negative value if `a` is less than `b`, a positive value if `a` is greater than `b`, or 0 if they are equal.
 *
 * @example
 * const sortedArray = ["10", "2", "1"].sort(naturalSort);
 * console.log(sortedArray); // Output: ["1", "2", "10"]
 */
export const naturalSort = (a: string | number, b: string | number): number => {
  // If both are numbers, compare them numerically
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }

  // If both are strings, proceed with natural sorting logic
  if (typeof a === "string" && typeof b === "string") {
    const regex = /(\d+|\D+)/g;

    // Split the strings into parts based on the regex
    const aParts = a.match(regex);
    const bParts = b.match(regex);

    // Iterate through the parts of both strings
    for (
      let i = 0;
      i < Math.max(aParts?.length || 0, bParts?.length || 0);
      i++
    ) {
      const aPart = aParts ? aParts[i] || "" : ""; // Fallback to empty string if part is missing
      const bPart = bParts ? bParts[i] || "" : "";

      // If both parts are numeric, compare them as numbers
      if (/^\d+$/.test(aPart) && /^\d+$/.test(bPart)) {
        const numA = parseInt(aPart, 10);
        const numB = parseInt(bPart, 10);

        if (numA !== numB) {
          return numA - numB; // Sort numerically
        }
      } else {
        // If the parts are not numbers, compare them as strings
        if (aPart !== bPart) {
          return aPart < bPart ? -1 : 1; // Sort alphabetically
        }
      }
    }

    return 0; // Return 0 if all parts are equal
  }

  // If one is a number and the other is a string, consider numbers as less than strings
  return typeof a === "number" ? -1 : 1;
};
