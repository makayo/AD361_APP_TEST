# Learning Practice: Black-Box Testing, Part 2

## Step 1: Identify Conditions and Actions

### Conditions

| ID  | Condition                                                          |
| --- | ------------------------------------------------------------------ |
| C1  | Is the checkout date the same day as the check-in date?            |
| C2  | Is the stay longer than 31 nights?                                 |
| C3  | Is the party larger than 12 people?                                |
| C4  | Is the checkout date the only date already booked by someone else? |
| C5  | Does the guest's card charge go through?                           |

### Actions

| ID  | Action                                                                                                   |
| --- | -------------------------------------------------------------------------------------------------------- |
| A1  | Block the booking because the details break a rule.                                                      |
| A2  | Skip the checkout date when checking which nights are open.                                              |
| A3  | Calculate the total: $200 p/night, $25 p/night for each guest over five, plus one-time $50 cleaning fee. |
| A4  | Move the reservation from Pending to Confirmed.                                                          |
| A5  | Move the reservation from Pending to Cancelled.                                                          |

## Step 2: Create a Decision Table

| Conditions and Actions                | Rule 1 | Rule 2 | Rule 3 | Rule 4 | Rule 5 | Rule 6 |
| ------------------------------------- | :----: | :----: | :----: | :----: | :----: | :----: |
| C1: Checkout same day as check-in?    |   T    |   F    |   F    |   F    |   F    |   F    |
| C2: Stay longer than 31 nights?       |   -    |   T    |   F    |   F    |   F    |   F    |
| C3: Party larger than 12 people?      |   -    |   -    |   T    |   F    |   F    |   F    |
| C4: Only the checkout date is booked? |   -    |   -    |   -    |   T    |   F    |   F    |
| C5: Card charge goes through?         |   -    |   -    |   -    |   T    |   T    |   F    |
| **A1: Block the booking**             |   X    |   X    |   X    |        |        |        |
| **A2: Skip the checkout date**        |        |        |        |   X    |        |        |
| **A3: Calculate the total**           |        |        |        |   X    |   X    |   X    |
| **A4: Move to Confirmed**             |        |        |        |   X    |   X    |        |
| **A5: Move to Cancelled**             |        |        |        |        |        |   X    |

In Rules 4–6, every night before checkout is open.

## Step 3: Create Decision Table Test Cases

| Test ID | Conditions                                        | Input values                                                                             | Expected action                                            | Expected price or exception |
| ------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------- |
| TC01    | Rule 1: checkout same day as check-in             | Check-in Nov 10, checkout Nov 10, 2 guests                                               | Block the booking                                          | ValueError                  |
| TC02    | Rule 2: stay longer than 31 nights                | Check-in Nov 1, checkout Dec 3, 2 guests                                                 | Block the booking                                          | ValueError                  |
| TC03    | Rule 3: party larger than 12                      | Check-in Nov 10, checkout Nov 12, 13 guests                                              | Block the booking                                          | ValueError                  |
| TC04    | Rule 4: only checkout booked, charge goes through | Check-in Nov 10, checkout Nov 12, 4 guests, Nov 12 booked by someone else, card approved | Skip checkout date, calculate the total, move to Confirmed | $450                        |
| TC05    | Rule 5: nothing booked, charge goes through       | Check-in Nov 15, checkout Nov 20, 7 guests, card approved                                | Calculate the total, move to Confirmed                     | $1,300                      |
| TC06    | Rule 6: nothing booked, charge refused            | Check-in Dec 1, checkout Jan 1, 12 guests, card declined                                 | Calculate the total, move to Cancelled                     | $11,675                     |

## Step 4: Identify Reservation States and Events

### States

| ID  | State      |
| --- | ---------- |
| S1  | Pending    |
| S2  | Confirmed  |
| S3  | Checked In |
| S4  | Completed  |
| S5  | Cancelled  |

### Events

| ID  | Event                              |
| --- | ---------------------------------- |
| E1  | Card charge clears                 |
| E2  | Card charge is refused             |
| E3  | Cancellation is requested          |
| E4  | Guest arrives on the check-in date |
| E5  | Stay ends at checkout              |

## Step 5: Create a State Transition Table

| Current State | Event                              | Expected State | Expected Result                                  |
| ------------- | ---------------------------------- | -------------- | ------------------------------------------------ |
| Pending       | Card charge clears                 | Confirmed      | The booking is locked in.                        |
| Pending       | Card charge is refused             | Cancelled      | The booking is dropped.                          |
| Pending       | Cancellation is requested          | Cancelled      | The booking is dropped.                          |
| Confirmed     | Cancellation is requested          | Cancelled      | The booking is dropped.                          |
| Confirmed     | Guest arrives on the check-in date | Checked In     | The guest's stay begins.                         |
| Checked In    | Stay ends at checkout              | Completed      | The stay is finished.                            |
| Pending       | Guest arrives on the check-in date | Pending        | Raises InvalidStateError; state does not change. |
| Checked In    | Cancellation is requested          | Checked In     | Raises InvalidStateError; state does not change. |
| Cancelled     | Card charge clears                 | Cancelled      | Raises InvalidStateError; state does not change. |

## Step 6: Create State Transition Test Cases

| Test ID | Starting State | Event                                                                           | Expected State | Expected Result                                  | Transition Type       |
| ------- | -------------- | ------------------------------------------------------------------------------- | -------------- | ------------------------------------------------ | --------------------- |
| ST01    | Pending        | Card charge clears                                                              | Confirmed      | The booking is locked in.                        | Valid                 |
| ST02    | Pending        | Card charge is refused                                                          | Cancelled      | The booking is dropped.                          | Valid                 |
| ST03    | Pending        | Cancellation is requested                                                       | Cancelled      | The booking is dropped.                          | Valid                 |
| ST04    | Confirmed      | Cancellation is requested                                                       | Cancelled      | The booking is dropped.                          | Valid                 |
| ST05    | Confirmed      | Guest arrives on the check-in date                                              | Checked In     | The guest's stay begins.                         | Valid                 |
| ST06    | Checked In     | Stay ends at checkout                                                           | Completed      | The stay is finished.                            | Valid                 |
| ST07    | Pending        | Guest arrives on the check-in date                                              | Pending        | Raises InvalidStateError; state does not change. | Invalid               |
| ST08    | Checked In     | Cancellation is requested                                                       | Checked In     | Raises InvalidStateError; state does not change. | Invalid               |
| ST09    | Cancelled      | Card charge clears                                                              | Cancelled      | Raises InvalidStateError; state does not change. | Invalid               |
| ST10    | Pending        | Card charge clears → Guest arrives on the check-in date → Stay ends at checkout | Completed      | Pending → Confirmed → Checked In → Completed     | Complete sequence     |
| ST11    | Pending        | Card charge clears → Cancellation is requested                                  | Cancelled      | Pending → Confirmed → Cancelled                  | Cancellation sequence |
