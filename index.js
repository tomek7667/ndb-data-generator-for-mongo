import { faker } from "@faker-js/faker";
import crypto from "crypto";
import fs from "fs";

const NUM_CUSTOMERS = 100;
const NUM_PRODUCTS = 1000;
const NUM_ORDERS = 10000;
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
let customers = [];
for (let i = 0; i < NUM_CUSTOMERS; i++) {
	customers.push({
		customerId: crypto.randomUUID(),
		name: faker.name.findName(),
		email: faker.internet.email(),
		address: faker.address.streetAddress(),
	});
}
fs.writeFileSync("customers.json", JSON.stringify(customers, null, 2));

let products = [];

for (let i = 0; i < NUM_PRODUCTS; i++) {
	products.push({
		productId: crypto.randomUUID(),
		name: faker.commerce.productName(),
		price: faker.commerce.price(),
		inventory: getRandomInt(0, 1000),
	});
}
fs.writeFileSync("products.json", JSON.stringify(products, null, 2));

let orders = [];
for (let i = 0; i < NUM_ORDERS; i++) {
	orders.push({
		orderId: crypto.randomUUID(),
		customerId: customers[getRandomInt(0, NUM_CUSTOMERS - 1)].customerId,
		productId: products[getRandomInt(0, NUM_PRODUCTS - 1)].productId,
		total: faker.commerce.price(),
		placedAt: faker.date.recent(365 * 2),
	});
}
fs.writeFileSync("orders.json", JSON.stringify(orders, null, 2));
