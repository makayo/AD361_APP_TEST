# Test Plan: North Vacation Booking

## Step 1: Test Context

| Section                  | Description                               |
| ------------------------ | ----------------------------------------- |
| Test objective 1         | Confirm users can create a valid booking  |
| Test objective 2         | Confirm users can view their bookings     |
| In scope                 | Booking form and booking list             |
| Out of scope             | Payment processing                        |
| Test basis               | Booking requirements and user stories     |
| Assumption or constraint | Testing must be completed within one week |

## Step 2: Roles and Responsibilities

| Role          | Responsibilities                          | When Involved             | Communication                 |
| ------------- | ----------------------------------------- | ------------------------- | ----------------------------- |
| Tester        | Designs and runs tests                    | Before and during testing | Reports defects to developers |
| Developer     | Fixes defects                             | When defects are reported | Updates testers on fixes      |
| Product owner | Defines requirements and approves release | Start and end of testing  | Reviews results with the team |

## Step 3: Test Approach

| Test Area       | Test Level or Type            | Technique                | Manual or Automated | Deliverable            |
| --------------- | ----------------------------- | ------------------------ | ------------------- | ---------------------- |
| Booking form    | Component testing, functional | Boundary value analysis  | Automated           | Automated test file    |
| Booking dates   | System testing, functional    | Equivalence partitioning | Manual              | Test cases and results |
| Booking process | System testing, usability     | Exploratory testing      | Manual              | Defect reports         |

## Step 4: Test Requirements

- **Environment:** App running in a test environment
- **Browsers:** Chrome on desktop
- **Tools:** Testing framework and browser developer tools
- **Test data:** Sample rentals, valid and invalid dates, and guest counts
- **Access:** App and repository access
- **Training:** Basic knowledge of testing tools

## Step 5: Risk Register

| Risk                            | Type         | Likelihood | Impact | Mitigation                       |
| ------------------------------- | ------------ | ---------- | ------ | -------------------------------- |
| Booking allows invalid dates    | Product risk | Medium     | High   | Prioritize date validation tests |
| Booking allows 0 guests         | Product risk | Medium     | High   | Test guest count boundaries      |
| Test environment is unavailable | Project risk | Low        | High   | Confirm access before testing    |

## Step 6: Entry Criteria

| Type  | Criterion                                 |
| ----- | ----------------------------------------- |
| Entry | The app opens in the test environment     |
| Entry | All planned test cases have been reviewed |
| Entry | Testing tools are installed and ready     |

## Step 7: Exit Criteria

| Type | Criterion                                         |
| ---- | ------------------------------------------------- |
| Exit | 100% of planned high-priority tests have been run |
| Exit | At least 80% statement coverage is achieved       |
| Exit | No critical defects remain open                   |

## Step 8: Test Schedule

| Activity                     | Responsible Role         | Time     | Dependency                       |
| ---------------------------- | ------------------------ | -------- | -------------------------------- |
| Review requirements          | Tester and product owner | Day 1    | Requirements available           |
| Design test cases            | Tester                   | Day 2    | Requirements reviewed            |
| Set up test environment      | Tester                   | Day 2    | Code available                   |
| Run tests and report defects | Tester                   | Days 3–4 | Test cases and environment ready |
| Fix defects and retest       | Developer and tester     | Day 5    | Defects reported                 |

## Step 9: Communication Plan

| Information    | Audience     | Method         | Frequency              |
| -------------- | ------------ | -------------- | ---------------------- |
| Test progress  | Project team | Daily stand-up | Daily                  |
| Defect reports | Developers   | GitHub issues  | When a defect is found |

## AI Transparency

AI was used to help create portions of this file and to clean up its writing and formatting.
