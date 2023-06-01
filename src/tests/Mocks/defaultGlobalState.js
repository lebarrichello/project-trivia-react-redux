const defaultGlobalState = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  game: {
      questions: [],
      currentIndex: 0,
      countdown: 30,
      idCounter: 0,
      timeout: false,
      wasAnswered: false,
  }
}


export default defaultGlobalState;