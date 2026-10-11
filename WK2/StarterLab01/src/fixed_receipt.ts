// Program requirements:
// Items can be added to the grocery list.
// Items can be deleted from the grocery list.
// The subtotal is calculated without tax.
// The total is calculated with tax.
// A receipt can be printed.

const ITEMS = [
  { name: "paper towels", price: 21.99 },
  { name: "sandwich", price: 8.75 },
  { name: "eggs", price: 6.75 },
  { name: "avocado oil", price: 10.0 },
];

export function addItem(name: string, price: number) {
  const newItem = { name: name, price: price };
  ITEMS.push(newItem);
  return ITEMS;
}

export function deleteItem(name: string) {
  const idx = ITEMS.findIndex((item) => item.name === name);
  if (idx !== -1) {
    ITEMS.splice(idx, 1);
  }
  return ITEMS;
}

export function subtotal() {
  let sum = 0;
  for (const item of ITEMS) {
    sum = sum + item.price;
  }
  return sum;
}

export function totalWithTax(taxRate: number) {
  return subtotal() * (1 + taxRate);
}

export function printReceipt(taxRate: number) {
  console.log("************************");

  for (const item of ITEMS) {
    console.log(`${item.name} : $${item.price}`);
  }

  console.log("************************");
  console.log(`Subtotal: $${String(subtotal())}`);
  console.log(`Tax: $${String(subtotal() * taxRate)}`);
  console.log(`Total: $${totalWithTax(taxRate)}`);
}
