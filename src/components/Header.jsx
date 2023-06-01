import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import { getGravatar } from '../services/conversionFunctions';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { name, score, email } = this.props;
    return (
      <header>
        <div className="nameLogo">
          <h1 className="triviaTrybe"> Trivia Trybe</h1>
        </div>
        <div className="containerImg">
          <img
            className="profile"
            data-testid="header-profile-picture"
            src={ getGravatar(email) }
            alt="Gravatar"
          />
        </div>
        <div className="containerName">
          <p
            data-testid="header-player-name"
          >
            {name}
          </p>
        </div>
        <div className="textScore">
          <FaStar className="iconStar" />
          <p className="points">Pontos:</p>
        </div>
        <div
          className="containerScore"
          data-testid="header-score"
        >
          {score}
        </div>
      </header>

    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
