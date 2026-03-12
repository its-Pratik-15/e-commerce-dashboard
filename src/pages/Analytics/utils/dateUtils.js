/**
 * Date utility functions for filtering and manipulation
 */

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

/**
 * Check if a date is within a given range
 * @param {String|Date} date - Date to check
 * @param {Object} range - Range object with start and end dates
 * @returns {Boolean} True if date is in range
 */
export function isDateInRange(date, range) {
  if (!range || !range.start || !range.end) return true;
  
  return dayjs(date).isBetween(
    range.start,
    range.end,
    null,
    '[]' // Inclusive on both ends
  );
}

/**
 * Get date range for common periods
 * @param {String} period - Period name (today, week, month, quarter, year)
 * @returns {Object} Range object with start and end dates
 */
export function getDateRangeForPeriod(period) {
  const now = dayjs();
  
  switch (period) {
    case 'today':
      return {
        start: now.startOf('day'),
        end: now.endOf('day')
      };
    case 'yesterday':
      return {
        start: now.subtract(1, 'day').startOf('day'),
        end: now.subtract(1, 'day').endOf('day')
      };
    case 'week':
      return {
        start: now.startOf('week'),
        end: now.endOf('week')
      };
    case 'last7days':
      return {
        start: now.subtract(7, 'days').startOf('day'),
        end: now.endOf('day')
      };
    case 'month':
      return {
        start: now.startOf('month'),
        end: now.endOf('month')
      };
    case 'last30days':
      return {
        start: now.subtract(30, 'days').startOf('day'),
        end: now.endOf('day')
      };
    case 'quarter':
      return {
        start: now.startOf('quarter'),
        end: now.endOf('quarter')
      };
    case 'year':
      return {
        start: now.startOf('year'),
        end: now.endOf('year')
      };
    case 'all':
    default:
      return null;
  }
}

/**
 * Format date for display
 * @param {String|Date} date - Date to format
 * @param {String} format - Format string (default: 'MMM D, YYYY')
 * @returns {String} Formatted date string
 */
export function formatDate(date, format = 'MMM D, YYYY') {
  return dayjs(date).format(format);
}

/**
 * Get relative time string
 * @param {String|Date} date - Date to compare
 * @returns {String} Relative time string (e.g., "2 days ago")
 */
export function getRelativeTime(date) {
  return dayjs(date).fromNow();
}

/**
 * Check if date is in the past
 * @param {String|Date} date - Date to check
 * @returns {Boolean} True if date is in the past
 */
export function isPast(date) {
  return dayjs(date).isBefore(dayjs());
}

/**
 * Check if date is in the future
 * @param {String|Date} date - Date to check
 * @returns {Boolean} True if date is in the future
 */
export function isFuture(date) {
  return dayjs(date).isAfter(dayjs());
}
