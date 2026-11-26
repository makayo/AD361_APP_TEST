# Learning Practice: Enhancing Testing with Large Language Models

## The Product

Tests are designed for **North Vacation Booking**, using these requirements:

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

Requirement numbers used in the tables below refer to this list.

**Pricing formula:**
`total = (nights × $200) + (max(0, guests − 5) × $25 × nights) + $50`

**Conventions:** all dates are in 2027. "Night of X is booked" means an
existing reservation occupies the night that starts on date X.

I am responsible for reviewing and verifying everything produced by the LLM.

---

## Step 1: Create Your Own Test Ideas

Created before using an LLM.

<details>
<summary>Test idea table</summary>

| Requirement | Input or Action | Expected Result |
| ----------- | --------------- | --------------- |
| 1, 2, 3, 4 – minimum nights and guests | Check-in Mar 1, checkout Mar 2, 1 guest, all nights available | Reservation created. 1 night × $200 + $50 = **$250** |
| 1, 9 – maximum nights | Check-in Jan 1, checkout Feb 2 (32 nights), 2 guests | Error. No reservation created |
| 2, 9 – maximum guests | Check-in Mar 1, checkout Mar 3, 13 guests | Error. No reservation created |
| 5 – extra-guest charge | Check-in Mar 1, checkout Mar 3 (2 nights), 6 guests, all nights available | Reservation created. 2 × $200 + 1 × $25 × 2 + $50 = **$500** |
| 6, 9 – date order | Check-in Mar 5, checkout Mar 1, 2 guests | Error. No reservation created |
| 8, 10 – availability | Check-in Mar 8, checkout Mar 12, 2 guests; night of Mar 10 is booked | Unavailable error. No reservation created |
| 7, 8, 10 – last night unavailable | Check-in Mar 8, checkout Mar 12, 2 guests; night of Mar 11 is booked | Unavailable error (Mar 11 is a requested night) |

</details>

---

## Step 2: Use a General Prompt

### Prompt

```text
Create tests for a vacation booking application.
```

### Complete Response

Model: Claude Opus 5.5 (claude.ai), 2026-11-25. Also saved in
[`responses/01-general-prompt-response.md`](responses/01-general-prompt-response.md).

<details>
<summary>Complete response to the general prompt</summary>

Here's a set of test cases for a vacation booking application, grouped by feature area.

**1. Search and Availability**

| ID | Test | Expected Result |
| -- | ---- | --------------- |
| S-01 | Search by destination with valid check-in/check-out dates | Matching properties are listed |
| S-02 | Search with check-out before check-in | Validation error is shown |
| S-03 | Search with no results (remote location, peak dates) | "No properties found" message |
| S-04 | Filter by price range, amenities and property type | Only matching properties are shown |
| S-05 | Sort results by price (low to high) | Results ordered correctly |
| S-06 | Search for past dates | Search is blocked with an error |

**2. Booking Flow**

| ID | Test | Expected Result |
| -- | ---- | --------------- |
| B-01 | Book an available property with valid details | Booking confirmed, confirmation number shown |
| B-02 | Try to book dates that are already booked | Error: dates unavailable |
| B-03 | Enter more guests than the property allows | Error: exceeds maximum occupancy |
| B-04 | Leave required fields empty (name, email) | Field-level validation errors |
| B-05 | Two users book the same property and dates at the same time | Only one booking succeeds |
| B-06 | Verify the total price includes nightly rate, taxes and fees | Total is calculated correctly |

**3. Payment**

| ID | Test | Expected Result |
| -- | ---- | --------------- |
| P-01 | Pay with a valid credit card | Payment succeeds, booking confirmed |
| P-02 | Pay with an expired or declined card | Payment fails, booking not created |
| P-03 | Apply a valid promo code | Discount applied to total |
| P-04 | Apply an invalid or expired promo code | Error message, no discount |
| P-05 | Payment gateway times out | User sees a retry message; no double charge |

