import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import fetchSucess from "./Mocks/FetchSucess";
import { getGravatar } from "./helpers/getGravatarImg";
import fetchToken from "./Mocks/FetchToken";
import App from "../App";
import { act } from "@testing-library/react";
import defaultGlobalState from "./Mocks/defaultGlobalState";

describe('Testes da página de Game', () => {
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
  
  it('Testa se a página renderizou corretamente as perguntas vinda da api', async () => {
    const { store, history } = renderWithRouterAndRedux(<App />, defaultGlobalState);

    userEvent.paste(await screen.findByTestId('input-player-name'), 'Primeira Pessoa');
    userEvent.paste(await screen.findByTestId('input-gravatar-email'), 'teste@teste.com');

    userEvent.click(screen.getByTestId('btn-play'));

    expect((await screen.findByTestId('header-player-name')).textContent).toEqual('Primeira Pessoa');
    expect((await screen.findByTestId('header-profile-picture')).src).toEqual(getGravatar('teste@teste.com'));
    expect((await screen.findByTestId('header-score')).textContent).toEqual('0');

    const { results } = fetchSucess;

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    await waitFor(() => {
      results.map(({ category, question, correct_answer, incorrect_answers }, index) => {
        if (index < 4) {
          expect(screen.getByTestId('question-category').textContent).toEqual(category);
          expect(screen.getByTestId('question-text').textContent).toEqual(question);
  
          incorrect_answers.forEach((answer) => {
            screen.getByText(answer);
          });

          userEvent.click(screen.getByTestId('correct-answer'));
          userEvent.click(screen.getByTestId('btn-next'));
        }
    });
    })
  });
  jest.setTimeout(40000)
  it('Testa se os botões de resposta estão desabilitados depois de passar 30 segundos', async () => {
    
    const { store, history } = renderWithRouterAndRedux(<App />, defaultGlobalState);

    userEvent.paste(await screen.findByTestId('input-player-name'), 'Primeira Pessoa');
    userEvent.paste(await screen.findByTestId('input-gravatar-email'), 'teste@teste.com');

    userEvent.click(screen.getByTestId('btn-play'));
    
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

    await waitFor(() => {

    expect((screen.getByTestId('header-player-name')).textContent).toEqual('Primeira Pessoa');
    expect((screen.getByTestId('header-profile-picture')).src).toEqual(getGravatar('teste@teste.com'));
    expect((screen.getByTestId('header-score')).textContent).toEqual('0');

    const { results } = fetchSucess;

      const { category, question, correct_answer, incorrect_answers } = results[0];
  
          expect(screen.getByTestId('question-category').textContent).toEqual(category);
          expect(screen.getByTestId('question-text').textContent).toEqual(question);
  
          incorrect_answers.forEach((answer) => {
            expect(screen.getByText(answer)).toBeDisabled()
          });
  
          expect(screen.getByTestId('correct-answer')).toBeDisabled();
  
          userEvent.click(screen.getByTestId('btn-next'));
        
    }, {timeout: 32000})
  });
});
