const
    btn = document.querySelector('#btn_1'),
    score = document.querySelector('#score'),
    btnAddCount = document.querySelector('#btn_2'),
    btnAddAutoClicker = document.querySelector('#btn_3'),
    addClickCounter = document.querySelector('#addClickCounter'),
    addAutoClickerCounter = document.querySelector('#addAutoClickCounter');

if (!localStorage.getItem('value')) {
    localStorage.setItem('value', +score.textContent)
} else {
    score.innerHTML = localStorage.getItem('value')
}
if (!localStorage.getItem('addClick')) {
    localStorage.setItem('addClick', 1)
} else {
    addClickCounter.innerHTML = localStorage.getItem('addClick')
}
if (!localStorage.getItem('autoClickValue')) {
    localStorage.setItem('autoClickValue', 0)
} else {
    addAutoClickerCounter.innerHTML = localStorage.getItem('autoClickValue')
}
let value = +localStorage.getItem('value')
let i = 1;
let addClick = +localStorage.getItem('addClick');
let autoClickValue = +localStorage.getItem('autoClickValue');
let imgs = new Array('1.jpg', '2.jpg', '3.jpg');

function click() {
    value += addClick
    score.innerHTML = value
    if (i == imgs.length) {
        i = "0";
    }
    btn.src = imgs[i];
    i++
    localStorage.setItem('value', value)

}

function addAutoClicker() {
    if (value >= 10) {
        value -= 10
        autoClickValue++;
        score.innerHTML = value
        addAutoClickerCounter.innerHTML = autoClickValue
        localStorage.setItem('autoClickValue', autoClickValue)

    } else {
        alert('ты че ахуел пес')
    }
}

function addScoreClick() {
    if (value >= 10) {
        localStorage.setItem('addClick', addClick)
        value -= 10
        addClick++
        score.innerHTML = value
        addClickCounter.innerHTML = addClick
        localStorage.setItem('addClick', addClick)

    } else {
        alert('ты че ахуел пес')
    }
}

function autoAdd() {
    value += autoClickValue;
    score.innerHTML = value
    localStorage.setItem('value', value)
}
btn.addEventListener('mousedown', click)
btnAddCount.addEventListener('click', addScoreClick)
btnAddAutoClicker.addEventListener('click', addAutoClicker)
setInterval(autoAdd, 1000);