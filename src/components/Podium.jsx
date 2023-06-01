import React, { Component } from 'react';
import Confetti from 'react-confetti';
import { updateRanking } from '../services/DidMountFunctions';

class Podium extends Component {
  componentDidMount() {
    updateRanking(this);
  }

  render() {
    const tres = 3;
    return (
      <>
        <Confetti
          tweenDuration={ 30000 }
          recycle={ false }
          className="confetti"
        />
        <div className="topLeadersList">
          {updateRanking().map(({ name, picture }, index) => (
            <div className="leader" key={ index }>
              {index + 1 <= tres && (

                <>
                  <div className="crown">
                    <svg
                      id="crown1"
                      fill="#0f74b5"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 50"
                    >
                      <polygon
                        className="cls-1"
                        points="12.7 50 87.5 50 100 0 75 25 50 0 25.6 25 0 0 12.7 50"
                      />
                    </svg>
                  </div>
                  <div className="containerImage">
                    <img
                      className="image"
                      src={ picture }
                      alt={ `Imagem do Gravatar do Jogador Top ${index + 1}` }
                    />
                    <div className="leaderName">{name}</div>

                  </div>

                </>
              )}
            </div>
          ))}
        </div>

      </>

    );
  }
}

export default Podium;
