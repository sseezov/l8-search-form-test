/* eslint-disable */
// import _ from 'lodash';
import onChange from 'on-change';
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
  const form = document.querySelector('form')
  searchContainer.innerHTML = formHTML;

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    axios.get('/goods')
      .then((response) => {
        console.log(response.data);
        goodsQuantityContainer.innerHTML = resultsCountHTML;
        goodsQuantityContainer.textContent = `Goods total: ${response.data.products.length}`
      })
      .catch((error) => {
        console.log(error);
      });
  })
};
