import { actionFetchQuestions } from '../redux/actions/actionFetchQuestions';
import { redirectToLogin } from './redirectFunctions';

export function fetchQuestions(component) {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    const respondeCode = 0;
    const endPoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const result = await fetch(endPoint);
    const data = await result.json();

    if (data.response_code !== respondeCode) {
      redirectToLogin(component);
    } else {
      dispatch(actionFetchQuestions(data.results));
    }
  };
}
