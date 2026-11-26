# Learning Practice: Enhancing Testing with Large Language Models

Test design for **North Vacation Booking**, comparing a general prompt with a
contextual prompt and reviewing every AI-generated idea before it becomes a
final test case.

| File | Contents |
| ---- | -------- |
| `README.md` | Steps 1–7: my test ideas, evaluations, comparison, final test cases, reflection |
| `responses/01-general-prompt-response.md` | Step 2 prompt and complete LLM response |
| `responses/02-contextual-prompt-response.md` | Step 3 prompt and complete LLM response |

**Pricing formula** (from the requirements):
`total = (nights × $200) + (max(0, guests − 5) × $25 × nights) + $50 cleaning fee`

All dates are in 2027. "Night of X is booked" means an existing reservation
occupies the night that starts on date X.

---

## Step 1: My Own Test Ideas (before using an LLM)

| # | Requirement | Input or Action | Expected Result |
| - | ----------- | --------------- | --------------- |
| H1 | 1, 2, 3, 4 – minimum nights and guests | Mar 1 → Mar 2, 1 guest, available | Valid. 1 night × $200 + $50 = **$250** |
| H2 | 1, 9 – maximum nights | Jan 1 → Feb 2 (32 nights), 2 guests | Error, no reservation created |
| H3 | 2, 9 – maximum guests | Mar 1 → Mar 3, 13 guests | Error, no reservation created |
| H4 | 5 – extra-guest charge | Mar 1 → Mar 3 (2 nights), 6 guests, available | Valid. 2 × $200 + 1 × $25 × 2 + $50 = **$500** |
| H5 | 6, 9 – date order | Mar 5 → Mar 1, 2 guests | Error, no reservation created |
| H6 | 8, 10 – availability | Mar 8 → Mar 12, night of Mar 10 booked | Unavailable error, no reservation created |
| H7 | 7, 8, 10 – last night unavailable | Mar 8 → Mar 12, night of Mar 11 booked | Unavailable error (Mar 11 is a requested night) |

---

## Step 2: General Prompt

Prompt: `Create tests for a vacation booking application.`
Full response: [`responses/01-general-prompt-response.md`](responses/01-general-prompt-response.md)

| AI-Generated Idea | Useful, Vague, Unsupported, or Incorrect | Explanation |
| ----------------- | ---------------------------------------- | ----------- |
| S-02 Check-out before check-in → validation error | Useful | Matches requirements 6 and 9. Needs concrete dates. |
| B-02 Book dates already booked → dates unavailable | Useful | Matches requirements 8 and 10. Doesn't say which nights are booked or test the checkout-night rule. |
| B-06 Total includes nightly rate, taxes and fees | Vague / Unsupported | No numbers or formula. Taxes aren't in the requirements, and it misses the $25 extra-guest charge. |
| B-03 More guests than the property allows → max occupancy error | Vague | Our limit is a fixed 1–12 guests, not per-property occupancy. No boundary values (0, 1, 12, 13). |
| S-06 Search for past dates → blocked | Unsupported | No requirement about past dates. |
| P-01 to P-05 Payment and promo codes | Unsupported | Payments and promo codes aren't in the requirements. |
| C-01 to C-03 Cancellation and refunds | Unsupported | No cancellation or refund requirements. |
| U-01 to U-03 Accounts and login | Unsupported | No account requirements. |
| B-05 Two users book the same dates at once | Useful (outside scope) | A real availability risk, but not something our requirements define. |
| Edge case: "very long stays (90+ nights)" | Incorrect | Treats 90+ nights as a long stay to test as valid. Our maximum is 31 nights, so this is simply invalid. |
| Performance: results in < 2 s with 1,000 users | Unsupported | Invented numbers. No performance requirement. |
| B-01 Book valid property → confirmation number | Vague | No inputs, no expected price. "Confirmation number" isn't a requirement. |

**Requirements the response missed:** 1–31 night range and its boundaries,
1–12 guests and its boundaries, $200/night, $50 cleaning fee, $25 per guest
over five per night, and the checkout night not being counted.

**Unclear or incomplete expected results:** most say "error shown" or
"calculated correctly" without values, so a tester couldn't tell pass from fail.

---

## Step 3: Contextual Prompt

Full prompt and response:
[`responses/02-contextual-prompt-response.md`](responses/02-contextual-prompt-response.md)

How the prompt covers the required parts:

