'use strict';

import { ANSWERS_LIST_ID } from '../constants.js';
import { NEXT_QUESTION_BUTTON_ID } from '../constants.js';
import { SKIP_QUESTION_BUTTON_ID } from '../constants.js';
import { FINISH_QUIZ_BUTTON_ID } from '../constants.js';
import { HINT_QUIZ_BUTTON_ID } from '../constants.js';

/**
 * Create a full question element
 * @returns {Element}
 */
export const createQuestionElement = (questionText, quizData) => {
  const element = document.createElement('div');
  element.style.width = '60rem';
  element.style.height = '40rem';
  element.style.position = 'relative';
  const amount = quizData.questions.length;
  const currentQuestionNumber = `Question [ ${
    quizData.currentQuestionIndex + 1
  } / ${amount} ]`;
  const score = `Score &nbsp&nbsp [ ${quizData.rightAnswers} / ${amount} ]`;
  const wrongAnswer = `&nbspWrong &nbsp [ ${quizData.wrongAnswers} / ${amount} ]`;
  const skipped = `Skipped [ ${quizData.skippedQuestions} / ${amount} ]`;

  // I use String.raw just to get fancy colors for the HTML in VS Code.
  element.innerHTML += String.raw`
      <br>
      <p>${currentQuestionNumber}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp ${score}</p>
      <hr>
      <p>${wrongAnswer}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp ${skipped}</p>
      <hr>
      <h1>${questionText}</h1>
      <ul id="${ANSWERS_LIST_ID}"></ul>
      <hr>
      <button id="${NEXT_QUESTION_BUTTON_ID}">Next question</button>
      <button id="${SKIP_QUESTION_BUTTON_ID}">Skip question</button>
      <button id="${FINISH_QUIZ_BUTTON_ID}">Finish</button>
      <button id="${HINT_QUIZ_BUTTON_ID}">Hint</button>`;
  return element;
};
