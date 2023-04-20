  import './css/styles.css';
  import debounce from 'lodash.debounce';
  import { Notify } from 'notiflix/build/notiflix-notify-aio';
  import { fetchCountries } from './fetchCountries';
  
  Notiflix.Notify.init({
    position: 'right-top',
    cssAnimationStyle: 'fade',
    fontSize: '20px',
    width: '360px',
    borderRadius: '5px',
    timeout: 1800,
  });
  
  const DEBOUNCE_DELAY = 300;
  
  const inputBox = document.querySelector('#search-box');
  const countryList = document.querySelector('.country-list');
  const countryInfo = document.querySelector('.country-info');
  
  inputBox.addEventListener('input', debounce(fillingInput, DEBOUNCE_DELAY));
  
  function fillingInput(evt) {
    evt.preventDefault();
    let name = evt.target.value.trim();
    if (name === '') {
      clearInnerHTML();
      return;
    }
  
    fetchCountries(name)
      .then(displayOnScreen)
      .catch(error => {
        clearInnerHTML();
        Notify.failure('Oops, there is no country with that name');
      });
  }
  
  function displayOnScreen(data) {
    if (data.length >= 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
      clearInnerHTML();
    } else if (data.length === 1) {
      clearInnerHTML();
      markupCountry(data);
    } else {
      clearInnerHTML();
      markupAllCountries(data);
    }
  }
  
  function markupCountry(data) {
    let markupCountry = data.reduce(
      (
        acc,
        { flags: { svg }, name: { official }, capital, population, languages }
      ) => {
        acc += `<div class = "country">
          <img src="${svg ? svg : ''}" width = "60" height = "30">
          <p class = "country-name">${official ? official : ''}</p>
          </div>
          <p><span class = "text">Capital: </span>${
            capital ? capital : ''
          }</p>
          <p><span class = "text">Population: </span>${
            population ? population : ''
          }</p>
          <p><span class = "text">Languages: </span>${
            Object.values(languages) ? Object.values(languages) : ''
          }
              </p>`;
  
        return acc;
      },
      ''
    );
  
    countryInfo.innerHTML = markupCountry;
  }
  
  function markupAllCountries(data) {
   let markupList = data.reduce((acc, { flags: { svg }, name: { official } }) => {
      acc += `<li class = "countries">
      <img src="${svg ? svg : ''}" width = "40" height = "30">
      <p class = "text-name">${official ? official : ''}</p>
      </li>`;
  
      return acc;
    }, '');
  
    countryList.innerHTML = markupList;
  }
  
  function clearInnerHTML() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }