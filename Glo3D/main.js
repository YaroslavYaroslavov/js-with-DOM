document.addEventListener('DOMContentLoaded', () => {
    'use strict'


    function promoTimer() {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds'),
            endPromo = new Date(2022, 1, 14);
        let now = new Date();

        let timeRemaining = endPromo.getTime() - now.getTime()
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
            handlerMenu = () => {
                menu.classList.toggle('active-menu')
            };
        btnMenu.addEventListener('click', handlerMenu)
        menu.addEventListener('click', (event) => {
            let target = event.target;
            console.log(target.tagName)
            if (target.tagName !== 'MENU' && target.tagName !== 'LI') {
                console.log(target)
                handlerMenu()
            }
        })
    }
    toggleMenu();

    function togglePopUp() {

        const popUp = document.querySelector('.popup'),
            popUpBtn = document.querySelectorAll('.popup-btn');

        popUpBtn.forEach((item) => {
            item.addEventListener('click', () => {
                popUp.style.display = 'block';
            })
        })

        popUp.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popUp.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popUp.style.display = 'none';
                }
            }
        })

    };
    togglePopUp();

    function tabs() {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        }

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab')
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i)
                    }
                })

            }

        })
    }
    tabs();
})