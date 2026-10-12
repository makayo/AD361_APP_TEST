// Program requirements:
// - A user can withdraw funds.
// - A user can deposit funds.
// - A user's balance should never become negative.
// - A PIN must be provided during every action.

const USER = "Rose Thecat";
let balance = 15983;
const USER_PIN = 1234;

// Deposits money into a user's account.
export function deposit(pin: number, amount: number) {
  if (pin === USER_PIN) {
    if (amount <= 0) {
      console.log("Amount must be more than 0");
      return;
    }
    balance += amount;
    console.log(balance);
    return balance;
  } else {
    console.log("Incorrect PIN");
  }
}

// Withdraws money from a user's account.
export function withdraw(pin: number, amount: number) {
  if (pin === USER_PIN) {
    if (amount <= 0) {
      console.log("Amount must be more than 0");
      return;
    }
    if (amount > balance) {
      console.log("Not enough money");
      return;
    }
    balance -= amount;
    console.log(balance);
    return balance;
  } else {
    console.log("Incorrect PIN");
  }
}

// Returns the account balance.
export function balanceCheck(pin: number) {
  if (pin === USER_PIN) {
    console.log(`${USER}, your balance is ${balance}`);
    return balance;
  } else {
    console.log("Incorrect PIN");
  }
}

// Transfers money to another user's account and withdraws it from the account.
export function transfer(pin: number, amount: number, receiver: string) {
  const transferAmount = withdraw(pin, amount);
  if (transferAmount === undefined) {
    console.log("Transfer failed");
    return;
  }
  console.log(`Success! ${amount} was transferred to ${receiver}`);
  return transferAmount;
}

// AI transparency: AI was used to clean up this code.
