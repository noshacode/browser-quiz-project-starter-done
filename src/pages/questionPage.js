'use strict';

import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  HINT_QUIZ_BUTTON_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import { SKIP_QUESTION_BUTTON_ID } from '../constants.js';
import { FINISH_QUIZ_BUTTON_ID } from '../constants.js';
import { timerIntervalId } from '../views/timerviews.js';
import { initFinishPage } from './finishPage.js';
import { createHintElement } from '../views/hintElement.js';

export const initQuestionPage = () => {
  // lets get the user-interface
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  // lets empty it
  userInterface.innerHTML = '';

  // this is like quizData.questions but shuffled
  const questionsArray = JSON.parse(
    window.sessionStorage.getItem('questionsArray')
  );

  //questionsArray is an array of object
  // to get only the currentQuestion, we use quizData.currentQuestionIndex
  const currentQuestion = questionsArray[quizData.currentQuestionIndex];

  // create question and append (this includes header, questionText, and buttons. )
  // Also includes empty ul for answers
  const questionElement = createQuestionElement(currentQuestion.text, quizData);
  userInterface.appendChild(questionElement);

  // now we get the answers elements ul
  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  // loop over answers
  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    //create answer li element
    const answerElement = createAnswerElement(key, answerText);
    // append the li to ul
    answersListElement.appendChild(answerElement);

    const correctAnswer = currentQuestion.correct;
    if (correctAnswer === key) {
      answerElement.id = 'right-answer';
    } else {
      answerElement.className = 'wrong-answer';
    }
    console.log(answerElement)
  }
  console.log(quizData);

  const right = document.getElementById('right-answer');
  right.addEventListener('click', () => {
    if (currentQuestion.selected === null) {
      console.log('questionsArray', questionsArray);
      currentQuestion.selected = right;
      right.style.background = 'green';
      quizData.rightAnswers++;

      // only on last question
      if (quizData.currentQuestionIndex === (quizData.questions.length - 1)) {
        skipQuestion.hidden = true;
        hint.hidden = true;
        finish.style.left = '44.8%';
      }
    }
  });

  const wrong = document.getElementsByClassName('wrong-answer');
  for (let i = 0; i < wrong.length; i++) {
    wrong[i].addEventListener('click', () => {
      if (currentQuestion.selected === null) {
        currentQuestion.selected = wrong[i];
        wrong[i].style.background = 'red';
        setTimeout(() => {
          right.style.background = 'green';
        }, 500);
        quizData.wrongAnswers++;
        if (quizData.currentQuestionIndex === quizData.questions.length - 1) {
          skipQuestion.hidden = true;
          hint.hidden = true;
          finish.style.left = '44.8%';
        }
      }
    });
  }

  //logic for next button
  const toNextQuestion = document.getElementById(NEXT_QUESTION_BUTTON_ID);
  toNextQuestion.addEventListener('click', () => {
    if (currentQuestion.selected) {
      nextQuestion();
    } else {
      setTimeout(() => {
        nextQuestion();
      }, 1000);
      right.style.background = 'green';
      quizData.skippedQuestions++;
    }
  });

  //logic for hint
  const hintDiv = createHintElement(  //pass
    currentQuestion.explanation,
    currentQuestion.links[0].text,
    currentQuestion.links[0].href
  );
  hintDiv.hidden = true;
  userInterface.appendChild(hintDiv);

  const hint = document.getElementById(HINT_QUIZ_BUTTON_ID);
  hint.addEventListener('click', () => {
    hintDiv.hidden = false;
  });
  document.getElementById('close-element').addEventListener('click', () => {
    hintDiv.hidden = true;
  });

  const skipQuestion = document.getElementById(SKIP_QUESTION_BUTTON_ID);
  skipQuestion.addEventListener('click', () => {
    if (currentQuestion.selected === null) {
      if (quizData.currentQuestionIndex < quizData.questions.length - 1) {
        currentQuestion.selected = setTimeout(() => {
          nextQuestion();
        }, 1000);
        right.style.background = 'green';
        quizData.skippedQuestions++;
      } else {
        currentQuestion.selected = setTimeout(() => {
          initFinishPage();
        }, 1000);
        clearInterval(timerIntervalId);
        right.style.background = 'green';
        quizData.skippedQuestions++;
      }
    }
  });

  const finish = document.getElementById(FINISH_QUIZ_BUTTON_ID);
  if (quizData.currentQuestionIndex < quizData.questions.length - 1) {
    finish.style.left = '87%';
  } else {
    toNextQuestion.hidden = true;
    finish.style.left = '26.7%';
  }

  finish.addEventListener('click', () => {
    if (currentQuestion.selected) {
      initFinishPage();
      clearInterval(timerIntervalId);
    } else {
      setTimeout(() => {
        initFinishPage();
      }, 1000);
      clearInterval(timerIntervalId);
      right.style.background = 'green';
      quizData.skippedQuestions++;
    }
  });

  window.sessionStorage.setItem(
    'currentQuestionIndex',
    JSON.stringify(quizData.currentQuestionIndex)
  );
  // window.sessionStorage.setItem(
  //   'selected',
  //   JSON.stringify(quizData.questions[0].selected)
  // );
  window.sessionStorage.setItem(
    'skippedQuestions',
    JSON.stringify(quizData.skippedQuestions)
  );
  window.sessionStorage.setItem(
    'wrongAnswers',
    JSON.stringify(quizData.wrongAnswers)
  );

  window.sessionStorage.setItem(
    'rightAnswers',
    JSON.stringify(quizData.rightAnswers)
  );
};

const nextQuestion = () => {
  quizData.currentQuestionIndex++;

  initQuestionPage();
};
