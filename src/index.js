import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries'
import { remove } from 'lodash';
const _ = require('lodash');
const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box')

input.addEventListener('input', _.debounce(typeName, DEBOUNCE_DELAY))

function typeName(evt) {
    
    fetchCountries.name = evt.target.value.trim()
    if (fetchCountries.name !== '') {
        fetchCountries.fetchCountries(fetchCountries.name)
            .then(createMarkap)
            .catch(error => {
                Notify.failure("Oops, there is no country with that name");
            })
    }
}

function createMarkap(array) {
    const countryInfo = document.querySelector('.country-info'); 
   countryInfo.innerHTML=""
  
    if (array.length > 10) {
        
        Notify.info('Too many matches found. Please enter a more specific name.')
    }
    else if (array.length > 1) { 
         
        countryInfo.insertAdjacentHTML('beforeend', markupForLi(array));
    }
    else {
        countryInfo.insertAdjacentHTML('beforeend', markupForCountry(array));
    }
            
}
function markupForLi(array) {
   
 return array
             .map(country => {
                return `<li class="country-flag-name">
      <img src="${country.flags.svg}" alt="Флаг ${country.name.official}" width="60" height="40">
      <h2>${country.name.official}</h2></li>
      `
            }).join('')
}

function markupForCountry(array) {
     
    return array
            .map(country => {
                return `<div class="country-flag-name">
      <img src="${country.flags.svg}" alt="Флаг ${country.name.official}" width="60" height="40">
      <h2>${country.name.official}</h2></div>
      <p><b>Столица: ${country.capital}</b> </p>
      <p><b>Население:</b> ${country.population} человек</p>
      <p><b>Официальный язык:</b> ${Object.values(country.languages).join(", ")}</p>
  `
            }).join('')
}