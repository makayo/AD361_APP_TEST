# Step 2: Use a General Prompt

The exact prompt given in the assignment and the complete, unedited response.
The evaluation of this response is in the main `README.md` (Step 2).

**Model:** Claude Opus 5.5 (claude.ai)
**Date:** 2026-11-25

## Prompt

```text
Create tests for a vacation booking application.
```

## Complete Response

Here's a set of test cases for a vacation booking application, grouped by feature area.

### 1. Search and Availability

| ID | Test | Expected Result |
| -- | ---- | --------------- |
| S-01 | Search by destination with valid check-in/check-out dates | Matching properties are listed |
| S-02 | Search with check-out before check-in | Validation error is shown |
| S-03 | Search with no results (remote location, peak dates) | "No properties found" message |
| S-04 | Filter by price range, amenities and property type | Only matching properties are shown |
| S-05 | Sort results by price (low to high) | Results ordered correctly |
| S-06 | Search for past dates | Search is blocked with an error |

### 2. Booking Flow

| ID | Test | Expected Result |
| -- | ---- | --------------- |
| B-01 | Book an available property with valid details | Booking confirmed, confirmation number shown |
| B-02 | Try to book dates that are already booked | Error: dates unavailable |
| B-03 | Enter more guests than the property allows | Error: exceeds maximum occupancy |
| B-04 | Leave required fields empty (name, email) | Field-level validation errors |
| B-05 | Two users book the same property and dates at the same time | Only one booking succeeds |
| B-06 | Verify the total price includes nightly rate, taxes and fees | Total is calculated correctly |

### 3. Payment

| ID | Test | Expected Result |
| -- | ---- | --------------- |
| P-01 | Pay with a valid credit card | Payment succeeds, booking confirmed |
| P-02 | Pay with an expired or declined card | Payment fails, booking not created |
| P-03 | Apply a valid promo code | Discount applied to total |
| P-04 | Apply an invalid or expired promo code | Error message, no discount |
| P-05 | Payment gateway times out | User sees a retry message; no double charge |

### 4. Cancellation and Changes

| ID | Test | Expected Result |
| -- | ---- | --------------- |
| C-01 | Cancel within the free-cancellation window | Full refund issued |
| C-02 | Cancel after the window | Partial or no refund per policy |
| C-03 | Modify booking dates to available dates | Booking updated, price recalculated |

### 5. User Accounts

| ID | Test | Expected Result |
| -- | ---- | --------------- |
| U-01 | Register with valid details | Account created, verification email sent |
| U-02 | Log in with wrong password | Error, no access |
| U-03 | View booking history | All past and upcoming bookings shown |

### 6. Non-Functional

- **Performance:** search returns results in under 2 seconds with 1,000 concurrent users.
- **Security:** payment data is encrypted; SQL injection in the search box is rejected.
- **Usability/Accessibility:** booking flow is usable with a screen reader and on mobile.
- **Compatibility:** works in current Chrome, Firefox, Safari and Edge.

### 7. Edge Cases

- Bookings that span a daylight-saving-time change
- Leap-year dates (Feb 29)
- Different currencies and time zones
- Very long stays (e.g., 90+ nights)

Would you like me to turn any of these into detailed test scripts or automated tests (e.g., Playwright or Cypress)?
