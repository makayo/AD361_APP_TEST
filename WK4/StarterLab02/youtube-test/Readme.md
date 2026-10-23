# Black Box Testing

## Step 1: Select a Website

- **Website:** YouTube
- **URL:** https://www.youtube.com
- **Feature tested:** Like a video

## Step 2: Equivalence Partitioning

### Valid Partitions

| ID  | Partition                  | Representative value           | Expected result     |
| --- | -------------------------- | ------------------------------ | ------------------- |
| VP1 | Signed in; video not liked | Click Like on an unliked video | Video becomes liked |
| VP2 | Signed in; video liked     | Click Like on a liked video    | Like is removed     |

### Invalid Partitions

| ID  | Partition  | Representative value        | Expected result     |
| --- | ---------- | --------------------------- | ------------------- |
| IP1 | Signed out | Click Like while signed out | Sign-in is required |

## Step 3: Decision Table Testing

### Conditions

| ID  | Condition                   |
| --- | --------------------------- |
| C1  | Is the user signed in?      |
| C2  | Is the video already liked? |

### Actions

| ID  | Action          |
| --- | --------------- |
| A1  | Add the like    |
| A2  | Remove the like |
| A3  | Require sign-in |

### Decision Table

| Conditions / Actions     | Rule 1 | Rule 2 | Rule 3 |
| ------------------------ | ------ | ------ | ------ |
| C1: User signed in?      | Yes    | Yes    | No     |
| C2: Video already liked? | No     | Yes    | –      |
| A1: Add the like         | X      |        |        |
| A2: Remove the like      |        | X      |        |
| A3: Require sign-in      |        |        | X      |

– = does not matter

### Test Cases

| Test ID | Rule   | Input                                  | Expected result     |
| ------- | ------ | -------------------------------------- | ------------------- |
| DT1     | Rule 1 | Signed in; video not liked; click Like | Video becomes liked |
| DT2     | Rule 2 | Signed in; video liked; click Like     | Like is removed     |
| DT3     | Rule 3 | Signed out; click Like                 | Sign-in is required |

## Step 4: State Transition Testing

### States

| ID  | State                      |
| --- | -------------------------- |
| S1  | Signed out                 |
| S2  | Signed in, video not liked |
| S3  | Signed in, video liked     |

### Events

| ID  | Event      |
| --- | ---------- |
| E1  | Sign in    |
| E2  | Click Like |
| E3  | Sign out   |

### Valid Transitions

| From | Event          | To                    |
| ---- | -------------- | --------------------- |
| S1   | E1: Sign in    | S2                    |
| S1   | E2: Click Like | S1 (sign-in required) |
| S2   | E2: Click Like | S3                    |
| S2   | E3: Sign out   | S1                    |
| S3   | E2: Click Like | S2                    |
| S3   | E3: Sign out   | S1                    |

### Invalid Transitions

| From | Event        |
| ---- | ------------ |
| S1   | E3: Sign out |
| S2   | E1: Sign in  |
| S3   | E1: Sign in  |

### State Transition Table

| State | E1: Sign in | E2: Click Like | E3: Sign out |
| ----- | ----------- | -------------- | ------------ |
| S1    | S2          | S1             | Invalid      |
| S2    | Invalid     | S3             | S1           |
| S3    | Invalid     | S2             | S1           |

### Test Cases

| Test ID | Start state | Event      | Expected result                       |
| ------- | ----------- | ---------- | ------------------------------------- |
| ST1     | S1          | Sign in    | S2: signed in, video not liked        |
| ST2     | S1          | Click Like | S1: sign-in required, video not liked |
| ST3     | S2          | Click Like | S3: video becomes liked               |
| ST4     | S3          | Click Like | S2: like is removed                   |
| ST5     | S2          | Sign out   | S1: signed out                        |
| ST6     | S3          | Sign out   | S1: signed out                        |

## AI Transparency

AI was used to clean up this file.
