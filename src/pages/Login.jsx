/* eslint-disable react/jsx-max-depth */
import { Component } from 'react';
import { connect } from 'react-redux';
import { FiPlay, FiSettings } from 'react-icons/fi';
import { onClickPlayButton } from '../services/ClickFunctions';
import { redirectToSettings } from '../services/redirectFunctions';

import '../styles/Login.scss';

class Login extends Component {
  state = {
    inputName: '',
    inputEmail: '',
    isValid: false,
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { inputEmail, inputName } = this.state;
      this.setState({
        isValid: (inputEmail.length > 0 && inputName.length > 0),
      });
    });
  };

  onClickPlayButton = onClickPlayButton.bind(this);

  render() {
    const { inputEmail, inputName, isValid } = this.state;
    return (
      <main className="containerLogin">
        <h1> Trivia Trybe</h1>
        <div className="login">
          <div>
            <div className="inputs">
              <input
                type="text"
                placeholder="Nome"
                value={ inputName }
                name="inputName"
                data-testid="input-player-name"
                onChange={ this.onChange }
              />
              <input
                type="email"
                placeholder="Email"
                value={ inputEmail }
                name="inputEmail"
                data-testid="input-gravatar-email"
                onChange={ this.onChange }
              />
            </div>
            <div className="buttons">
              <button
                className="btnPlay"
                type="button"
                data-testid="btn-play"
                disabled={ !isValid }
                onClick={ this.onClickPlayButton }
              >
                <FiPlay className="icon" />
                Play
              </button>
              <button
                type="button"
                data-testid="btn-settings"
                onClick={ () => redirectToSettings(this) }
              >
                <FiSettings className="icon" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default connect()(Login);
