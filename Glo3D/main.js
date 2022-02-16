document.addEventListener('DOMContentLoaded', () => {
    'use strict'


    function promoTimer() {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds'),
            endPromo = new Date(2022, 1, 19);
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
    const addDots = () => {
        const dotsContainer = document.querySelector('.portfolio-dots'),
            slide = document.querySelectorAll('.portfolio-item');
        for (let i = 0; i < slide.length; i++) {
            dotsContainer.innerHTML += '<li class="dot"></li>'
        }
        const dot = document.querySelectorAll('.dot');
        dot[0].classList.add('dot-active')
    };
    addDots();
    const slider = () => {

        const slide = document.querySelectorAll('.portfolio-item'),
            dot = document.querySelectorAll('.dot'),
            slider = document.querySelector('.portfolio-content');
        let currentSlide = 0,
            interval;
        const prevSlide = (elem, index, strClass) => {
                elem[index].classList.remove(strClass);
            },
            nextSlide = (elem, index, strClass) => {
                elem[index].classList.add(strClass);
            };

        const autoPlaySlide = () => {

                prevSlide(slide, currentSlide, 'portfolio-item-active')
                prevSlide(dot, currentSlide, 'dot-active')
                currentSlide++;
                if (currentSlide >= slide.length) {
                    currentSlide = 0;
                }
                nextSlide(slide, currentSlide, 'portfolio-item-active')
                nextSlide(dot, currentSlide, 'dot-active')
            },
            startSlide = (time = 3000) => {
                interval = setInterval(autoPlaySlide, time);
            },
            stopSlide = () => {
                clearInterval(interval)
            }
        slider.addEventListener('click', (event) => {
            event.preventDefault()

            let target = event.target;
            if (!target.matches('.portfolio-btn, .dot')) {
                return
            }
            prevSlide(slide, currentSlide, 'portfolio-item-active')
            prevSlide(dot, currentSlide, 'dot-active')
            if (target.matches('#arrow-right')) {
                currentSlide++
            } else if (target.matches('#arrow-left')) {
                currentSlide--
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index
                    }
                })
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active')
            nextSlide(dot, currentSlide, 'dot-active')
        })
        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        })
        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }

        })
        startSlide(10000)
    }
    slider();
    const changePhoto = () => {
        const command = document.getElementById('command');
        let attributeValue;

        command.addEventListener('mouseover', (event) => {
            const target = event.target;
            if (!target.matches('.command__photo')) return;
            else {
                attributeValue = target.getAttribute('src');
                target.setAttribute('src', target.getAttribute('data-img'));
            }
        });
        command.addEventListener('mouseout', (event) => {
            const target = event.target;
            if (!target.matches('.command__photo')) return;
            else {
                target.setAttribute('src', attributeValue);
            }
        });
    };
    changePhoto()

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');
        let anim;

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1,
                totalTmp = -1;

            if (anim) {
                clearInterval(anim)
            }

            total = 0
            totalTmp = -1
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;
            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }
            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }
            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            function stopAnimate() {
                if (totalTmp === total || total === 0) {
                    clearInterval(anim)
                }
            }

            function animate() {
                totalTmp++
                totalValue.textContent = totalTmp
                if (totalTmp === total || total === 0) {
                    clearInterval(anim)
                }
            }
            anim = setInterval(animate, 10)
        };

        calcBlock.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                countSum()
            }
        });
        calcBlock.addEventListener('input', (event) => {
            const target = event.target;
            if (!target.matches('.calc-count, .calc-square, .calc-count, .calc-day')) return;
            else {
                target.value = target.value.replace(/\D/g, '');
            }
        })

    };
    calc()
})