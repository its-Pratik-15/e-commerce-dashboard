import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

/**
 * Groups data by date and sums up a value field.
 * @param {Array} data - Array of objects (e.g., orders)
 * @param {String} dateField - Field name for date
 * @param {String} valueField - Field name for value to sum (e.g., 'amount')
 * @param {String} granularity - 'day', 'month', 'year'
 * @returns {Object} - { dates: [], values: [] } for chart
 */
export const groupDataByDate = (data, dateField = 'orderDate', valueField = 'amount', granularity = 'day') => {
    const grouped = {};

    data.forEach(item => {
        const dateKey = dayjs(item[dateField]).format(granularity === 'month' ? 'MMM YYYY' : 'YYYY-MM-DD');
        if (!grouped[dateKey]) {
            grouped[dateKey] = 0;
        }
        grouped[dateKey] += item[valueField];
    });

    // Sort by date if needed, but keys might not be sortable as strings directly if format is complex.
    // Better to use a Map or sort keys after.
    // Sort dates by comparing millisecond timestamps
    const sortedKeys = Object.keys(grouped).sort((a, b) => {
        const dateA = granularity === 'month' ? dayjs(a, 'MMM YYYY') : dayjs(a, 'YYYY-MM-DD');
        const dateB = granularity === 'month' ? dayjs(b, 'MMM YYYY') : dayjs(b, 'YYYY-MM-DD');
        return dateA.valueOf() - dateB.valueOf();
    });

    return {
        labels: sortedKeys,
        values: sortedKeys.map(key => grouped[key])
    };
};

/**
 * Groups data by a category field and sums up a value or counts items.
 * @param {Array} data 
 * @param {String} categoryField 
 * @param {String} valueField - If provided, sums this field. If null, counts occurrences.
 */
export const groupDataByCategory = (data, categoryField, valueField = null) => {
    const grouped = {};

    data.forEach(item => {
        const key = item[categoryField] || 'Unknown';
        if (!grouped[key]) {
            grouped[key] = 0;
        }
        if (valueField) {
            grouped[key] += item[valueField];
        } else {
            grouped[key] += 1;
        }
    });

    const labels = Object.keys(grouped);
    const values = Object.values(grouped);

    return { labels, values };
};
