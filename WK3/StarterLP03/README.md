## Equivalence Partition Tables

### Number of Nights

| Classification   | Partition    | Range or Condition | Expected Result |
| ---------------- | ------------ | ------------------ | --------------- |
| Number of nights | Invalid low  | < 1                | ValueError      |
| Number of nights | Valid        | 1-31               | Accepted        |
| Number of nights | Invalid high | > 31               | ValueError      |

### Number of Guests

| Classification   | Partition             | Range or Condition | Expected Result                     |
| ---------------- | --------------------- | ------------------ | ----------------------------------- |
| Number of guests | Invalid low           | < 1                | ValueError                          |
| Number of guests | Valid, standard rate  | 1-5                | No additional guest fee             |
| Number of guests | Valid, additional fee | 6-12               | Additional $25 per guest, per night |
| Number of guests | Invalid high          | > 12               | ValueError                          |

### Check-in and Checkout Dates

| Classification | Partition | Range or Condition               | Expected Result |
| -------------- | --------- | -------------------------------- | --------------- |
| Dates          | Valid     | Check-in is before checkout      | Accepted        |
| Dates          | Invalid   | Check-in is on or after checkout | ValueError      |

### Availability

| Classification | Partition   | Range or Condition | Expected Result  |
| -------------- | ----------- | ------------------ | ---------------- |
| Availability   | Available   | All nights open    | Accepted         |
| Availability   | Unavailable | A night is booked  | UnavailableError |

## Test Cases

| Test Case | Classification   | Partition             | Input                                            | Expected Result                               |
| --------- | ---------------- | --------------------- | ------------------------------------------------ | --------------------------------------------- |
| TC01      | Number of nights | Invalid low           | Nov 1 - Nov 1 (0 nights), 2 guests               | ValueError                                    |
| TC02      | Number of nights | Valid                 | Nov 1 - Nov 8 (7 nights), 2 guests               | Accepted                                      |
| TC03      | Number of nights | Invalid high          | Nov 1 - Dec 3 (32 nights), 2 guests              | ValueError                                    |
| TC04      | Number of guests | Invalid low           | Nov 1 - Nov 4 (3 nights), 0 guests               | ValueError                                    |
| TC05      | Number of guests | Valid, standard rate  | Nov 1 - Nov 4 (3 nights), 3 guests               | Accepted, no additional guest fee             |
| TC06      | Number of guests | Valid, additional fee | Nov 1 - Nov 4 (3 nights), 8 guests               | Accepted, additional $25 per guest, per night |
| TC07      | Number of guests | Invalid high          | Nov 1 - Nov 4 (3 nights), 13 guests              | ValueError                                    |
| TC08      | Dates            | Valid                 | Nov 10 - Nov 12 (2 nights), 2 guests             | Accepted                                      |
| TC09      | Dates            | Invalid               | Nov 12 - Nov 10, 2 guests                        | ValueError                                    |
| TC10      | Availability     | Available             | Nov 15 - Nov 18 (3 nights), 2 guests             | Accepted                                      |
| TC11      | Availability     | Unavailable           | Nov 18 - Nov 22, 2 guests, Nov 20 already booked | UnavailableError                              |

**Note:** AI was used to clean this up.