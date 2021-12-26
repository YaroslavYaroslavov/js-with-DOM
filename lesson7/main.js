'use strict';

let money;
let toCount = (document.querySelector('#start'));

let addExpenses = document.querySelectorAll('button')[1]
let addIncome = document.querySelectorAll('button')[0]
let checkbox = document.querySelector('#deposit-check')
let addIncomeMaybe = document.querySelectorAll('.additional_income-item')
let budgetMonth = document.querySelector('.budget_month-value')
let budgetDay = document.querySelector('.budget_day-value')
let expensesMonth = document.querySelector('.expenses_month-value')
let additionaIncome = document.querySelector('.additional_income-value')
let additionalExpenses = document.querySelector('.additional_expenses-value')
let incomePeriod = document.querySelector('.income_period-value')
let targerMonth = document.querySelector('.target_month-value');

/*function isNumber(a) {
    return !isNaN(parseFloat(a))
}

function start() {
    do { money = prompt('Ваш месячный доход?') }
    while (!isNumber(money))
}
start();
let appData = {
    budget: money,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    expensesArr: [],
    deposit: false,
    mission: 50000,
    period: 3,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    expensesArrCount: [],
    precentDeposit: 0,
    moneyDeposit: 0,
    asking: function() {

        if (confirm('У вас есть дополнительный заработок')) {
            let itemIncome = prompt('Какой у вас дополнительный заработок?')
            let cashIncome;
            do { cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?') }
            while (!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }
        appData.addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
        appData.addExpenses = appData.addExpenses.toLowerCase().split(',');
        for (let i = 0; i < 2; i++) {
            appData.expensesArr[i] = prompt('Введите обязательную позицию затрат');
            do { appData.expensesArrCount[i] = +prompt('Во сколько это обойдется?') }
            while (!isNumber(appData.expensesArrCount[i]));
        }
        for (let i = 0; i < 2; i++) {

            let key = appData.expensesArr[i];
            let value = appData.expensesArrCount[i];
            appData.expenses[key] = value;
        }
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
        appData.deposit = confirm("У вас есть депозит в банке?");
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        Math.ceil(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: function() {
        if (appData.budgetDay < 0) {
            console.log('Что-то пошло не так')
        } else
        if (appData.budgetDay <= 600) {
            console.log('У вас низкий доход')
        } else
        if (appData.budgetDay > 600 && appData.budgetDay <= 1200) {
            console.log('У вас средний уровень дохода')
        } else console.log('У вас высокий уровень дохода')
    },
    getInfoDeposit: function() {
        if (appData.deposit) {
            do { appData.precentDeposit = prompt('Какой годовой процент?') }
            while (!isNumber(appData.precentDeposit))
            do { appData.moneyDeposit = prompt('Какая сумма заложена?') }
            while (!isNumber(appData.moneyDeposit))
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }

}
appData.asking();
appData.getBudget();
console.log(appData.expensesMonth);
console.log(appData.budgetDay);
console.log(appData.budgetMonth);
console.log(appData.period);
console.log(appData.expenses);
console.log(appData.addExpenses.length);
if (appData.getTargetMonth() > 0) {
    console.log("Цель будет достигнута через ", appData.getTargetMonth(), " месяцев")
} else console.log("Цель не будет достигнута");
console.log("Цель заработать ", appData.mission, " денег");
appData.getStatusIncome();
for (let key in appData) {
    console.log(key + ": " + appData[key])
}  */