**4. Cancellation and Changes**

| ID | Test | Expected Result |
| -- | ---- | --------------- |
| C-01 | Cancel within the free-cancellation window | Full refund issued |
| C-02 | Cancel after the window | Partial or no refund per policy |
| C-03 | Modify booking dates to available dates | Booking updated, price recalculated |

**5. User Accounts**

| ID | Test | Expected Result |
| -- | ---- | --------------- |
| U-01 | Register with valid details | Account created, verification email sent |
| U-02 | Log in with wrong password | Error, no access |
| U-03 | View booking history | All past and upcoming bookings shown |

**6. Non-Functional**

- **Performance:** search returns results in under 2 seconds with 1,000 concurrent users.
- **Security:** payment data is encrypted; SQL injection in the search box is rejected.
- **Usability/Accessibility:** booking flow is usable with a screen reader and on mobile.
- **Compatibility:** works in current Chrome, Firefox, Safari and Edge.

**7. Edge Cases**

- Bookings that span a daylight-saving-time change
- Leap-year dates (Feb 29)
- Different currencies and time zones
- Very long stays (e.g., 90+ nights)

Would you like me to turn any of these into detailed test scripts or automated tests (e.g., Playwright or Cypress)?

</details>

### Review of the General Response

<details>
<summary>Response evaluation table</summary>

| AI-Generated Idea | Useful, Vague, Unsupported, or Incorrect | Explanation |
| ----------------- | ---------------------------------------- | ----------- |
| S-02: Check-out before check-in → validation error | Useful | Matches requirements 6 and 9. It still needs concrete dates. |
| B-02: Book dates already booked → dates unavailable | Useful | Matches requirements 8 and 10. It still needs to say which nights are booked. |
| B-01: Book an available property with valid details → confirmation number shown | Vague | No inputs and no expected price. A confirmation number is not a requirement. |
| B-03: More guests than the property allows → maximum occupancy error | Vague | No boundary values. Our rule is a fixed 1–12 guests, not a per-property limit. |
| Edge case: Very long stays (e.g., 90+ nights) | Vague | No expected result. Under requirement 1 any stay over 31 nights must produce an error. |
| B-06: Total includes nightly rate, taxes and fees | Incorrect | Our price has no taxes. It also leaves out the $25 extra-guest charge and gives no numbers. |
| S-06: Search for past dates → blocked | Unsupported | No requirement covers past dates. |
| B-05: Two users book the same dates at the same time | Unsupported | A real availability risk, but not defined by the requirements. |
| P-01 to P-05: Payments and promo codes | Unsupported | No payment or promo requirements. |
| C-01 to C-03: Cancellation, refunds, changes | Unsupported | No cancellation or refund requirements. |
| U-01 to U-03: Accounts and login | Unsupported | No account requirements. |
| Performance: results in under 2 s with 1,000 users | Unsupported | Invented numbers. No performance requirement. |

</details>

**Test ideas that are useful:** S-02 and B-02.

**Test ideas that are too vague:** B-01, B-03, and the 90+ nights edge case.

**Ideas that are not supported by the requirements:** S-06, B-05, all
payment (P), cancellation (C) and account (U) tests, and the non-functional
targets.

**Important requirements the response missed:**

- Requirement 1: the 1–31 night limits
- Requirement 2: the 1–12 guest limits
- Requirement 3: $200 per night
- Requirement 4: the $50 cleaning fee
- Requirement 5: $25 per guest over five, per night
- Requirement 7: the checkout date is not a reserved night

**Expected results that are unclear or incomplete:**

- "Total is calculated correctly" (B-06): no amount given
- "Validation error is shown" (S-02): no inputs given
- "Booking confirmed" (B-01): no price given
- "Partial or no refund per policy" (C-02): no policy exists

---

## Step 3: Create a Contextual Prompt

