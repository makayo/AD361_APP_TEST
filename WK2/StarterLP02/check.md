# Final Review

Name: MARK YOSINAO (All roles)

## Reviewer:

- I went back over the log and the fixed code.
- I got two wrong, Issues 12 and 13.
- I thought amount and balanceCheck weren't declared, but they were.
- On a second look I also caught a few things I missed the first time (Issues 16–21), like withdrawl adding money instead of taking it out, and transfer not passing the PIN.

## Scribe:

- I added the new issues to the log and made sure every status was right. No additional issues found.

## Author:

- I fixed the new issues and read through the code again against the requirements.
- Deposits and withdrawals work, the balance can't go negative, and every action asks for a PIN.
- No additional issues found.

## ESLint Reflection

ESLint found 5 problems in the original code and none in the fixed code.

### What did ESLint identify?

- `USER` is assigned and never used (line 7)
- `amount` is defined but never used (line 23)
- `transferAmount` is assigned but never used (line 41)
- The new `balance` value is never used (line 14)

### What did I identify that ESLint did not?

- `withdrawl` and `reciver` are spelled wrong
- The balance is a `const` and an array
- `withdrawl` adds instead of subtracting
- `transfer` and `balanceCheck` are missing the PIN
- The balance can go negative
- `transfer` returns the function instead of a balance

### Did ESLint identify anything I missed?

- Yes, line 14. The deposit was never saved to the account.

// AI transparency: AI was used to clean up this code.
