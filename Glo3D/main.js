document.addEventListener('DOMContentLoaded', () => {
    'use strict'
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds'),
        endPromo = new Date(2022, 1, 12, 17, 58);
    let now = new Date();

    let timeRemaining = endPromo.getTime() - now.getTime()

    function promoTimer() {
        now = new Date();
        if (timeRemaining > 0) {
            let seconds = (Math.floor(timeRemaining / 1000) % 60)
            let minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
            let hours = Math.floor((timeRemaining / (1000 * 60 * 60)))
            timeRemaining -= 1000;
            if (seconds < 10) {
                timerSeconds.textContent = '0' + seconds
            } else {
                timerSeconds.textContent = seconds
            }
            if (minutes < 10) {
                timerMinutes.textContent = '0' + minutes
            } else {
                timerMinutes.textContent = minutes
            }
            if (hours < 10) {
                timerHours.textContent = '0' + hours
            } else {
                timerHours.textContent = hours
            }

        }
        if (timeRemaining <= 0) {
            timeRemaining = 86400000;
        }
    }
    setInterval(promoTimer, 1000)

    function toggleMenu() {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            btnCloseMenu = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li'),
            handlerMenu = () => {
                menu.classList.toggle('active-menu')
            };
        btnMenu.addEventListener('click', handlerMenu)
        btnCloseMenu.addEventListener('click', handlerMenu)
        menuItems.forEach((item) => {
            item.addEventListener('click', handlerMenu)
        })

    }
    toggleMenu();

    function togglePopUp() {
        let i = 0.1;
        const popUp = document.querySelector('.popup'),
            popUpBtn = document.querySelectorAll('.popup-btn'),
            popUpCloseBtn = document.querySelector('.popup-close');

        popUpBtn.forEach((item) => {
            item.addEventListener('click', () => {
                popUp.style.display = 'block';
            })
        })
        popUpCloseBtn.addEventListener('click', () => {
            popUp.style.display = 'none';
        })

    };
    togglePopUp();
})