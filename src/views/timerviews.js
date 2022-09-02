import { TIMER_Id } from '../constants.js';
import { quizData } from '../data.js';
export const createTimerElement = () => {
  const timer = document.createElement('label');
  timer.id = TIMER_Id;

  const seconds = document.createElement('span');
  seconds.id = 'seconds';
  seconds.textContent = '00';
  timer.appendChild(seconds);

  const punctuationMark = document.createElement('span');
  punctuationMark.textContent = ':';
  timer.appendChild(punctuationMark);

  const minutes = document.createElement('span');
  minutes.id = 'minutes';
  minutes.textContent = '00';
  timer.appendChild(minutes);

  return timer;
};

export let timerIntervalId = 0;

export function resetTotalSeconds() {
  quizData.totalSeconds = 0;
}

function increaseTimer() {
  quizData.totalSeconds++;
  // I put the here because I want it to save every second if I put it with the other setItems will save the time  since I opened 
  window.sessionStorage.setItem(
    'totalSeconds',
    JSON.stringify(quizData.totalSeconds)
  );
  let minutes = document.getElementById('minutes');
  minutes.innerHTML = pad(quizData.totalSeconds % 60);
  let seconds = document.getElementById('seconds');
  seconds.innerHTML = pad(parseInt(quizData.totalSeconds / 60));
}

function pad(val) {
  let valString = val + '';
  if (valString.length < 2) {
    return '0' + valString;
  } else {
    return valString;
  }
}

export function setTime(start) {
  if (start) {
    timerIntervalId = setInterval(increaseTimer, 1000);
  }
}
