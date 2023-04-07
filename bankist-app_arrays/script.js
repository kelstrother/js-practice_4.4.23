"use strict";

/////////////////////////////////////////////////
//!                      BANKIST APP
/////////////////////////////////////////////////

//!    Data
const account1 = {
  owner: "Jonas Schmedtmann",
  transactions: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  transactions: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  transactions: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  transactions: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerTransactions = document.querySelector(".transactions");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//!   DISPLAYING TRANSACTIONS
const displayTransactions = function (transactions) {
  containerTransactions.innerHTML = "";
  transactions.forEach(function (trans, i) {
    const type = trans > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="transactions__row">
        <div class="transactions__type transactions__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="transactions__value">${trans}€</div>
      </div>
    `;

    containerTransactions.insertAdjacentHTML("afterbegin", html);
  });
};
// displayTransactions(account1.transactions);

//!  CALC AND DISPLAY TOTAL BALANCE
const calcDisplayBalance = (acct) => {
  acct.balance = acct.transactions.reduce((acct, trans) => acct + trans, 0);
  labelBalance.textContent = `${acct.balance} EUR`;
};
// calcDisplayBalance(account1.transactions);

//!   CALCULATE AND DISPLAY SUMMARY
const calcDisplaySummary = (account) => {
  // ? TOTAL DEPOSIT
  const incomes = account.transactions
    .filter((trans) => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumIn.textContent = `${incomes} EUR`;

  // ? TOTAL WITHDRAWAL
  const out = account.transactions
    .filter((trans) => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumOut.textContent = `${Math.abs(out)} EUR`;

  // ? TOTAL INTEREST
  const interest = account.transactions
    .filter((trans) => trans > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)

    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest} EUR`;
};
// calcDisplaySummary(account1.transactions);

//!   CREATING AND ADDING USERNAME TO ACCOUNT OBJECT
const createUsername = function (accts) {
  accts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsername(accounts);

// ?  display all account info balance, summary & transactions
const updateUI = function (acct) {
  displayTransactions(acct.transactions);
  calcDisplayBalance(acct);
  calcDisplaySummary(acct);
};

//!                       EVENT HANDLERS                              
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  // ? finding the username of current account
  currentAccount = accounts.find(
    (acct) => acct.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  // ? checking if the pin matches the current account's pin
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // ?  display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // ?  clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    //?   UPDATING THE UI
    updateUI(currentAccount);
  }
});
//!                 CLOSE ACCOUNT EVENT                       
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
    ) {
    const index = accounts.findIndex(
      (acct) => acct.username === currentAccount.username
    );
    //?   delete account
    accounts.splice(index, 1);
    //?   hide ui
    containerApp.style.opacity = 0;
  //  ?   clear inputs
  inputCloseUsername.value = inputClosePin.value = "";
  inputClosePin.blur();
  //  ?   set welcome message to its default
    labelWelcome.textContent = "Log in to get started";
  }
});
//!                   TRANSFER FUNCTIONALITY
//?       event listener when user submits transfer
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcct = accounts.find(
    (acct) => acct.username === inputTransferTo.value
  );
  //?   CLEARING INPUT FIELDS
  inputTransferTo.value = inputTransferAmount.value = "";
  inputTransferAmount.blur();
  if (
    //?       checking that the transfer is a positive amount
    amount > 0 &&
    //?       checking if the receiver account exists
    receiverAcct &&
    //?       checking if the account has the funds for the transfer
    currentAccount.balance >= amount &&
    //?       checking that receiver account is not the same as the current account
    receiverAcct?.username !== currentAccount.username
  ) {
    currentAccount.transactions.push(-amount);
    receiverAcct.transactions.push(amount);

    updateUI(currentAccount);
    // clearInputs(currentAccount);
  }
});
// const user = "Steven Thomas Williams"; // username stw

/////////////////////////////////////////////////
//!                        LECTURES
/////////////////////////////////////////////////

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

const transactions = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const euroToUsd = 1.1;

//!   LOOPING AN ARRAY INTO A NEW ARRYA WITH "MAP"
//? ANNONYMOUS FUNCTION
// const transactionsUSD = transactions.map(function(trans) {
//   return trans * euroToUsd;
// })
//? ARROW FUNCTION
// const transactionsUSD = transactions.map(trans => trans * euroToUsd);

// console.log(transactions);
// console.log(transactionsUSD);

//!   LOOPING AN ARRAY INTO A NEW ARRYA WITH "FOR OF LOOP"
// const transactionsUSDFor = [];
// for (const trans of transactions) transactionsUSDFor.push(trans * euroToUsd);
// console.log(transactionsUSDFor);

//?   MAP WITH IF ELSE
// const transactionDesc = transactions.map((trans, i, arr) => {
//   if (trans > 0) {
//     return `Transaction ${i +1}: You Deposited ${trans}`;
//   } else {
//     return `Transaction ${i +1}: You Withdrew ${Math.abs(trans)}`;
//   }
// })
// console.log(transactionDesc);
//?   MAP WITH TERNARY LOGIC
// const transactionDesc = transactions.map((trans, i) =>
//   `Transaction ${i + 1}: You ${trans > 0 ? 'deposited' : 'withdrew'} ${Math.abs(trans)}`);
// console.log(transactionDesc);

//!       FILTER ARRAY METHOD
// const deposits = transactions.filter(function(trans) {
//   return trans > 0;
// })
// const withdrawals = transactions.filter(trans => trans < 0)
// console.log(deposits);
// console.log(withdrawals);

//!       REDUCE ARRAY METHOD
//? accumulator = sum of all previous el
const balance = transactions.reduce((acc, cur) => acc + cur, 0);

//!   MAXIMUM VALUE OF ARRAY
// const max = transactions.reduce((acc, trans) => {
//   if (acc > trans)
//   return acc
//   else return trans;
// }, transactions[0]);
// console.log(max);

//!   CHAINING METHODS
// const euroToUsd = 1.1;
// const totalDepositsUSD = transactions
// ?    removing non positive transactions
// .filter((trans) => trans > 0)
// ?    converting the value to USD
// .map((trans) => trans * euroToUsd)
// ?    adding up the total value of the deposits in USD
// .reduce((acc, trans) => acc + trans, 0);
// console.log(totalDepositsUSD);

//!   FIND ARRAY METHOD
// ?   .FIND RETURNS THE FIRST ELEMENT THAT MATCHES THE CONDITION
// const account = accounts.find(acct => acct.owner === 'Jessica Davis');
// console.log(account);