### Prompt

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

### Required Prompt Elements

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
| **Mindset:** You remain responsible for the testing decisions. | "I am the tester and I will review, correct, and decide on every test idea", and the LLM is told to flag open questions instead of guessing |
| **Technique:** Your instructions clearly describe the requested task and output. | Exact task, number of ideas, table columns, concrete values, calculations shown |
| **Context:** You provide the application requirements needed to complete the task. | The full North Vacation Booking requirements, plus the boundary values and risks to focus on |

### Complete Response

Model: Claude Opus 5.5 (claude.ai), 2026-11-25. Also saved in
[`responses/02-contextual-prompt-response.md`](responses/02-contextual-prompt-response.md).

<details>
<summary>Complete response to the contextual prompt</summary>

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

**Open questions**

1. **Error precedence:** if a request is both invalid (e.g., 13 guests) and unavailable, which error should appear? I recommend testing 13 guests on unavailable dates, but I have not assumed which error wins.
2. **Error content:** the requirements say "an error" and "an unavailable error" but not the message text, so expected results above only check the error type.
3. **"Guest over five":** I read this as guests 6–12 each costing $25 per night (so 6 guests = 1 extra guest). Please confirm.
4. **Cleaning fee on invalid requests:** I assumed no price (and no cleaning fee) is returned for invalid or unavailable requests, since requirement 4 says the fee applies to *valid* reservations.
5. **Input types:** behavior for non-integer guests (e.g., 2.5) or missing dates is covered only by requirement 9 in general terms.

</details>

---

## Step 4: Evaluate the Contextual Response

I checked every price by hand and again with a short script.

<details>
<summary>AI response review table</summary>

| AI-Generated Idea | Accept, Revise, or Reject | Reason | Required Correction |
| ----------------- | ------------------------- | ------ | ------------------- |
| T01: Mar 1 → Mar 2, 2 guests → $250 | Accept | Correct minimum-night boundary. 200 + 50 = 250. | None |
| T02: Jan 1 → Feb 1, 2 guests → $6,250 | Accept | Jan 1 → Feb 1 is exactly 31 nights. 6,200 + 50 = 6,250. | None |
| T03: Jan 1 → Feb 2, 2 guests → error | Accept | Correct just-over boundary (32 nights). | None |
| T04: Mar 1 → Mar 1, 2 guests → error | Accept | Correct 0-night boundary. It also breaks requirement 6. | None |
| T05: Mar 5 → Mar 1, 2 guests → error | Accept | Valid equivalence class for wrong date order. | None |
| T06: Mar 1 → Mar 3, 0 guests → error | Revise | Availability isn't stated, so an unavailable error could hide the guest error. The expected result is vague. | Precondition: Mar 1–2 available. Expected: error, no reservation created, no price returned. |
| T07: Mar 1 → Mar 3, 13 guests → error | Revise | Same problem as T06. | Precondition: Mar 1–2 available. Expected: error, no reservation created, no price returned. |
| T08: Mar 1 → Mar 4, 5 guests → $650 | Accept | Correct no-surcharge boundary. 600 + 0 + 50 = 650. | None |
| T09: Mar 1 → Mar 4, 6 guests → $725 | Accept | Correct first-surcharge boundary. 600 + 75 + 50 = 725. | None |
| T10: Jan 1 → Feb 1, 12 guests → $11,675 | Accept | 6,200 + (7 × 25 × 31 = 5,425) + 50 = 11,675. Verified. | None |
| T11: Mar 8 → Mar 10, night of Mar 10 booked → $450 | Revise | Good idea, but it can't be run without first creating the conflicting reservation. | Precondition: an existing reservation from Mar 10 → Mar 12. Mar 8–9 available. |
| T12: Mar 8 → Mar 12, night of Mar 10 booked → unavailable error | Accept | Matches requirements 8 and 10. Expected result is specific. | None |

</details>

