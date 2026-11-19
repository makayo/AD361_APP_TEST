# Counter Application — Test Report

## 1. Test Plan

**Objective:** Verify that Increment, Decrement, and Reset update the displayed count correctly.

**In scope:** Button behavior, displayed count, and sequences of button clicks.

**Out of scope:** Styling, performance, and unrelated features.

**Approach:** Manually execute four functional tests in the browser and repeat failed tests.

**Environment:** Windows, React/TypeScript Counter application, Vite development server, web browser.

**Product risk:** Incorrect counter calculations may show unreliable values.

**Entry criteria:** Application starts and the Increment, Decrement, and Reset buttons are available.

**Exit criteria:** At least four tests executed; actual results and pass/fail recorded; failures retested and reported.

## 2. Test Cases

| ID    | Starting state | Actions                               | Expected result |
| ----- | -------------- | ------------------------------------- | --------------- |
| TC-01 | Count: 0       | Click Increment once                  | Count: 1        |
| TC-02 | Count: 0       | Click Decrement once                  | Count: -1       |
| TC-03 | Count: 0       | Click Increment, then Reset           | Count: 0        |
| TC-04 | Count: 0       | Click Increment twice, then Decrement | Count: 1        |

## 3. Test Execution Results

| ID    | Actual result                          | Status |
| ----- | -------------------------------------- | ------ |
| TC-01 | Count increased from 0 to 1            | Pass   |
| TC-02 | Count increased from 0 to 1            | Fail   |
| TC-03 | Increment and Reset worked as expected | Pass   |
| TC-04 | Count progressed from 0 to 1 to 2 to 3 | Fail   |

**Summary:** 4 tests executed: 2 passed, 2 failed.

**Confirmation testing:** The Decrement behavior was repeated from a reset count of 0 and again increased the count to 1. This confirms the failure is reproducible.

## 4. Defect Report

| Field              | Details                                                                  |
| ------------------ | ------------------------------------------------------------------------ |
| Defect ID          | DEF-001                                                                  |
| Title              | Decrement button increases the count                                     |
| Related test cases | TC-02, TC-04                                                             |
| Test environment   | Windows; React/TypeScript Counter app running with Vite in a web browser |
| Severity           | Medium                                                                   |
| Priority           | High                                                                     |
| Status             | Open                                                                     |

**Steps to reproduce:**

1. Start the Counter application in the browser.
2. Click **Reset** so the displayed count is 0.
3. Click **Decrement** once.
4. Observe the displayed count.

**Expected result:** The count decreases from 0 to -1.

**Actual result:** The count increases from 0 to 1.

**Source-code evidence:** In `counter-app/src/App.tsx`, the Decrement button calls `setCount(count + 1)` instead of decrementing:

```tsx
<button onClick={() => setCount(count + 1)}>Decrement</button>
```

**Conclusion:** One reproducible defect was identified. The application source code was not modified.

## AI Transparency

AI was used to clean up this file.
