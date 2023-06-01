export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function shuffleAnswers(component) {
  const { question } = component.props;
  const correctAnswer = {
    answer: question.correct_answer,
    correct: true,
  };

  const incorrectAnswers = question.incorrect_answers.map((answer) => {
    const newAnswer = {
      answer,
      correct: false,
    };
    return newAnswer;
  });
  const shuffledAnswers = shuffleArray([...incorrectAnswers, correctAnswer]);
  component.setState({
    shuffledAnswers,
  });
}
