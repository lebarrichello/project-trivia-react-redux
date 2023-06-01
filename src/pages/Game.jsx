import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import Question from '../components/Question';
import Header from '../components/Header';
import { updateQuestions } from '../services/DidMountFunctions';
import { clickNextQuestionButton } from '../services/ClickFunctions';
import '../styles/Game.css';

class Game extends Component {
  componentDidMount() {
    updateQuestions(this);
  }

  render() {
    const { questions, currentIndex, timeout, wasAnswered } = this.props;
    return (
      <>
        <Header />
        <main>

          {questions.length > 0 && (
            <Question question={ questions[currentIndex] } />
          )}
          {(wasAnswered || timeout) && (
            <div className="containerBtnNext">
              <button
                className="btnNext"
                type="button"
                data-testid="btn-next"
                onClick={ () => clickNextQuestionButton(this) }
              >
                Next
              </button>
            </div>
          )}

        </main>
      </>
    );
  }
}

Game.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string,
  })).isRequired,
  timeout: PropTypes.bool.isRequired,
  wasAnswered: PropTypes.bool.isRequired,
};

function mapStateToProps(globalState) {
  return ({
    questions: globalState.game.questions,
    currentIndex: globalState.game.currentIndex,
    timeout: globalState.game.timeout,
    wasAnswered: globalState.game.wasAnswered,
    name: globalState.player.name,
    score: globalState.player.score,
    gravatarEmail: globalState.player.gravatarEmail,
  });
}

export default connect(mapStateToProps)(Game);
