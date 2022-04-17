'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500.32, 250, -300.92, 5000, -850, -110.18, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2022-02-17T07:43:59.331Z',
    '2022-02-19T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'CAD',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];
// console.log(accounts);

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseNickname = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// формат даты
const formatTransactionDate = function (date, locale) {
  const getDaysBetween2Dates = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPassed = getDaysBetween2Dates(new Date(), date);

  if (daysPassed === 0) return 'Сегодня';
  if (daysPassed === 1) return 'Вчера';
  if (daysPassed <= 5) return `${daysPassed} дня назад`;
  else {
    // const day = `${date.getDate()}`.padStart(2, '0');
    // const month = `${date.getMonth() + 1}`.padStart(2, '0');
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;

    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

// begin  - отобразим транзакции
const displayTransactions = function (account, sort = false) {
  // сначала очищаем контейнер
  containerTransactions.innerHTML = '';

  // для сортировки - метод slice для копии массива
  const transacs = sort
    ? account.transactions.slice().sort((x, y) => x - y)
    : account.transactions;

  transacs.forEach(function (trans, index) {
    const transType = trans > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(account.transactionsDates[index]);

    const transDate = formatTransactionDate(date, account.locale);

    const formattedTrans = formatCurrency(
      trans,
      account.locale,
      account.currency
    );

    const transactionRow = `
      <div class="transactions__row">
          <div class="transactions__type transactions__type--${transType}">
            ${index + 1} ${transType}
          </div>
          <div class="transactions__date">${transDate}</div>
          <div class="transactions__value">${formattedTrans}</div>
        </div>
    `;
    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);
  });
};

// вычисл никнейм для кадждого из акк
const createNicknames = function (accs) {
  accs.forEach(function (acc) {
    acc.nickname = acc.userName
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createNicknames(accounts);

// nickname = 'oa'
// const userName = 'Oliver Avila';

// const nickname = userName
//   .toLowerCase()
//   .split(' ')
//   .map(function (word) {
//     return word[0];
//   })
//   .join('');
// console.log(nickname); // (2) ['oliver', 'avila'] - вместе с функцией выходит (2) ['o', 'a'] - потом с join ('') // oa

// переделать в стрелку
// const nickname = userName
//   .toLowerCase()
//   .split(' ')
//   .map(word => word[0])
//   .join('');
// console.log(nickname);

const displayBalance = function (account) {
  const balance = account.transactions.reduce((acc, item) => acc + item, 0);
  account.balance = balance;

  labelBalance.textContent = formatCurrency(
    balance,
    account.locale,
    account.currency
  );
};

// посчитаем получение средств и вывод
const displayTotal = function (account) {
  const depositeTotal = account.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);

  labelSumIn.textContent = formatCurrency(
    depositeTotal,
    account.locale,
    account.currency
  );

  const withdrawalsTotal = account.transactions
    .filter(trans => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);

  labelSumOut.textContent = formatCurrency(
    withdrawalsTotal,
    account.locale,
    account.currency
  );

  const interestTotal = account.transactions
    .filter(trans => trans > 0)
    .map(depos => (depos * account.interest) / 100)
    .filter((interest, index, arr) => {
      // console.log(arr);
      return interest >= 5;
    })
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = formatCurrency(
    interestTotal,
    account.locale,
    account.currency
  );
};

const updateUi = function (account) {
  // display transactions
  displayTransactions(account);
  // display balance
  displayBalance(account);
  // display total
  displayTotal(account);
};

// имплементация логин
// получаем пользователя коотрый пытается залогинеться
let currentAccount;

let currentLogOutTimer;
// ///////////////////////////
// // сделаем так что мы  всегда залогинены
// currentAccount = account1;
// updateUi(currentAccount);
// containerApp.style.opacity = 100;
// ///////////////////////////

// timers
const startLogoutTimer = function () {
  const logOutTimerCallback = function () {
    const minutes = String(Math.trunc(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    // в каждом вызове показывать оставш время в ui
    labelTimer.textContent = `${minutes}:${seconds}`;

    // после истечения времени остановить таймер и выйти из приложения
    if (time === 0) {
      clearInterval(logOutTimer);
      containerApp.style.opacity = 100;

      labelWelcome.textContent = 'Войдите в свой аккаунт';
    }

    time--;
  };

  // установить время выхода через 5 мин
  let time = 300;

  // вызов таймера кажд секунду
  logOutTimerCallback();
  const logOutTimer = setInterval(logOutTimerCallback, 1000);

  return logOutTimer;
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    account => account.nickname === inputLoginUsername.value
  );
  // console.log(currentAccount);

  // optional chaining
  if (currentAccount?.pin === +inputLoginPin.value) {
    // display ui and welcome message
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Рады что вы снова с нами, ${
      currentAccount.userName.split(' ')[0]
    } !!!`;

    // созд даты и отобр ее после ввода лоина и пароля
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, '0');
    // const month = `${now.getMonth() + 1}`.padStart(2, '0'); // решение проблемы
    // const year = now.getFullYear();
    // labelDate.textContent = `${day}/${month}/${year}`;

    // дата и отобр мо межд формату

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };

    // const locale = navigator.language; // из браузера

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // исчезание в поле логин и пароль значений после залогинивания - clear inputs
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    // исбавляемся от курсора на инпуте при успешно вводе логина
    inputLoginPin.blur();

    // check if timer exist
    if (currentLogOutTimer) clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();

    updateUi(currentAccount);
  }
});

// имплементация transfers - перевод денег от одного пользователя к другому
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferAmount = +inputTransferAmount.value;
  // данные получателя
  const recipientNickname = inputTransferTo.value;
  // весь счет
  const recipientAccount = accounts.find(
    account => account.nickname === recipientNickname
  );
  // console.log(transferAmount, recipientAccount);

  // очитска полей
  inputTransferTo.value = '';
  inputTransferAmount.value = '';

  // проверки (введено положить число и общий баланс больше введенного), нельзя деньги пеереводить со своего счета на свой счет и? убедиться что этот акк существует
  if (
    transferAmount > 0 &&
    currentAccount.balance >= transferAmount &&
    recipientAccount &&
    currentAccount.nickname !== recipientAccount.nickname
  ) {
    // после того как всё работает в этом блоке мы должны сделать три пункта
    // добавить отриц транзакц текущ пользователю, добавить положить транзакц получателю и потом обновить UI
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);

    // обновим даты
    currentAccount.transactionsDates.push(new Date().toISOString());
    recipientAccount.transactionsDates.push(new Date().toISOString());
    // обновление ui
    updateUi(currentAccount);

    // reset timer
    clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();
  }
});

// закрытие счета
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  // корректность реквезитов - findindex return true or false
  if (
    inputCloseNickname.value === currentAccount.nickname &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const currentAccountIndex = accounts.findIndex(
      account => account.nickname === currentAccount.nickname
    );
    // удалить пользователя из данных
    accounts.splice(currentAccountIndex, 1);
    // выйти их приложения и спрятать ui
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Войдите в свой аккаунт';
  }
  inputCloseNickname.value = '';
  inputClosePin.value = '';
});

// займ
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Math.floor(inputLoanAmount.value);

  // проверка депозита больше 10% от заема
  if (
    loanAmount > 0 &&
    currentAccount.transactions.some(trans => trans >= (loanAmount * 10) / 100)
  ) {
    setTimeout(function () {
      currentAccount.transactions.push(loanAmount);
      currentAccount.transactionsDates.push(new Date().toISOString());
      updateUi(currentAccount);
    }, 5000);
  }
  inputLoanAmount.value = '';

  // reset timer
  clearInterval(currentLogOutTimer);
  currentLogOutTimer = startLogoutTimer();
});

//сортировка
// нужно созд переменн состояния обычно boolean

let transactionsSorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayTransactions(currentAccount, !transactionsSorted);
  transactionsSorted = !transactionsSorted;
});

// array.from() example

// const transactionsUi = document.querySelectorAll('.transactions__value');
// console.log(transactionsUi); // NodeList(2) [div.transactions__value, div.transactions__value]

// const logoImage = document.querySelector('.logo');
// logoImage.addEventListener('click', function () {
//   const transactionsUi = document.querySelectorAll('.transactions__value');
//   console.log(transactionsUi); // NodeList(8) [div.transactions__value, div.transactions__value, div.transactions__value, div.transactions__value, div.transactions__value, div.transactions__value, div.transactions__value, div.transactions__value]

// преобр пошагово в массив 1 способ
// const transactionsUiArray = Array.from(transactionsUi);
// console.log(transactionsUiArray.map(elem => Number(elem.textContent))); // (8) [1100, -170, -110, -850, 5000, -300, 250, 500]

// 2 способ
// const transactionsUiArray = Array.from(transactionsUi, elem =>
//   Number(elem.textContent)
// );
// console.log(transactionsUiArray);
// });

// раскрасим немного приложение
// const logoImage = document.querySelector('.logo');
// logoImage.addEventListener('click', function () {
//   [...document.querySelectorAll('.transactions__row')].forEach(function (
//     row,
//     i
//   ) {
//     if (i % 2 === 0) {
//       row.style.backgroundColor = 'grey';
//     }
//   });
// }); // node list transform to array

// таймеры выхода
