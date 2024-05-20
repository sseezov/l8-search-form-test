/* eslint-disable */
import axios from 'axios';

export default () => {
  const formHTML = `
    <div class="col-auto">
      <i class="fas fa-search h4 text-body mr-2"></i>
    </div>
    <div class="col">
    <input class="form-control form-control-lg form-control-borderless" type="search"
      placeholder="Search topics or keywords">
    </div>
    <div class="col-auto">
      <button class="btn btn-lg btn-success" type="submit">Search</button>
    </div>`;

  const resultsCountHTML = `<div class="goods-quantity"></div>`
  const goodsQuantityContainer = document.querySelector('.results-container')
  const searchContainer = document.querySelector('.search-form-container');
  const searchResults = document.querySelector('.search-results')
  const form = document.querySelector('form')
  searchContainer.innerHTML = formHTML;
  const input = document.querySelector('input');

  const setCard = (card, cheapestPrice) =>  `
    <div class="card">
      <img src=${card.images[0]} class="card-img-top" alt=${card.title}>
      <div class="card-body">
          <h5 class="card-title">${card.title}</h5>
          <p class="card-text">${card.description}</p>
          <h3 class="card-text ${Number(card.price) === cheapestPrice ? 'text-success' : ''}">${card.price}</h3>
      </div>
    </div>
  `

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = input.value;
    axios.get('/goods')
      .then((response) => {
        const { products } = response.data;
        const query = products.filter(product => new RegExp(value, 'i').test(product.title));
        const bestPrice = query
          .map((product) => Number(product.price))
          .reduce((acc, elem) => elem < acc ? elem : acc)
        const cards = query.map((product) => setCard(product, bestPrice));
        searchResults.innerHTML = cards.join('\n');
        goodsQuantityContainer.innerHTML = resultsCountHTML;
        goodsQuantityContainer.textContent = `Goods total: ${cards.length}`
      })
      .catch((error) => {
        console.log(error);
      });
  })
};
