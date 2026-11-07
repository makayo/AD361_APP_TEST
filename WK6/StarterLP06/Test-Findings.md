# Test Findings: Experience-Based Testing

**Feature:** Rental card

## Step 1: Error Guessing

1. The picture might not show up.
2. The price might be wrong or missing.
3. Clicking the card might not work.

## Step 2: Exploratory Testing

**Charter:** Check that each rental card shows the right info and that its buttons work.

| What I Tried                         | What Happened        | What I Decided to Try Next  |
| ------------------------------------ | -------------------- | --------------------------- |
| Opened the home page                 | 10 cards showed      | Check pictures              |
| Checked pictures                     | All loaded           | Check names and prices      |
| Checked names and prices             | All matched the data | Click the buttons           |
| Clicked More, Save, heart, and share | Nothing happened     | Click the picture and title |
| Clicked the picture and title        | Nothing happened     | Stop                        |

**Future session:** Test the Search box, Add Booking, and Bookings pages.

## Step 3: Checklist-Based Testing

| Check                        | Result | Notes           |
| ---------------------------- | ------ | --------------- |
| All 10 cards show            | Passed |                 |
| Every card has a picture     | Passed |                 |
| Names and prices are correct | Passed |                 |
| More button works            | Failed | Nothing happens |
| Save button works            | Failed | Nothing happens |

## Step 4: Acceptance Testing

| Given, When, Then                                                                                  | Result | Notes           |
| -------------------------------------------------------------------------------------------------- | ------ | --------------- |
| Given I am on the home page, when it loads, then I see all rentals with a picture, name, and price | Passed |                 |
| Given I see a rental, when I click More, then I see its details                                    | Failed | Nothing happens |
| Given I like a rental, when I click Save, then it is saved                                         | Failed | Nothing happens |
