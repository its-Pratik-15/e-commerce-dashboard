/**
 * Aggregation Service - Optimized data filtering and aggregation
 * Minimizes loops and array creation for better performance
 */

import { isDateInRange } from '../utils/dateUtils';

/**
 * Apply filters to dataset - Single pass filtering
 */
export function applyFilters(data, filters) {
  return data.filter(item => {
    // Early returns for better performance
    if (filters.region && filters.region !== 'All' && item.region !== filters.region) return false;
    if (filters.status && filters.status !== 'All' && item.orderStatus !== filters.status) return false;
    if (filters.category && filters.category !== 'All' && item.category !== filters.category) return false;
    if (filters.customerType && filters.customerType !== 'All' && item.customerType !== filters.customerType) return false;
    if (!isDateInRange(item.orderDate, filters.dateRange)) return false;
    
    return true;
  });
}

/**
 * Generic aggregation - Single pass with Map for O(1) lookups
 */
export function aggregateData(data, groupBy, aggregation = 'sum', valueField = 'amount') {
  const grouped = new Map();
  
  // Single pass aggregation
  for (const item of data) {
    const key = item[groupBy] || 'Unknown';
    let group = grouped.get(key);
    
    if (!group) {
      group = { label: key, values: [], total: 0, count: 0 };
      grouped.set(key, group);
    }
    
    const value = item[valueField] || 0;
    group.values.push(value);
    group.total += value;
    group.count++;
  }

  // Calculate final values based on aggregation type
  const results = [];
  for (const group of grouped.values()) {
    let value;
    
    switch (aggregation) {
      case 'count':
        value = group.count;
        break;
      case 'avg':
        value = group.count > 0 ? group.total / group.count : 0;
        break;
      case 'min':
        value = Math.min(...group.values);
        break;
      case 'max':
        value = Math.max(...group.values);
        break;
      case 'sum':
      default:
        value = group.total;
        break;
    }
    
    results.push({
      label: group.label,
      value,
      count: group.count
    });
  }
  
  // Sort descending by value
  return results.sort((a, b) => b.value - a.value);
}

/**
 * Calculate summary statistics - Single pass
 */
export function calculateSummaryStats(data, valueField = 'amount') {
  if (data.length === 0) {
    return { total: 0, average: 0, min: 0, max: 0, count: 0 };
  }

  let total = 0;
  let min = Infinity;
  let max = -Infinity;

  // Single pass calculation
  for (const item of data) {
    const value = item[valueField] || 0;
    total += value;
    if (value < min) min = value;
    if (value > max) max = value;
  }

  return {
    total,
    average: total / data.length,
    min: min === Infinity ? 0 : min,
    max: max === -Infinity ? 0 : max,
    count: data.length
  };
}

/**
 * Group data by multiple fields - Nested Map structure
 */
export function groupByMultiple(data, groupByFields) {
  const result = new Map();
  
  for (const item of data) {
    let current = result;
    
    for (let i = 0; i < groupByFields.length; i++) {
      const field = groupByFields[i];
      const key = item[field] || 'Unknown';
      
      if (i === groupByFields.length - 1) {
        // Last level - store items
        if (!current.has(key)) current.set(key, []);
        current.get(key).push(item);
      } else {
        // Intermediate level - create nested Map
        if (!current.has(key)) current.set(key, new Map());
        current = current.get(key);
      }
    }
  }
  
  return result;
}
