import { Component } from 'react';
import { redirectToLogin } from '../services/redirectFunctions';
import { updateRanking } from '../services/DidMountFunctions';
import Podium from '../components/Podium';
import '../styles/Ranking.scss';

class Ranking extends Component {
  componentDidMount() {
    updateRanking(this);
  }

  render() {
    return (

      <div className="containerPR">
        <div className="podio">
          <div>

            <h1
              data-testid="ranking-title"
            >
              Ranking
            </h1>
          </div>
          <Podium />
        </div>
        <div className="containerLeaderBoard">
          <p className="title">leaderboard</p>

          {updateRanking().map(({ name, score, picture }, index) => (
            <div className="infosPlayer" key={ index }>
              <img
                className="picture"
                src={ picture }
                alt={ `Imagem do Gravatar do Jogador Top ${index + 1}` }
              />
              <div className="infos2">
                <h2
                  className="namePlayer"
                  data-testid={ `player-name-${index}` }
                >
                  {name}
                </h2>
                <p
                  className="playerScore"
                  data-testid={ `player-score-${index}` }
                >
                  {score}
                </p>
              </div>
            </div>
          ))}
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => redirectToLogin(this) }
          >
            Play Again
          </button>
        </div>
      </div>

    );
  }
}

export default Ranking;
