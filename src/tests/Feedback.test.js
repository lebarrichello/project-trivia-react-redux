import React from "react";
import { act, screen, waitFor,  } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from "../App";
import fetchToken from "./Mocks/FetchToken";
import fetchSucess from "./Mocks/FetchSucess";
import defaultGlobalState from "./Mocks/defaultGlobalState";

describe('Testes da pagina de Feedback', () =>{

  beforeEach(() => {
    jest.spyOn(global, 'fetch')
    .mockResolvedValueOnce({
      json: () => Promise.resolve(fetchToken),
    })
    .mockImplementationOnce((url) => {
      if (url.includes('/api.php?amount=5')) {
        return Promise.resolve({
          json: () => Promise.resolve(fetchSucess),
        });
      }
      throw new Error(`Unmocked fetch: ${url}`);
    });
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('Testa se a pagina feedback está funcionando e rendriza as informações corretamente', async () => {
    const { store, history } = renderWithRouterAndRedux(<App />, defaultGlobalState);

    userEvent.paste(await screen.findByTestId('input-player-name'), 'Primeira Pessoa');
    userEvent.paste(await screen.findByTestId('input-gravatar-email'), 'teste@teste.com');

    act(() => {
      history.push('/feedback');
    });

    expect(screen.getByTestId('header-profile-picture').src).toEqual("https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e");

    expect(screen.getByTestId('feedback-total-question').textContent).toEqual('0');

    expect(screen.getByTestId('feedback-total-score').textContent).toEqual('0');

    expect(history.location.pathname).toEqual('/feedback');

    userEvent.click(screen.getByTestId('btn-ranking'))

    expect(history.location.pathname).toEqual('/ranking');

    act(() => {
      history.push('/feedback');
    });

    userEvent.click(screen.getByTestId('btn-play-again'))

    expect(history.location.pathname).toEqual('/');


  });
  it('Testa se a página renderizou corretamente o resultado do game', async () => {
    const { store, history } = renderWithRouterAndRedux(<App />, defaultGlobalState, '/');

    userEvent.paste(await screen.findByTestId('input-player-name'), 'Primeira Pessoa');
    userEvent.paste(await screen.findByTestId('input-gravatar-email'), 'teste@teste.com');

    userEvent.click(screen.getByTestId('btn-play'));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    
    await waitFor(() => {
      const { results } = fetchSucess;
      results.map(({correct_answer }) => {
          userEvent.click(screen.getByText(correct_answer));
          userEvent.click(screen.getByTestId('btn-next'));
    });
  })

    expect(history.location.pathname).toEqual('/feedback')

    expect(screen.getByTestId('feedback-total-question').textContent).toEqual('5');

    expect(screen.getByTestId('feedback-total-score').textContent).toEqual('290');

    expect(screen.getByTestId('feedback-text').textContent).toEqual("Well Done!");


  });
})