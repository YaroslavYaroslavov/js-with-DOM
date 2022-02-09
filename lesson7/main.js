'use strict';
const
    start = document.getElementById('start'),
    reset = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
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
    inputsResult = document.querySelectorAll('.result-total'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

let
    incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    inputs = document.querySelectorAll('input');
class AppData {
    constructor() {
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
        this.incomeMonth = 0;
        this.expensesMonth = 0;
        this.expensesArrCount = [];
        this.precentDeposit = 0;
        this.moneyDeposit = 0;
    }
    start() {
        if (salaryAmount.value) {
            if (this.deposit) {
                if (!isNaN(depositPercent.value) && depositPercent.value > 0 && depositPercent.value <= 100 && depositAmount.value != 0) {
                    inputs = document.querySelectorAll('input');
                    this.budget = +salaryAmount.value;
                    console.log(!isNaN(depositPercent.value))
                    this.getInfoDeposit();
                    this.getExpInc();
                    this.getExpensesMonth();
                    this.getIncomeMonth();
                    this.getAddExpenses();
                    this.getAddIncome();
                    this.getBudget();
                    this.showResult();
                    this.blockInput();
                } else { alert('Ошибка ввода депозита') }
            } else {
                inputs = document.querySelectorAll('input');
                this.budget = +salaryAmount.value;
                console.log(!isNaN(depositPercent.value))
                this.getInfoDeposit();
                this.getExpInc();
                this.getExpensesMonth();
                this.getIncomeMonth();
                this.getAddExpenses();
                this.getAddIncome();
                this.getBudget();
                this.showResult();
                this.blockInput();
            }
        } else { alert('Ошибка ввода бюджета') }
    }
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
    }
    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.precentDeposit / 100)
        this.budgetMonth = this.budget - this.expensesMonth + this.incomeMonth + monthDeposit;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    }
    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }
    getInfoDeposit() {
        if (this.deposit) {
            this.precentDeposit = +depositPercent.value;
            this.moneyDeposit = +depositAmount.value
        }
    }
    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }
    getIncomeMonth() {
        for (let key in this.income) {
            this.incomeMonth += +this.income[key]
        }
    }

    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    }
    blockInput() {
        inputs.forEach(item => item.disabled = true);
        reset.style.display = 'inline';
        start.style.display = 'none';
        expensesPlus.style.display = 'none';
        incomePlus.style.display = 'none';
    }
    unblockInput() {
        inputs.forEach(item => item.disabled = false);
        inputsResult.forEach(item => item.disabled = true);
        reset.style.display = 'none';
        start.style.display = 'inline';
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        } else {
            expensesPlus.style.display = 'inline';
        }
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        } else {
            incomePlus.style.display = 'inline';
        }
    }
    clear() {
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
        periodSelect.value = '1';
        periodAmount.innerHTML = '1';
    }
    reset() {
        this.unblockInput();
        this.clear();
    }
    getAddExpenses() {
        const _this = this;
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
    }
    getAddIncome() {
        const _this = this;
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    }
    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    }
    addIncomesBlock() {

        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }
    getExpInc() {
        const _this = this;
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                _this[startStr][itemTitle] = itemAmount;
            }
        };
        incomeItems.forEach(count);
        expensesItems.forEach(count);
    }

    getPeriod() {
        periodAmount.innerHTML = periodSelect.value;

    }
    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block'
            depositPercent.value = ''
        } else {
            depositPercent.style.display = 'none'
            depositPercent.value = valueSelect
        }
    }

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block'
            depositAmount.style.display = 'inline-block'
            this.deposit = true
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none'
            depositAmount.style.display = 'none'
            depositBank.value = ''
            depositAmount.value = ''
            this.deposit = false
            depositBank.removeEventListener('change', this.changePercent);
        }
    }
    Listeners() {
        periodSelect.addEventListener('mousemove', this.getPeriod);
        start.addEventListener('click', this.start.bind(this));
        reset.addEventListener('click', this.reset.bind(this));
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomesBlock);
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
    }
}
const appData = new AppData()
appData.Listeners()


console.log(AppData)


const inputOnlyNumber = e => {
    const value = e.value
    e.value = value.replace(/\D/g, '')
}
const inputOnlyRussianText = e => {
    const value = e.value
    e.value = value.replace(/[^а-я А-Я , . ]/g, '')
}