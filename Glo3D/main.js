document.addEventListener('DOMContentLoaded', () => {
    'use strict'
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds'),
        endPromo = new Date(2022, 1, 12, 17, 58);
    let now = new Date();

    let timeRemaining = endPromo.getTime() - now.getTime()

    function timeRemained() {
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
    setInterval(timeRemained, 1000)
})