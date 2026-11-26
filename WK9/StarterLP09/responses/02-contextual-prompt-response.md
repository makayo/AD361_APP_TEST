# Step 3: Create a Contextual Prompt

My contextual prompt and the complete, unedited response. The evaluation of
this response is in the main `README.md` (Step 4).

**Model:** Claude Opus 5.5 (claude.ai)
**Date:** 2026-11-25

## Required Prompt Elements

| Required element | Where it appears in the prompt |
| ---------------- | ------------------------------ |
| The role you want the LLM to perform | "You are a software test analyst helping me design functional tests" |
| A clear testing task | "Create 12 test ideas for the reservation feature of North Vacation Booking" |
| The North Vacation Booking requirements | All 10 requirements, listed in full |
| The testing techniques or risks it should consider | Boundary value analysis, equivalence partitioning, pricing, date logic, availability |
| The number of test ideas you want | 12 |
| The information each test idea should contain | ID, requirement(s) tested, technique, inputs, expected result (with the calculation for pricing tests) |
| A direction not to invent unsupported requirements | "These are the ONLY requirements — do not invent others" plus a list of excluded topics |

| Principle | How the prompt demonstrates it |
| --------- | ------------------------------ |
| **Mindset:** You remain responsible for the testing decisions. | "I am the tester and I will review, correct, and decide on every test idea" |
| **Technique:** Your instructions clearly describe the requested task and output. | Exact task, number of ideas, table columns, concrete values, calculations shown |
| **Context:** You provide the application requirements needed to complete the task. | The full North Vacation Booking requirements, plus the boundary values and risks to focus on |

## Prompt

```text
Role: You are a software test analyst helping me design functional tests. I am
the tester and I will review, correct, and decide on every test idea you give me,
so flag anything you are unsure about instead of guessing.

Task: Create 12 test ideas for the reservation feature of North Vacation Booking.

Requirements (these are the ONLY requirements — do not invent others):
1. A reservation must be between 1 and 31 nights.
2. A reservation must include between 1 and 12 guests.
3. The price is $200 per night.
4. Each valid reservation includes a one-time $50 cleaning fee.
5. Each guest over five costs an additional $25 per night.
6. The check-in date must occur before the checkout date.
7. The checkout date is not counted as a reserved night.
8. All requested nights must be available.
9. Invalid booking information produces an error.
10. Unavailable dates produce an unavailable error.

Techniques and risks to consider:
- Boundary value analysis for nights (0, 1, 31, 32) and guests (0, 1, 5, 6, 12, 13)
- Equivalence partitioning for valid and invalid inputs
- Pricing calculations, including the extra-guest charge and the cleaning fee
- Date logic: check-in vs. checkout order, and the checkout night not being counted
- Availability, including a stay that ends on a date that is already booked

Output format: a Markdown table with these columns:
ID | Requirement(s) tested | Technique | Inputs (check-in, checkout, guests, availability) | Expected result

For every pricing test, show the calculation in the expected result.
Use concrete dates and numbers. Do not add requirements about payments,
accounts, taxes, cancellations, maximum occupancy, or past dates. If a
requirement is ambiguous, list it under "Open questions" after the table
instead of assuming an answer.
```

## Complete Response

Here are 12 test ideas for the North Vacation Booking reservation feature. All dates are in 2027. Unless stated, assume all requested nights are available.

**Pricing formula used:** `total = (nights × $200) + (max(0, guests − 5) × $25 × nights) + $50`

| ID | Requirement(s) tested | Technique | Inputs (check-in, checkout, guests, availability) | Expected result |
| -- | --------------------- | --------- | ------------------------------------------------- | --------------- |
| T01 | 1, 3, 4 | BVA – minimum nights | Mar 1 → Mar 2, 2 guests, available | Valid. 1 night. 1 × $200 + $50 = **$250** |
| T02 | 1, 3, 4 | BVA – maximum nights | Jan 1 → Feb 1, 2 guests, available | Valid. 31 nights. 31 × $200 + $50 = **$6,250** |
| T03 | 1, 9 | BVA – above maximum | Jan 1 → Feb 2, 2 guests, available | Invalid – 32 nights. Error shown, no reservation created |
| T04 | 1, 6, 9 | BVA – zero nights | Mar 1 → Mar 1, 2 guests | Invalid – check-in is not before checkout (0 nights). Error shown |
| T05 | 6, 9 | Equivalence – invalid order | Mar 5 → Mar 1, 2 guests | Invalid – checkout before check-in. Error shown |
| T06 | 2, 9 | BVA – zero guests | Mar 1 → Mar 3, 0 guests | Invalid – error shown |
| T07 | 2, 9 | BVA – above maximum guests | Mar 1 → Mar 3, 13 guests | Invalid – error shown |
| T08 | 2, 3, 4, 5 | BVA – 5 guests (no surcharge) | Mar 1 → Mar 4, 5 guests, available | Valid. 3 nights. 3 × $200 + 0 + $50 = **$650** |
| T09 | 2, 3, 4, 5 | BVA – 6 guests (first surcharge) | Mar 1 → Mar 4, 6 guests, available | Valid. 3 × $200 + (1 × $25 × 3) + $50 = **$725** |
| T10 | 1, 2, 3, 4, 5 | BVA – max nights and max guests | Jan 1 → Feb 1, 12 guests, available | Valid. 31 × $200 + (7 × $25 × 31) + $50 = $6,200 + $5,425 + $50 = **$11,675** |
| T11 | 7, 8 | Date logic – checkout on a booked date | Mar 8 → Mar 10, 2 guests; night of Mar 10 is already booked, Mar 8–9 available | Valid. 2 nights (Mar 8, Mar 9). 2 × $200 + $50 = **$450**. The Mar 10 booking does not block it |
| T12 | 8, 10 | Availability – one night unavailable | Mar 8 → Mar 12, 2 guests; night of Mar 10 already booked | Unavailable error. No reservation created, no price returned |

### Open questions

1. **Error precedence:** if a request is both invalid (e.g., 13 guests) and unavailable, which error should appear? I recommend testing 13 guests on unavailable dates, but I have not assumed which error wins.
2. **Error content:** the requirements say "an error" and "an unavailable error" but not the message text, so expected results above only check the error type.
3. **"Guest over five":** I read this as guests 6–12 each costing $25 per night (so 6 guests = 1 extra guest). Please confirm.
4. **Cleaning fee on invalid requests:** I assumed no price (and no cleaning fee) is returned for invalid or unavailable requests, since requirement 4 says the fee applies to *valid* reservations.
5. **Input types:** behavior for non-integer guests (e.g., 2.5) or missing dates is covered only by requirement 9 in general terms.
