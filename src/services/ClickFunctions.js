import { actionNextQuestion } from '../redux/actions/actionNextQuestion';
import { actionPlay } from '../redux/actions/actionPlay';
import { actionWasAnswered } from '../redux/actions/actionWasAnswered';
import { scorPlay } from '../redux/actions/salvarScore';
import { getGravatar } from './conversionFunctions';
import { redirectToFeedback, redirectToGame } from './redirectFunctions';
import { startCountdown, stopCountdown } from './timerFunctions';

export async function onClickPlayButton() {
  try {
    const URL = 'https://opentdb.com/api_token.php?command=request';
    const request = await fetch(URL);
    const { token } = await request.json();
    localStorage.setItem('token', token);
    const { inputName, inputEmail } = this.state;
    const { dispatch } = this.props;
    dispatch(actionPlay(inputName, inputEmail));
    redirectToGame(this);
  } catch (error) {
    console.log(error);
  }
}

export function calcScore(component) {
  const { dificuldade, currentIndex, countdown, dispatch } = component.props;
  const { difficulty } = dificuldade[currentIndex];
  let multiplier = 1;
  const hardMultiplier = 3;
  const mediumMultiplier = 2;
  const basePoints = 10;

  if (difficulty === 'hard') multiplier = hardMultiplier;
  if (difficulty === 'medium') multiplier = mediumMultiplier;

  const score = basePoints + (countdown * multiplier);
  dispatch(scorPlay(score));
}

export function clickNextQuestionButton(component) {
  const { dispatch, currentIndex } = component.props;
  const numberQuestions = 5;
  if (currentIndex < numberQuestions - 1) {
    dispatch(actionNextQuestion());
    startCountdown(component);
  } else {
    const { name, score, gravatarEmail } = component.props;
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    const newRanking = [...ranking, {
      name,
      score,
      picture: getGravatar(gravatarEmail),
    }];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
    redirectToFeedback(component);
  }
}

export function onClickAnswerButton({ target: { name } }) {
  const { dispatch } = this.props;
  stopCountdown(this);
  dispatch(actionWasAnswered());
  if (name === 'trueAnswer') {
    calcScore(this);
  }
}