| Element | Where in the prompt |
| ------- | ------------------- |
| Role | "You are a software test analyst helping me design functional tests" |
| Clear task | "Create 12 test ideas for the reservation feature" |
| Requirements | All 10 requirements listed, marked as the only requirements |
| Techniques / risks | BVA values, equivalence partitioning, pricing, date logic, availability |
| Number of ideas | 12 |
| Information per idea | Table columns: ID, requirement, technique, inputs, expected result. Pricing tests show the calculation |
| No invented requirements | "Do not invent others" plus a list of excluded topics. Ambiguities go under "Open questions" |
| **Mindset** | "I am the tester and I will review, correct, and decide on every test idea" |
| **Technique** | Explicit output format, concrete values, calculations shown |
| **Context** | The full North Vacation Booking requirements |

---

## Step 4: Evaluating the Contextual Response

I checked every price by hand and with a short script.

| AI-Generated Idea | Accept, Revise, or Reject | Reason | Required Correction |
| ----------------- | ------------------------- | ------ | ------------------- |
| T01 1 night, 2 guests → $250 | Accept | Correct boundary and math. | None (I also use 1 guest to cover the guest minimum, see TC-01). |
| T02 Jan 1 → Feb 1, 31 nights → $6,250 | Accept | 31 nights is correct. 6,200 + 50 = 6,250. | None |
| T03 Jan 1 → Feb 2, 32 nights → error | Accept | Correct just-over boundary. | Add "no price returned". |
| T04 Mar 1 → Mar 1 → error | Accept | 0-night boundary. Also breaks requirement 6. | None |
| T05 Mar 5 → Mar 1 → error | Accept | Valid equivalence class for wrong date order. | None |
| T06 0 guests → error | Revise | Expected result is just "error shown", and availability isn't stated. | State the dates are available so only the guest count is invalid. Expect no reservation and no price. |
| T07 13 guests → error | Revise | Same as T06. | Same correction as T06. |
| T08 5 guests, 3 nights → $650 | Accept | Correct "no surcharge" boundary. | None |
| T09 6 guests, 3 nights → $725 | Accept | Correct first-surcharge boundary. 600 + 75 + 50 = 725. | None |
| T10 31 nights, 12 guests → $11,675 | Accept | 6,200 + 7 × 25 × 31 (5,425) + 50 = 11,675. Verified. | None |
| T11 Mar 8 → Mar 10, night of Mar 10 booked → valid, $450 | Revise | Good idea, but the setup has to be created before the test. | Add the precondition: an existing reservation checking in on Mar 10. |
| T12 Mar 8 → Mar 12, night of Mar 10 booked → unavailable | Accept | Matches requirements 8 and 10. | None |
| Open question 1: error precedence | Accept as an open question | Correct not to assume. Requirements don't say which error comes first. | Raise with the product owner before writing a test. |
| Open question 4: no fee on invalid requests | Accept as an open question | A reasonable reading of "each *valid* reservation", and it was flagged, not assumed. | Confirm with the product owner. |

**Checklist results**

- **Inputs follow the requirements:** yes. No payment, tax, account or past-date tests.
- **Expected results specific:** pricing tests yes. Error tests can only say "error" because the requirements don't define message text.
- **Pricing correct:** all 6 pricing results verified.
- **Boundaries correct:** nights 0/1/31/32 and guests 0/5/6/12/13 correct. **Guest minimum (1) was not tested**: every valid test uses 2+ guests.
- **Can be performed:** yes, once availability preconditions are set up (T11, T12).
- **Unsupported assumptions:** none hidden. The interpretations it made are listed under open questions.
- **Requirements still missing:** guest minimum of 1, and an unavailable *last* night before checkout (contrast with T11).

---

## Step 5: Comparing the Prompts

- **More useful prompt:** the contextual prompt. Almost all 12 ideas could be used after small revisions. In the general response, about 3 of ~30 ideas matched our requirements.
- **How adding requirements changed the response:** it went from generic feature areas (payments, accounts, performance) to concrete boundary values, exact dates and checkable prices. It also started flagging ambiguities instead of filling them in.
- **Weakness in the general response:** it invented requirements (taxes, promo codes, refunds, past dates, 90+ night stays) and missed every pricing rule.
- **Weakness that remained in the contextual response:** it never tested the minimum valid guest count (1). Error results are still generic because the requirements don't define error messages.
- **AI idea I hadn't considered:** T11, a stay whose checkout date is already booked by someone else. It should still succeed because the checkout night isn't reserved. I'd only thought about the checkout night when counting nights for price.
- **My idea the LLM missed:** H1 / TC-01, a 1-guest reservation (guest minimum boundary). Also H7, where the last requested night is unavailable.

---

## Step 6: Final Test Cases

Precondition for all cases: the reservation feature is reachable, and the
calendar starts with no reservations except those listed.

