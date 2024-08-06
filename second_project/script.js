// script.js
let startTime, updatedTime, difference, tInterval, running = false;
let minutes = 0, seconds = 0, milliseconds = 0;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const laps = document.getElementById('laps');

function startTimer() {
    if (!running) {
        running = true;
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        startStopButton.textContent = 'Stop';
    } else {
        running = false;
        clearInterval(tInterval);
        startStopButton.textContent = 'Start';
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    milliseconds = Math.floor((difference % 1000) / 10);
    seconds = Math.floor((difference / 1000) % 60);
    minutes = Math.floor((difference / (1000 * 60)) % 60);

    display.innerHTML = 
        (minutes < 10 ? '0' + minutes : minutes) + ':' + 
        (seconds < 10 ? '0' + seconds : seconds) + ':' + 
        (milliseconds < 10 ? '0' + milliseconds : milliseconds);
}

function lapTimer() {
    if (running) {
        const lapTime = display.innerHTML;
        laps.innerHTML += `<div>Lap ${lapCounter++}: ${lapTime}</div>`;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    display.innerHTML = '00:00:00';
    laps.innerHTML = '';
    startStopButton.textContent = 'Start';
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
}

startStopButton.addEventListener('click', startTimer);
lapButton.addEventListener('click', lapTimer);
resetButton.addEventListener('click', resetTimer);
