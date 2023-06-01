export const actionFetchQuestions = (questions) => ({
  type: 'FETCH_QUESTIONS',
  payload: {
    questions,
  },
});
