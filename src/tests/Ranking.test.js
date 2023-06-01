import React from "react";
import { act, screen, waitFor,  } from "@testing-library/react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import Ranking from "../pages/Ranking";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { LocalStorageRanking } from "./Mocks/LocalStorage";

describe('Testes da pagina de Ranking', () =>{

  it('Testa se a pagina Ranking está funcionando e renderiza as informações corretamente', async () => {

    localStorage.setItem('ranking', JSON.stringify(LocalStorageRanking))

    const {history} = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/ranking')
    })

    await waitFor(() => {
    expect(screen.getByTestId('player-name-0').textContent).toEqual("Segunda Pessoa");

    expect(screen.getByTestId('player-score-0').textContent).toEqual('170');

    expect(screen.getByTestId('player-name-1').textContent).toEqual("Primeira Pessoa");

    expect(screen.getByTestId('player-score-1').textContent).toEqual('85');

    act(() => {
      userEvent.click(screen.getByTestId('btn-go-home'))
    })


    expect(history.location.pathname).toEqual('/')
    })

  });
})