'use strict';
import { quizData } from './data.js';

import { initWelcomePage } from './pages/welcomePage.js';
import { createTimerElement } from './views/timerViews.js';

import { initQuestionPage } from './pages/questionPage.js';

import { setTime } from './views/timerViews.js';

const body = document.body;
export const time = createTimerElement();
time.style.position = 'absolute';
time.style.top = '6%';
time.style.left = '49.3%';
time.hidden = true;
body.appendChild(time);

const loadApp = () => {
  let session = window.sessionStorage.getItem('currentQuestionIndex');

  quizData.currentQuestionIndex = JSON.parse(session) || 0;

  if (session) {
    initQuestionPage();
    setTime(true);

    console.log('session true', session);
  } else {
    initWelcomePage();
    console.log('session false', session);
  }
  // window.sessionStorage.getItem('skippedQuestions');
  // quizData.skippedQuestions = JSON.parse(
  //   window.sessionStorage.getItem('skippedQuestions')
  // );

  // console.log(quizData.skippedQuestions);
  // window.sessionStorage.getItem('wrongAnswers');

  // window.sessionStorage.getItem('resultWrong');

  // window.sessionStorage.getItem('rightAnswers');

  // window.sessionStorage.getItem('resultRight');
};

window.addEventListener('load', loadApp);
