# Issue Log: (bankOfTheNorth.ts)

Line numbers are from the original `bankOfTheNorth.ts`.

## Part 1: Manual Review

Issue found by reviewing the code.

**Note:** VS Code highlighted some errors in the editor during code review, and that helped find some.

### Issue 1

- **Location:** Line 7
- **Issue:** `USER` is declared but never used.
- **Explanation:** Never used in the code, does nothing
- **Suggested Fix:** Use it or lose it
- **Status:** Fixed

### Issue 2

- **Location:** Lines 14 and 25
- **Issue:** `BALANCE + balance` can't add these together
- **Explanation:** Can't sum an array object and a number. It sticks them together as text, like `"15,98350"`
- **Suggested Fix:** Make the balance a number and use `balance = balance + amount`
- **Status:** Fixed

### Issue 3

- **Location:** Line 23
- **Issue:** `withdrawl` is spelled wrong.
- **Explanation:** It should be "withdraw".
- **Suggested Fix:** Rename it to `withdraw` or `withdrawal`.
- **Status:** Fixed

### Issue 4

- **Location:** Line 23
- **Issue:** `amount` is passed into `withdrawl` but never used.
- **Explanation:** The function ignores how much money the user wants to take out.
- **Suggested Fix:** Take `amount` away from the balance.
- **Status:** Fixed

### Issue 5

- **Location:** Line 25
- **Issue:** `balance` is not declared in `withdrawl`.
- **Explanation:** There is no `balance` variable inside this function, so the code won't compile.
- **Suggested Fix:** Use the real balance variable.
- **Status:** Fixed

### Issue 6

- **Location:** Line 40
- **Issue:** `reciver` is spelled wrong.
- **Explanation:** It should be "receiver".
- **Suggested Fix:** Rename it to `receiver`.
- **Status:** Fixed

### Issue 7

- **Location:** Line 41
- **Issue:** `transferAmount` is never used.
- **Explanation:** The result of the withdrawal is saved but never looked at, so `transfer` says "Success!" even when the withdrawal fails.
- **Suggested Fix:** Add an `if` that checks `transferAmount`. If it is `undefined`, the withdrawal failed, so print "Transfer failed" and stop. Only print "Success!" when the withdrawal worked.
- **Status:** Fixed

### Issue 8

- **Location:** Line 8
- **Issue:** `BALANCE` is a `const`
- **Explanation:** A `const` can't change
- **Suggested Fix:** Change it to `let balance`
- **Status:** Fixed

### Issue 9

- **Location:** Line 8
- **Issue:** `BALANCE` is an array, `[15, 983]`.
- **Explanation:** The balance should be one number. It looks like it was meant to be 15983
- **Suggested Fix:** Change it to `15983`
- **Status:** Fixed

### Issue 10

- **Location:** Line 12
- **Issue:** The `deposit` parameter is called `balance`, but it's the deposit amount
- **Explanation:** The name is confusing and makes it look like the account balance
- **Suggested Fix:** Rename it to `amount`
- **Status:** Fixed

### Issue 11

- **Location:** Line 40
- **Issue:** `pin` is passed in but never checked.
- **Explanation:** Every action needs a PIN, but `transfer` doesn't check it.
- **Suggested Fix:** Pass `pin` to `withdraw` so it gets checked.
- **Status:** Fixed

### Issue 12

- **Location:** Line 40
- **Issue:** We thought `amount` was not declared.
- **Explanation:** It is declared. `amount` is a parameter of `transfer` (and of `withdrawl`).
- **Suggested Fix:** None.
- **Status:** Rejected

### Issue 13

- **Location:** Line 43
- **Issue:** We thought `balanceCheck` was not declared.
- **Explanation:** It is declared. `balanceCheck` is the function on line 34. The real problem on this line is Issue 14.
- **Suggested Fix:** None. See Issue 14.
- **Status:** Rejected

### Issue 14

- **Location:** Line 43
- **Issue:** `transfer` returns the `balanceCheck` function instead of calling it.
- **Explanation:** It's missing the `()`, so you get back the function, not the balance.
- **Suggested Fix:** Return the new balance.
- **Status:** Fixed

## Part 2: Found by ESLint

This is what ESLint found that we missed. ESLint also flagged Issues 1, 4 and 7, which we had already found.

### Issue 15

- **Location:** Line 14
- **Issue:** The new value of `balance` in `deposit` is never used.
- **Explanation:** `balance` here is just the parameter, not the account. The new value gets saved into it and then thrown away, so the deposit never actually goes into the account.
- **Suggested Fix:** Add the amount to the real account balance with `balance = balance + amount`, and return that.
- **Status:** Fixed

## Part 3: Found During the Final Review

I missed these on my first read-through. I found them on a second pass, when I compared the code to the requirements at the top of the file and traced what each function really does.

### Issue 16

- **Location:** Lines 23–31
- **Issue:** The balance can go negative.
- **Explanation:** The requirements say the balance should never be negative, but `withdrawl` never checks whether there is enough money.
- **Suggested Fix:** Stop the withdrawal if the amount is more than the balance.
- **Status:** Fixed

### Issue 17

- **Location:** Line 34
- **Issue:** `balanceCheck` doesn't ask for a PIN.
- **Explanation:** The requirements say a PIN must be given for every action.
- **Suggested Fix:** Add a `pin` parameter and check it.
- **Status:** Fixed

### Issue 18

- **Location:** Line 25
- **Issue:** `withdrawl` adds money instead of taking it out.
- **Explanation:** This line is the same as the one in `deposit`. It looks like it was copied over and never changed, so taking money out would make the balance go up.
- **Suggested Fix:** Change it to `balance = balance - amount`.
- **Status:** Fixed

### Issue 19

- **Location:** Line 41
- **Issue:** `transfer` calls `withdrawl(amount)` without the PIN.
- **Explanation:** `withdrawl` needs two things, the PIN and then the amount. Here only the amount is passed in, so it gets used as the PIN.
- **Suggested Fix:** Change it to `withdraw(pin, amount)`.
- **Status:** Fixed

### Issue 20

- **Location:** Lines 12 and 23
- **Issue:** Negative amounts are allowed.
- **Explanation:** Depositing `-50` would take money out, and withdrawing `-50` would add money. That gets around the balance check.
- **Suggested Fix:** Only allow amounts greater than 0.
- **Status:** Fixed

### Issue 21

- **Location:** Line 36
- **Issue:** The `console.log` after `return` never runs.
- **Explanation:** Code after `return` is skipped, so the balance message never prints.
- **Suggested Fix:** Move the `console.log` above the `return`.
- **Status:** Fixed

// AI transparency: AI was used to clean up this code.
