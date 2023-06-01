import { SCORE } from '../actions/type';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case 'PLAY':
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.email,
    };
  case SCORE:
    return {
      ...state,
      score: state.score + payload.score,
      assertions: state.assertions + 1,
    };
  case 'RESET_GAME':
    return {
      ...state,
      assertions: 0,
      score: 0,
    };
  default:
    return state;
  }
};

export default player;
