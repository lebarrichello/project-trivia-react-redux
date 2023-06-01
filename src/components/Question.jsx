import he from 'he';
import PropTypes from 'prop-types';
import { Component } from 'react';
import '../styles/Question.css';
import { connect } from 'react-redux';
import { startCountdown, stopCountdown } from '../services/timerFunctions';
import { shuffleAnswers } from '../services/shuffleArray';
import { onClickAnswerButton } from '../services/ClickFunctions';

class Question extends Component {
  state = {
    shuffledAnswers: [],
  };

  onClickAnswerButton = onClickAnswerButton.bind(this);

  componentDidMount() {
    startCountdown(this);
    shuffleAnswers(this);
  }

  componentDidUpdate(prevProps) {
    const { question } = this.props;
    if (prevProps.question !== question) {
      shuffleAnswers(this);
    }
  }

  componentWillUnmount() {
    stopCountdown(this);
  }

  render() {
    const { countdown, idCounter, question,
      timeout, wasAnswered, currentIndex } = this.props;
    const { shuffledAnswers } = this.state;
    console.log(countdown, idCounter, timeout);
    if (countdown <= 0) {
      stopCountdown(this);
    }

    const classNameOfButton = (correct) => {
      if (wasAnswered || timeout) {
        return (correct
          ? 'correct' : 'wrong');
      }
      return undefined;
    };

    return (
      <div className="container">
        <div className="containerGame">
          <div className="containerInfoQuest">
            <div>
              <p className="countdown">{countdown}</p>
            </div>
            <div>
              <p className="numberQuestion">
                N.º/

                {currentIndex}

              </p>
            </div>
          </div>
          <div className="containerQuestions">
            <span
              className="qCategory"
              data-testid="question-category"
            >
              {question.category}
            </span>
            <span
              className="qText"
              data-testid="question-text"
            >
              {he.decode(question.question)}
            </span>
          </div>

          <div data-testid="answer-options" className="answerOptions">
            {shuffledAnswers && shuffledAnswers.map(({ answer, correct }, index) => (
              <button
                key={ index }
                type="button"
                name={ correct ? 'trueAnswer' : 'falseAnswer' }
                disabled={ wasAnswered || timeout }
                onClick={ (event) => this.onClickAnswerButton(event) }
                className={ classNameOfButton(correct) }
                data-testid={ correct ? 'correct-answer'
                  : `wrong-answer-${index}` }
              >
                {he.decode(answer)}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(globalState) {
  return ({
    countdown: globalState.game.countdown,
    idCounter: globalState.game.idCounter,
    timeout: globalState.game.timeout,
    currentIndex: globalState.game.currentIndex,
    wasAnswered: globalState.game.wasAnswered,
    dificuldade: globalState.game.questions,
  });
}

Question.propTypes = {
  countdown: PropTypes.number.isRequired,
  idCounter: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  question: PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string,
  }).isRequired,
  timeout: PropTypes.bool.isRequired,
  wasAnswered: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Question);
