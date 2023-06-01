const INITIAL_STATE = {
  questions: [],
  currentIndex: 0,
  countdown: 30,
  idCounter: 0,
  timeout: false,
  wasAnswered: false,
};

function game(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case 'RESET_GAME':
    return {
      ...state,
      questions: [],
      currentIndex: 0,
      timeout: false,
      wasAnswered: false,
    };
  case 'FETCH_QUESTIONS':
    return {
      ...state,
      questions: payload.questions,
    };
  case 'START_COUNTDOWN':
    return {
      ...state,
      idCounter: payload.idCounter,
      countdown: 30,
      timeout: false,
    };

  case 'STOP_COUNTDOWN':
    clearInterval(payload.idCounter);
    return {
      ...state,
      idCounter: 0,
      timeout: state.countdown <= 0,
    };
  case 'DECREASE_ONE_SECOND':
    return {
      ...state,
      countdown: state.countdown - 1,
    };
  case 'WAS_ANSWERED':
    return {
      ...state,
      wasAnswered: true,
    };
  case 'NEXT_QUESTION':
    return {
      ...state,
      currentIndex: state.currentIndex + 1,
      timeout: false,
      countdown: 30,
      wasAnswered: false,
    };
  default:
    return state;
  }
}

export default game;
