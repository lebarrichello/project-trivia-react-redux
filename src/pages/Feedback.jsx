import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Feedback.css';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const rightAnswers = 3;
    return (
      <div>

        <Header />
        <div className="container">
          <div className="containerFeedB">
            <h3
              data-testid="feedback-text"
            >
              {assertions >= rightAnswers ? 'Well Done!' : 'Could be better...'}
            </h3>
            <div className="feedback">
              <p className="hits">Acertos:</p>
              <p
                data-testid="feedback-total-question"
              >
                {assertions}
              </p>
              <p className="point">Pontuação:</p>
              <p
                data-testid="feedback-total-score"
              >
                {score}
              </p>
            </div>
            <Link to="/">

              <button
                data-testid="btn-play-again"
              >
                Play Again
              </button>
            </Link>
            <Link to="/ranking">
              <button
                data-testid="btn-ranking"
              >
                Ranking
              </button>
            </Link>
          </div>
        </div>
      </div>

    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

function mapStateToProps(globalState) {
  return ({
    assertions: globalState.player.assertions,
    score: globalState.player.score,
  });
}

export default connect(mapStateToProps)(Feedback);
