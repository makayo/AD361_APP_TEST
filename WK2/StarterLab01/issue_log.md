# Issue Log: receipt.ts

## Issue 1

- Location: ITEMS array
- Issue: There is an extra comma on its own line between "eggs" and "avocado oil."
- Explanation: The extra comma adds an empty spot to the list. The list now has 5 spots instead of 4, and one of them is empty. When the code adds up prices, it hits the empty spot and breaks. TypeScript says: "Object is possibly 'undefined'".
- Suggested fix: Delete the extra comma.
- Status: Fixed

## Issue 2

- Location: addItem
- Issue: const newItem = { "name" = name, "price" = price };
- Explanation: Objects need a colon (:) between the name and the value, not an equals sign (=). This is a syntax error, so the whole file can't run. TypeScript says: "':' expected".
- Suggested fix: const newItem = { name: name, price: price };
- Status: Fixed

## Issue 3

- Location: deleteItem
- Issue: ITEMS.indexOf("name")
- Explanation: Because "name" is in quotes, the code looks for the word "name" instead of the item the user wants to delete. It also searches a list of objects using plain text, so it can never find a match.
- Suggested fix: const idx = ITEMS.findIndex((item) => item.name === name);
- Status: Fixed

## Issue 4

- Location: deleteItem
- Issue: ITEMS.pop();
- Explanation: pop() always removes the last item in the list, not the one the user asked for. The idx value from the line before is never used. If the item isn't on the list, the code still removes the last item.
- Suggested fix: Remove the item at idx only if it was found: if (idx !== -1) { ITEMS.splice(idx, 1); }
- Status: Fixed

## Issue 5

- Location: total
- Issue: for (const i of 3)
- Explanation: The loop tries to go through the number 3, but a loop needs a list. Using 3 would also skip any items after the third one, so the subtotal would be wrong.
- Suggested fix: Loop through every item: for (const item of ITEMS) { ... }
- Status: Fixed

## Issue 6

- Location: total
- Issue: total = total + ITEMS[i]["price"];
- Explanation: total is the name of the function, so it can't also be used to store the running sum. The code never creates a variable that starts at 0, and it returns the function instead of a number.
- - Suggested fix: Make a new variable called sum that starts at 0. Add each item's price to sum, then return sum.
- Status: Fixed

## Issue 7

- Location: tax
- Issue: const tax = total() + taxRate;
- Explanation: The code adds the tax rate as a number instead of using it as a percentage. For a $47.49 subtotal with 10% tax, it gives $47.59 instead of $52.24. This doesn't meet the requirement "The total is calculated with tax."
- Suggested fix: Multiply instead of add: return total() \* (1 + taxRate);
- Status: Fixed

## Issue 8

- Location: tax
- Issue: The variable inside the function has the same name as the function, tax.
- Explanation: Using the same name twice is confusing. The name tax also sounds like it returns only the tax, but it should return the total with tax.
- Suggested fix: Use a clearer name, such as totalWithTax, and return the result directly.
- Status: Fixed

## Issue 9

- Location: printReceipt
- Issue: console.log('${ITEMS[i][name]} : $${ITEMS[i][price]}}');
- Explanation: The line uses single quotes, so the item name and price are not filled in. It prints the code text instead. There is also an extra } at the end.
- Suggested fix: Use backtick quotes instead of single quotes, and remove the extra }.
- Status: Fixed

## Issue 10

- Location: printReceipt
- Issue: for (const i of ITEMS) used with ITEMS[i][name] and ITEMS[i][price]
- Explanation: In this kind of loop, i is already the item, not its position, so ITEMS[i] doesn't work. name and price also need to be read as properties of the item.
- Suggested fix: Name the loop variable item and use item.name and item.price.
- Status: Fixed

## Issue 11

- Location: printReceipt
- Issue: The Subtotal line uses String(total) without calling total().
- Explanation: Without the parentheses, the function never runs. The receipt would print the function's code instead of the subtotal.
- Suggested fix: Call the function: total()
- Status: Fixed

## Issue 12

- Location: printReceipt
- Issue: The Tax and Total lines start with a backtick but end with a double quote.
- Explanation: The quote marks don't match, so the text never closes. This is a syntax error that stops the file from running, and it causes many of the errors shown in VS Code. Both lines would also print an extra "$ +".
- Suggested fix: End each line with a backtick to match the start, and remove the " + ".
- Status: Fixed

## Issue 13

- Location: printReceipt
- Issue: The Tax line prints taxRate, and the Total line calls tax(String(taxRate)).
- Explanation: The Tax line prints the rate (like 0.1) instead of the tax in dollars. The Total line turns the rate into text before passing it to tax(), which needs a number.
- Suggested fix: Print the tax as total() \* taxRate, and pass the number directly: tax(taxRate)
- Status: Fixed

# Root Cause, Error, Defect, and Failure

- Root cause: The code was never checked or tested before it was shared.
- Error: The programmer used = instead of : when creating the new item in addItem.
- Defect: deleteItem uses pop(), so it always removes the last item instead of the one asked for.
- Failure: The tests can't run because receipt.ts has errors and won't compile.

# ESLint Results

- ESLint found 1 problem: "Parsing error: ':' expected" in addItem. This is the same as Issue 2, so no new issues were added.
- ESLint stopped at the first syntax error, so it could not check the rest of the file. The manual review found 13 issues, while ESLint found 1.
