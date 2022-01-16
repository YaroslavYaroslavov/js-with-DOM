'use strict';


const
    start = document.getElementById('start'),
    reset = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('.deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accamulatedMonthValue = document.getElementsByClassName('accamulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelectorAll('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),

    additionalExpenses = document.querySelector('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),

    periodAmount = document.querySelector('.period-amount'),

    inputsResult = document.querySelectorAll('.result-total');
let
    incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    inputs = document.querySelectorAll('input');

const appData = {
    budget: 0,
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


        appData.deposit = confirm("У вас есть депозит в банке?");
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();

    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return Math.ceil(targetAmount.value / appData.budgetMonth);
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
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key]
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;

            }
        });
    },
    getIncome: function() {

    },
    calcSavedMoney: function() {
        return appData.budgetMonth * periodSelect.value;
    },
    blockInput: function() {
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true;
        }
        reset.style.display = 'inline'
        start.style.display = 'none'
        expensesPlus.style.display = 'none'
        incomePlus.style.display = 'none'
    },
    unblockInput: function() {
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
        }
        for (let i = 0; i < inputsResult.length; i++) {
            inputsResult[i].disabled = true;
        }
        reset.style.display = 'none'
        start.style.display = 'inline'


        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none'
        } else {
            expensesPlus.style.display = 'inline'
        }
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none'
        } else {
            incomePlus.style.display = 'inline'
        }
    },
    clear: function() {
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
        periodSelect.value = '1';
        periodAmount.innerHTML = '1';
    },
    reset: function() {
        this.unblockInput();
        this.clear();
    },
    start: function() {
        if (salaryAmount.value) {
            appData.budget = +salaryAmount.value;
            this.getExpenses();
            this.getExpensesMonth();
            // appData.asking(); 
            this.getAddExpenses();
            this.getAddIncome();
            this.getBudget();
            this.showResult();
            this.blockInput();

            return;
        } else {
            alert('Ошибка ввода.')
        }


    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        })
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue)
            }
        })
    },
    addExpensesBlock: function() {

        let cloneExpensesItem = expensesItems[0].cloneNode(true)
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus)
        expensesItems = document.querySelectorAll('.expenses-items');
        inputs = document.querySelectorAll('input');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none'
        }
    },
    addIncomesBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true)
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus)
        incomeItems = document.querySelectorAll('.income-items');
        inputs = document.querySelectorAll('input');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none'
        }
    },
    getPeriod: function() {
        periodAmount.innerHTML = periodSelect.value;

    },
}

periodSelect.addEventListener('change', appData.getPeriod)
start.addEventListener('click', appData.start.bind(appData));
reset.addEventListener('click', appData.reset.bind(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock)
incomePlus.addEventListener('click', appData.addIncomesBlock)
const inputonlynumber = e => {
    const value = e.value
    e.value = value.replace(/\D/g, '')
}
const inputOnlyRussianText = e => {
    const value = e.value
    e.value = value.replace(/[^а-я А-Я , . ]/g, '')
}
if (appData.getTargetMonth() > 0) {
    console.log("Цель будет достигнута через ", appData.getTargetMonth(), " месяцев")
} else console.log("Цель не будет достигнута");