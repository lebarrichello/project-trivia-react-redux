import { actionResetGame } from '../redux/actions/actionResetGame';
import { fetchQuestions } from './FetchFunctions';
import { redirectToLogin } from './redirectFunctions';

export async function updateQuestions(component) {
  const token = localStorage.getItem('token');
  if (!token) {
    redirectToLogin(component);
  } else {
    const { dispatch } = component.props;
    dispatch(actionResetGame());
    dispatch(fetchQuestions(component));
  }
}

export function updateRanking() {
  const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
  const ordenedRanking = ranking.sort((a, b) => b.score - a.score);
  return ordenedRanking;
}