No ideas were rejected: none of the 12 added unsupported requirements, and
every price was correct.

The response's **open questions** are not test ideas. They are ambiguities
to raise with the product owner, and none of them was turned into a hidden
assumption:

- which error wins when a request is both invalid and unavailable
- what the error messages say
- whether "guest over five" means 6+ guests
- whether invalid requests return a price
- how non-integer or missing inputs are handled

### Review Checklist

| Check | Result |
| ----- | ------ |
| The inputs follow the requirements. | Yes. Every input uses only the 10 requirements. No payment, tax, account, or past-date inputs. |
| The expected results are specific. | Pricing results are specific. Error results can only name the error type, because the requirements don't define message text. T06 and T07 were revised to add "no reservation, no price". |
| Pricing calculations are correct. | Yes. All 6 pricing results ($250, $6,250, $650, $725, $11,675, $450) recalculated and verified. |
| Boundary values are correct. | Nights 0, 1, 31, 32 and guests 0, 5, 6, 12, 13 are correct. **The guest minimum (1) is missing:** every valid test uses 2+ guests. |
| The test can actually be performed. | Yes, after adding availability preconditions to T06, T07 and T11. |
| The LLM introduced unsupported assumptions. | No hidden assumptions. Its interpretations (for example, "guest over five" = 6+) are listed as open questions. |
| Any requirements are still missing from the tests. | Requirement 2's lower bound (1 guest) is not tested. Requirement 8 isn't tested with the *last* requested night unavailable. |

---

## Step 5: Compare the Prompts

**Which prompt produced more useful test ideas:** the contextual prompt.
All 12 of its ideas were usable: 9 accepted as written, 3 after small
revisions. Only 2 of about 30 ideas in the general response matched the
requirements well enough to be useful.

**How adding requirements changed the response:** the general response
described generic feature areas (search, payments, accounts, performance).
With the requirements, the LLM produced boundary tests with exact dates,
guest counts and checkable prices, and it flagged ambiguities instead of
guessing.

**One weakness found in the general response:** it invented requirements
(taxes, promo codes, refunds, past dates, per-property occupancy) and missed
every pricing rule, so none of its expected prices could be checked.

**One weakness that remained in the contextual response:** it never tested
the minimum valid guest count (1 guest). It also left out the availability
preconditions needed to actually run T06, T07 and T11.

**One test idea the LLM suggested that you had not considered:** T11. A stay
whose checkout date is already booked by someone else should still succeed,
because the checkout night is not reserved (requirement 7). I had only
applied requirement 7 when counting nights for the price.

**One test idea you created that the LLM missed:** a 1-guest reservation
(guest minimum boundary, TC-01). I also tested a stay where the *last*
requested night is unavailable (TC-10).

---

## Step 6: Create the Final Test Cases

Every test case below was reviewed and corrected by me. Unless listed in
the preconditions, the calendar has no existing reservations.

<details>
<summary>Final test case table</summary>

