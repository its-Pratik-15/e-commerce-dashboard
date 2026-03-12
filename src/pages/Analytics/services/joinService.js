/**
 * Join Service - Handles relational data enrichment
 * Optimized for performance with minimal loops and array creation
 */

/**
 * Enrich orders with customer and product information
 * Single pass through orders array with O(1) lookups
 */
export function enrichOrders(orders, customers, products) {
  // Create lookup maps once - O(n) + O(m)
  const customerMap = new Map(customers.map(c => [c.customerId, c]));
  const productMap = new Map(products.map(p => [p.productId, p]));

  // Single loop through orders - O(k)
  return orders.map(order => {
    const customer = customerMap.get(order.customerId);
    const product = productMap.get(order.productId);
    
    return {
      ...order,
      customer,
      product,
      customerName: customer?.name || 'Unknown',
      customerRegion: customer?.region || 'Unknown',
      customerType: customer?.customerType || 'Regular',
      productName: product?.name || 'Unknown Product',
      productCategory: product?.category || 'Unknown',
      productPrice: product?.price || 0
    };
  });
}

/**
 * Enrich customers with their order statistics
 * Single pass through orders, then map customers
 */
export function enrichCustomers(customers, orders) {
  // Build stats map in single pass - O(n)
  const statsMap = new Map();
  
  for (const order of orders) {
    const customerId = order.customerId;
    let stats = statsMap.get(customerId);
    
    if (!stats) {
      stats = {
        totalOrders: 0,
        totalSpent: 0,
        completedOrders: 0,
        cancelledOrders: 0,
        refundedOrders: 0
      };
      statsMap.set(customerId, stats);
    }
    
    stats.totalOrders++;
    stats.totalSpent += order.amount;
    
    if (order.orderStatus === 'Completed') stats.completedOrders++;
    else if (order.orderStatus === 'Cancelled') stats.cancelledOrders++;
    else if (order.orderStatus === 'Refunded') stats.refundedOrders++;
  }

  // Merge with customers - O(m)
  return customers.map(customer => ({
    ...customer,
    ...(statsMap.get(customer.customerId) || {
      totalOrders: 0,
      totalSpent: 0,
      completedOrders: 0,
      cancelledOrders: 0,
      refundedOrders: 0
    })
  }));
}

/**
 * Enrich products with their order statistics
 * Single pass through orders, then map products
 */
export function enrichProducts(products, orders) {
  // Build stats map in single pass - O(n)
  const statsMap = new Map();
  
  for (const order of orders) {
    const productId = order.productId;
    let stats = statsMap.get(productId);
    
    if (!stats) {
      stats = {
        totalOrders: 0,
        totalRevenue: 0,
        completedOrders: 0,
        cancelledOrders: 0,
        refundedOrders: 0
      };
      statsMap.set(productId, stats);
    }
    
    stats.totalOrders++;
    stats.totalRevenue += order.amount;
    
    if (order.orderStatus === 'Completed') stats.completedOrders++;
    else if (order.orderStatus === 'Cancelled') stats.cancelledOrders++;
    else if (order.orderStatus === 'Refunded') stats.refundedOrders++;
  }

  // Merge with products - O(m)
  return products.map(product => ({
    ...product,
    ...(statsMap.get(product.productId) || {
      totalOrders: 0,
      totalRevenue: 0,
      completedOrders: 0,
      cancelledOrders: 0,
      refundedOrders: 0
    })
  }));
}
