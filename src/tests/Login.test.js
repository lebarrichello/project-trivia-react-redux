import React from "react";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import Login from "../pages/Login";
import App from "../App";

describe('Testes da pagina de Login', () =>{

  it('Testa se a pagina possui os inputs de nome e e-mail', () => {
    renderWithRouterAndRedux(<Login />);

    expect(screen.getByTestId('input-player-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-gravatar-email')).toBeInTheDocument();
  });

  it('Testa se a pagina possui um botao desabilitado com o texto "Play"', () => {
    renderWithRouterAndRedux(<Login />);
    expect(screen.getByTestId('btn-play')).toBeInTheDocument();
    expect(screen.getByTestId('btn-play')).toBeDisabled();    
  })

  it('Testa se o botao "Play" é habilitado quando os campos de nome e e-mail sao preenchidos', () => {
    renderWithRouterAndRedux(<Login />);
    userEvent.type(screen.getByTestId('input-player-name'), 'Trybe');
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'test@trybe.com');
    
    expect(screen.getByTestId('btn-play')).toBeEnabled();    
  });

  it('Testa se existe na pagina um botao que leva o usuario para a pagina de Configuracoes', async () => {
    renderWithRouterAndRedux(<App />);
    expect(screen.getByTestId('btn-settings')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('btn-settings'))
    await screen.findByTestId('settings-title')
  })
})