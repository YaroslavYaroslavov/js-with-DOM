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
const AppData = function() {
    this.budget = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.expensesArr = [];
    this.deposit = false;
    this.mission = 50000;
    this.period = 3;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.expensesArrCount = [];
    this.precentDeposit = 0;
    this.moneyDeposit = 0;
}
const appData = new AppData()

AppData.prototype.start = function() {
    if (salaryAmount.value) {
        inputs = document.querySelectorAll('input');
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
        this.blockInput();

        return;
    } else {
        alert('Ошибка ввода.')
    }


};
AppData.prototype.showResult = function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
};
AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget - this.expensesMonth
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
};
AppData.prototype.getInfoDeposit = function() {
    if (this.deposit) {
        do { this.precentDeposit = prompt('Какой годовой процент?') }
        while (!isNumber(this.precentDeposit))
        do { this.moneyDeposit = prompt('Какая сумма заложена?') }
        while (!isNumber(this.moneyDeposit))
    }
};
AppData.prototype.getExpensesMonth = function() {
    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key]
    }
};
AppData.prototype.getExpenses = function() {
    const _this = this
    expensesItems.forEach(function(item) {
        const itemExpenses = item.querySelector('.expenses-title').value;
        const cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;

        }
    });
};
AppData.prototype.calcSavedMoney = function() {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.blockInput = function() {
    inputs.forEach(item => item.disabled = true)
    reset.style.display = 'inline'
    start.style.display = 'none'
    expensesPlus.style.display = 'none'
    incomePlus.style.display = 'none'
};
AppData.prototype.unblockInput = function() {
    inputs.forEach(item => item.disabled = false)
    inputsResult.forEach(item => item.disabled = true)
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
};
AppData.prototype.clear = function() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
    periodSelect.value = '1';
    periodAmount.innerHTML = '1';
};
AppData.prototype.reset = function() {
    this.unblockInput();
    this.clear();
};

AppData.prototype.getAddExpenses = function() {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    })
};
AppData.prototype.getAddIncome = function() {
    const _this = this;
    additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue)
            console.log(_this.addIncome)
        }
    })
};
AppData.prototype.addExpensesBlock = function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true)
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus)
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none'
    }
};
AppData.prototype.addIncomesBlock = function() {

    let cloneIncomeItem = incomeItems[0].cloneNode(true)
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus)
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        incomePlus.style.display = 'none'
    }
};
AppData.prototype.getPeriod = function() {
    periodAmount.innerHTML = periodSelect.value;

}
AppData.prototype.Listeners = function() {
    periodSelect.addEventListener('change', appData.getPeriod)
    start.addEventListener('click', appData.start.bind(appData));
    reset.addEventListener('click', appData.reset.bind(appData));
    expensesPlus.addEventListener('click', appData.addExpensesBlock)
    incomePlus.addEventListener('click', appData.addIncomesBlock)

}
console.log(AppData)
const listeners = new AppData.prototype.Listeners()
listeners()
const inputOnlyNumber = e => {
    const value = e.value
    e.value = value.replace(/\D/g, '')
}
const inputOnlyRussianText = e => {
    const value = e.value
    e.value = value.replace(/[^а-я А-Я , . ]/g, '')
}