| Test Case ID | Requirement | Preconditions | Inputs or Actions | Expected Result | Source |
| ------------ | ----------- | ------------- | ----------------- | --------------- | ------ |
| TC-01 | 1, 2, 3, 4 – minimum nights and guests | Mar 1 available | Check-in Mar 1, checkout Mar 2, 1 guest | Reservation created. 1 night. Total = 1 × $200 + $50 = **$250** | Human-generated |
| TC-02 | 1, 3, 4 – maximum nights | Jan 1 – Jan 31 available | Check-in Jan 1, checkout Feb 1, 2 guests | Reservation created. 31 nights. Total = 31 × $200 + $50 = **$6,250** | AI-generated and verified |
| TC-03 | 1, 9 – above maximum nights | Jan 1 – Feb 1 available | Check-in Jan 1, checkout Feb 2 (32 nights), 2 guests | Error. No reservation created, no price returned | AI-generated and verified |
| TC-04 | 1, 6, 9 – zero nights / date order | None | (a) Check-in Mar 1, checkout Mar 1, 2 guests. (b) Check-in Mar 5, checkout Mar 1, 2 guests | Both: error. No reservation created | AI-generated and verified |
| TC-05 | 2, 9 – guest limits | Mar 1 – Mar 2 available | Check-in Mar 1, checkout Mar 3 with (a) 0 guests, (b) 13 guests | Both: error. No reservation created, no price returned | AI-generated and revised |
| TC-06 | 2, 3, 4, 5 – extra-guest boundary | Mar 1 – Mar 3 available | Check-in Mar 1, checkout Mar 4 with (a) 5 guests, (b) 6 guests | (a) 3 × $200 + $50 = **$650**. (b) 3 × $200 + 1 × $25 × 3 + $50 = **$725** | AI-generated and verified |
| TC-07 | 1, 2, 3, 4, 5 – maximum nights and guests | Jan 1 – Jan 31 available | Check-in Jan 1, checkout Feb 1, 12 guests | Reservation created. $6,200 + 7 × $25 × 31 ($5,425) + $50 = **$11,675** | AI-generated and verified |
| TC-08 | 7, 8 – checkout night not reserved | Existing reservation Mar 10 → Mar 12. Mar 8 – Mar 9 available | Check-in Mar 8, checkout Mar 10, 2 guests | Reservation created (no unavailable error). 2 nights. Total = 2 × $200 + $50 = **$450** | AI-generated and revised |
| TC-09 | 8, 10 – middle night unavailable | Existing reservation Mar 10 → Mar 11 | Check-in Mar 8, checkout Mar 12, 2 guests | Unavailable error. No reservation created | Human-generated (also suggested by AI as T12) |
| TC-10 | 7, 8, 10 – last night unavailable | Existing reservation Mar 11 → Mar 12 | Check-in Mar 8, checkout Mar 12, 2 guests | Unavailable error (night of Mar 11 is requested) | Human-generated |

**Open questions for the product owner:** which error appears when a request
is both invalid and unavailable, the error message text, and whether
non-integer or missing inputs need specific handling.

---

## Step 7: Reflection

1. **What did the LLM help me complete more quickly?**
   Writing out boundary tests in a consistent format with concrete dates, and
   working out the larger price calculations (like 31 nights with 12 guests).
   It also turned ambiguities into a list of open questions.

2. **What did it misunderstand, overlook, or invent?**
   The general response invented taxes, payments, promo codes, cancellations,
   accounts, past-date rules and performance targets, and it treated 90+ night
   stays as valid. The contextual response overlooked the 1-guest minimum and
   left out the preconditions needed to set up the availability tests.

3. **What knowledge did I need to evaluate it?**
   The requirements themselves, boundary value analysis and equivalence
   partitioning, how to count nights when checkout isn't a reserved night,
   and enough arithmetic to recheck every total.

4. **What could happen if a tester used the response without reviewing it?**
   Time would go into testing features the product doesn't have, while real
   rules (the extra-guest charge, the 31-night limit) went untested. Wrong
   expected results could pass real bugs or flag correct behavior as defects.

5. **Which decisions should stay with the tester?**
   What is in scope, which requirements and risks matter most, whether
   expected results are correct, how to handle ambiguous requirements (ask,
   don't assume), and the final decision to accept, revise or reject each test.

---

## AI Transparency

Claude (Claude Opus 5.5, claude.ai) generated both responses in the
`responses/` folder. It also helped draft and format this README. I
reviewed every test idea, recalculated every price, and made the final
accept, revise and reject decisions.
