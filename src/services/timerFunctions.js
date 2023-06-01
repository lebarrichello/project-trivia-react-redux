import { actionDecreaseOneSecond } from '../redux/actions/actionDecreaseOneSecond';
import { actionStartCoutdown } from '../redux/actions/actionStartCoutdown';
import { actionStopCoutdown } from '../redux/actions/actionStopCoutdown';

function countdown(dispatch) {
  return dispatch(actionDecreaseOneSecond());
}

export function startCountdown(component) {
  const millisToSecond = 1000;
  const { dispatch } = component.props;
  const idCount = setInterval(() => countdown(dispatch), millisToSecond);
  dispatch(actionStartCoutdown(idCount));
}

export function stopCountdown(component) {
  const { dispatch, idCounter } = component.props;
  dispatch(actionStopCoutdown(idCounter));
}