| Test Case ID | Requirement | Preconditions | Inputs or Actions | Expected Result | Source |
| ------------ | ----------- | ------------- | ----------------- | --------------- | ------ |
| TC-01 | 1, 2, 3, 4 – minimum nights and minimum guests | Night of Mar 1 is available | Check-in Mar 1, checkout Mar 2, 1 guest | Reservation created. 1 night. Total = 1 × $200 + $50 = **$250** | Human-generated |
| TC-02 | 1, 3, 4 – maximum nights | Nights of Jan 1 – Jan 31 are available | Check-in Jan 1, checkout Feb 1, 2 guests | Reservation created. 31 nights. Total = 31 × $200 + $50 = **$6,250** | AI-generated and verified |
| TC-03 | 1, 9 – above maximum nights | Nights of Jan 1 – Feb 1 are available | Check-in Jan 1, checkout Feb 2 (32 nights), 2 guests | Error. No reservation created, no price returned | AI-generated and verified |
| TC-04 | 1, 6, 9 – check-in not before checkout | None | (a) Check-in Mar 1, checkout Mar 1, 2 guests. (b) Check-in Mar 5, checkout Mar 1, 2 guests | (a) and (b): error. No reservation created | AI-generated and verified |
| TC-05 | 2, 9 – guest limits | Nights of Mar 1 – Mar 2 are available | Check-in Mar 1, checkout Mar 3 with (a) 0 guests, (b) 13 guests | (a) and (b): error. No reservation created, no price returned | AI-generated and revised |
| TC-06 | 2, 3, 4, 5 – extra-guest boundary | Nights of Mar 1 – Mar 3 are available | Check-in Mar 1, checkout Mar 4 with (a) 5 guests, (b) 6 guests | (a) 3 × $200 + $50 = **$650**. (b) 3 × $200 + 1 × $25 × 3 + $50 = **$725** | AI-generated and verified |
| TC-07 | 1, 2, 3, 4, 5 – maximum nights and maximum guests | Nights of Jan 1 – Jan 31 are available | Check-in Jan 1, checkout Feb 1, 12 guests | Reservation created. 31 × $200 + 7 × $25 × 31 + $50 = $6,200 + $5,425 + $50 = **$11,675** | AI-generated and verified |
| TC-08 | 7, 8 – checkout night is not reserved | Existing reservation Mar 10 → Mar 12. Nights of Mar 8 – Mar 9 are available | Check-in Mar 8, checkout Mar 10, 2 guests | Reservation created, no unavailable error. 2 nights. Total = 2 × $200 + $50 = **$450** | AI-generated and revised |
| TC-09 | 8, 10 – a middle night is unavailable | Existing reservation Mar 10 → Mar 11 | Check-in Mar 8, checkout Mar 12, 2 guests | Unavailable error. No reservation created | Human-generated |
| TC-10 | 7, 8, 10 – the last requested night is unavailable | Existing reservation Mar 11 → Mar 12 | Check-in Mar 8, checkout Mar 12, 2 guests | Unavailable error (the night of Mar 11 is a requested night). No reservation created | Human-generated |

</details>

**Open questions for the product owner:**

- which error appears when a request is both invalid and unavailable
- the exact error message text
- how non-integer or missing inputs should be handled

---

## Step 7: Reflect on Human and AI Responsibilities

**1. What did the LLM help you complete more quickly?**
It wrote out boundary tests in a consistent format with concrete dates, and
it worked out the larger price calculations, such as 31 nights with 12
guests. It also turned ambiguities in the requirements into a list of open
questions.

**2. What information did the LLM misunderstand, overlook, or invent?**
The general response invented taxes, payments, promo codes, cancellations,
accounts, past-date rules, a per-property occupancy limit and performance
targets, and it missed every pricing rule. The contextual response
overlooked the 1-guest minimum and left out the preconditions needed to set
up the availability tests.

**3. What knowledge did you need to evaluate its response?**
- The 10 requirements
- Boundary value analysis and equivalence partitioning
- How to count nights when the checkout date is not a reserved night
- Enough arithmetic to recheck every total

**4. What could happen if a tester used the response without reviewing it?**
Time would go into testing features the product doesn't have, while real
rules went untested, such as the extra-guest charge and the 31-night limit.
Wrong or vague expected results could let real bugs pass, or flag correct
behavior as a defect.

**5. Which testing decisions should remain the responsibility of the tester?**
- What is in scope
- Which requirements and risks matter most
- Whether expected results are correct
- How to handle ambiguous requirements (ask, don't assume)
- The final decision to accept, revise or reject each test

---

## AI Transparency

Claude (Claude Opus 5.5, claude.ai) generated the two LLM responses in Steps
2 and 3, and it helped draft and format this file. I reviewed every test
idea, recalculated every price, and made the final accept, revise and
reject decisions.
