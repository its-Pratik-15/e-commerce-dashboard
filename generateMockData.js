import fs from 'fs';
import { fakerEN_IN as faker } from '@faker-js/faker';

const PRODUCTS_COUNT = 50;
const CUSTOMERS_COUNT = 100;
const ORDERS_COUNT = 2000;

const CATEGORIES = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Beauty'];
const REGIONS = ['North India', 'South India', 'East India', 'West India', 'Central India'];
const PAYMENT_METHODS = ['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Cash on Delivery'];
const ORDER_STATUSES = ['Completed', 'Processing', 'Shipped', 'Cancelled', 'Refunded'];
const CUSTOMER_TYPES = ['Regular', 'Premium', 'VIP'];

// Generate Products
const products = Array.from({ length: PRODUCTS_COUNT }).map(() => {
    const category = faker.helpers.arrayElement(CATEGORIES);
    return {
        productId: faker.string.uuid(),
        name: faker.commerce.productName(),
        category,
        price: parseFloat(faker.commerce.price({ min: 500, max: 50000, dec: 2 }))
    };
});

// Generate Customers
const customers = Array.from({ length: CUSTOMERS_COUNT }).map(() => ({
    customerId: faker.string.uuid(),
    name: faker.person.fullName(),
    region: faker.helpers.arrayElement(REGIONS),
    customerType: faker.helpers.arrayElement(CUSTOMER_TYPES),
    signupDate: faker.date.past({ years: 2 }).toISOString()
}));

// Generate Orders
const orders = Array.from({ length: ORDERS_COUNT }).map(() => {
    const customer = faker.helpers.arrayElement(customers);
    const product = faker.helpers.arrayElement(products);
    
    return {
        orderId: faker.string.uuid(),
        customerId: customer.customerId,
        productId: product.productId,
        amount: product.price * faker.number.int({ min: 1, max: 5 }), // Quantity * Price approximation
        category: product.category,
        region: customer.region,
        paymentMethod: faker.helpers.arrayElement(PAYMENT_METHODS),
        orderStatus: faker.helpers.arrayElement(ORDER_STATUSES),
        orderDate: faker.date.past({ years: 1 }).toISOString()
    };
});

// Write to files
const dataDir = './src/data';
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

fs.writeFileSync(`${dataDir}/products.json`, JSON.stringify(products, null, 2));
fs.writeFileSync(`${dataDir}/customers.json`, JSON.stringify(customers, null, 2));
fs.writeFileSync(`${dataDir}/orders.json`, JSON.stringify(orders, null, 2));

console.log('Mock data generated successfully!');
