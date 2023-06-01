import { Component } from 'react';
import { redirectToLogin } from '../services/redirectFunctions';
import '../styles/Settings.scss';

class Settings extends Component {
  render() {
    return (
      <div className="containerSettings">
        <h1
          data-testid="settings-title"
        >
          Configurações
        </h1>

        <h2>
          {'<'}
          Página em construção
          {'>'}
        </h2>

        <p>
          Enquanto isso , divirta-se no game !
        </p>
        <button
          type="button"
          onClick={ () => redirectToLogin(this) }
        >
          Login
        </button>
      </div>

    );
  }
}

export default Settings;
