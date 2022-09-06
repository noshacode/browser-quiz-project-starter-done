'use strict';

import { USER_INTERFACE_ID, START_QUIZ_BUTTON_ID } from '../constants.js';
import { createWelcomeElement } from '../views/welcomeView.js';
import { initQuestionPage } from './questionPage.js';
import { setTime, resetTotalSeconds } from '../views/timerviews.js';
import { quizData } from '../data.js';
import { time } from '../app.js';

export const initWelcomePage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';
  //clear the div

  const welcomeElement = createWelcomeElement();
  userInterface.appendChild(welcomeElement);

  document
    .getElementById(START_QUIZ_BUTTON_ID)
    .addEventListener('click', startQuiz);
};

const startQuiz = () => {
  quizData.currentQuestionIndex = 0;
  // for (let i = 0; i < quizData.questions.length; i++) {
  //     quizData.questions[i].selected = null;
  // }

  quizData.rightAnswers = 0;
  quizData.wrongAnswers = 0;
  quizData.skippedQuestions = 0;
  initQuestionPage();
  time.hidden = false;
  resetTotalSeconds();
  setTime(true);
};
