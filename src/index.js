import './css/styles.css';
import countryApi from './fetchCountries'

var debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const name = document.querySelector('#search-box');  
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info')

function fetchCountries(e) {
  e.preventDefault();
  const currentValue = e.target.value.trim();
  if(!currentValue){
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return 
  }
  countryApi.fetchCountries(currentValue)
  .then(item => createMarkup(item))
  .catch(err => Notify.failure("Oops, there is no country with that name"))
  .finally(countryList.innerHTML = '', countryInfo.innerHTML = '');
}

function createMarkup(obj) {
  console.log(Object.values(obj))
  if(obj.length > 10){
    Notify.info("Too many matches found. Please enter a more specific name.");
    return
  }
  if (obj.length >= 2 && obj.length <= 10){
    const markup = obj.reduce((acc, {flags, name}) => {
      return acc + `<li><img src="${flags[0]}" alt="${name.official}" width="30">${name.official}</li>`
    }, '')
    countryList.insertAdjacentHTML('beforeend', markup)
  }
  if(obj.length === 1){
    const markup = obj.map(({ flags, name, capital, population, languages }) => { 
      
      return `<h3><img src="${flags[0]}" alt="${name.official}" width="30">${name.official}</h3>
      <p>Capital:${capital}</p>
      <p>Population:${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`
    }).join('')
    countryInfo.insertAdjacentHTML('beforeend', markup)
  }
}

name.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY))