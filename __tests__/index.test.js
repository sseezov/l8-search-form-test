/* eslint-disable */
import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import testingLibrary from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import nock from 'nock';
import run from '../src/app.js';
import response from '../__fixtures__/response.js';

const { screen, waitFor } = testingLibrary;

let elements;
nock.disableNetConnect();

beforeEach(() => {
  nock('http://localhost')
    .persist()
    .get('/goods')
    .reply(200, response);

  const pathToFixture = path.join('__tests__', '__fixtures__', 'index.html');
  const initHtml = fs.readFileSync(pathToFixture).toString();
  document.body.innerHTML = initHtml;
  run();

  elements = {
    submit: screen.getByText(/Search/),
    searchInput: screen.getByRole('searchbox'),
  };
});

test('step1', async () => {
  const formContainer = document.querySelector('.search-form-container');

  expect(formContainer).not.toEqual(null);

  expect(formContainer.querySelector('.col-auto i.fas.fa-search')).not.toEqual(null);
  expect(formContainer.querySelector('.col input.form-control')).not.toEqual(null);
  expect(formContainer.querySelector('.col-auto button.btn-success')).not.toEqual(null);
});

test('step2', async () => {
  await userEvent.type(elements.searchInput, 'iphone');
  await userEvent.click(elements.submit);

  await waitFor(() => {
    const div = document.querySelector('.results-container');
    expect(div).toHaveTextContent('Goods total: 2');
  });
});

test('step3', async () => {
  await userEvent.type(elements.searchInput, 'iphone');
  await userEvent.click(elements.submit);

  await waitFor(() => {
    const displayedCards = document.querySelectorAll('.search-results .card');
    expect(displayedCards.length).toBeGreaterThan(0);

    displayedCards.forEach(result => {
      expect(result.querySelector('.card-img-top')).not.toBeNull();
      expect(result.querySelector('.card-body')).not.toBeNull();
      expect(result.querySelector('.card-title')).not.toBeNull();
      expect(result.querySelector('p.card-text')).not.toBeNull();
      expect(result.querySelector('h3.card-text')).not.toBeNull();
      expect(result.querySelector('.card-title').textContent).toContain('iPhone');
    });
  });
});

test('step4', async () => {
  await userEvent.type(elements.searchInput, 'iphone');
  await userEvent.click(elements.submit);

  await waitFor(() => {
    const text = document.querySelector('.text-success');
    expect(text).not.toBeNull();
  });
});