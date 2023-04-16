import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
// all modules
import Notiflix from 'notiflix';
// one by one
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';

const DEBOUNCE_DELAY = 300;

// // 1
// https://restcountries.com/v3.1/all?fields=name,flags`



// const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-box'); 
const countryList = document.querySelector('.country-list');

// searchButton.addEventListener('click', () => {
//   const searchTerm = searchInput.value.trim();

//   if (searchTerm.length > 0) {
//     fetchCountries(searchTerm).then(countries => {
//       resultsList.innerHTML = '';

//       countries.forEach(country => {
//         const li = document.createElement('li');
//         li.textContent = country.name;
//         resultsList.appendChild(li);
//       });
//     });
//   }
// });

// // 2
// import { fetchCountries } from './fetchCountries.js';
// import debounce from 'lodash.debounce';

// const searchBox = document.querySelector('#search-box');
// const searchResults = document.querySelector('#search-results');

//  function renderCountries(countries) {
//  // Render the countries in the UI
//  }

//  function renderCountryDetails(country) {
//   // Render the details of the selected country in the UI
// }

//  function handleSearch() {
//   const searchTerm = searchBox.value.trim();

//   if (searchTerm) {
//      fetchCountries(searchTerm)
//       .then(countries => renderCountries(countries))
//       .catch(error => {
//         console.error(error);
//        });
//   } else {
//    // Clear the search results if the search term is empty
//     searchResults.innerHTML = '';
//   }
// }

// searchBox.addEventListener('input', debounce(handleSearch, 300));

// // 3
// import { fetchCountries } from './fetchCountries.js';
// import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';

 const searchBox = document.querySelector('#search-box');
 const searchResults = document.querySelector('#search-results');

 function renderCountries(countries) {
  // Render the countries in the UI
}

 function renderCountryDetails(country) {
  // Render the details of the selected country in the UI
}

 function handleSearch() {
  const searchTerm = searchBox.value.trim();

   if (searchTerm) {
     fetchCountries(searchTerm)
      .then(countries => {
        if (countries.length > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else {
           renderCountries(countries);
        }
       })
       .catch(error => {
        console.error(error);
      });
   } else {
// Clear the search results if the search term is empty
    searchResults.innerHTML = '';
  }
 }

 searchBox.addEventListener('input', debounce(handleSearch, 300));

// // 4
 function renderCountries(countries) {
    let html = '';
  
     if (countries.length === 0) {
      html = '<p>No matching countries found</p>';
    } else if (countries.length >= 2 && countries.length <= 10) {
      html = '<ul>';
      countries.forEach(country => {
        html += `
          <li>
            <img src="${country.flags.svg}" alt="${country.name.official} flag" width="32" height="20">
             <span>${country.name.official}</span>
          </li>
        `;
      });
       html += '</ul>';
    } else if (countries.length === 1) {
       renderCountryDetails(countries[0]);
     }
  
     searchResults.innerHTML = html;
   }
// // 5
 function renderCountryDetails(country) {
     const html = `
      <div class="country-card">
        <img src="${country.flags.svg}" alt="${country.name.official} flag" class="country-card__flag">
         <h2 class="country-card__name">${country.name.official}</h2>
         <div class="country-card__details">
          <p><strong>Capital:</strong> ${country.capital}</p>
           <p><strong>Population:</strong> ${country.population}</p>
          <p><strong>Languages:</strong> ${country.languages.map(lang => lang.name).join(', ')}</p>
         </div>
     </div>
     `;
     searchResults.innerHTML = html;
  }
// // 6
//   // fetchCountries.js

// export async function fetchCountries(name) {
//     const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fields=name.official,capital,population,flags.svg,languages`;
  
//     const response = await fetch(url);
  
//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     } else if (response.status === 404) {
//       throw new Error('Country not found');
//     } else {
//       throw new Error(`Error ${response.status}: ${response.statusText}`);
//     }
//   }
// // 7
//   // searchCountries.js

// import { fetchCountries } from './fetchCountries.js';

// const searchBox = document.querySelector('#search-box');
// const searchResults = document.querySelector('#search-results');

 searchBox.addEventListener('input', _.debounce(searchCountries, 300));

 async function searchCountries() {
   const searchTerm = searchBox.value.trim();
  
  if (!searchTerm) {
    searchResults.innerHTML = '';
    return;
   }

   try {
     const countries = await fetchCountries(searchTerm);

     if (countries.length === 0) {
      notiflix.notification.warning('Oops, there is no country with that name');
     } else if (countries.length === 1) {
       renderCountryDetails(countries[0]);
     } else if (countries.length > 10) {
      notiflix.notification.warning('Too many matches found. Please enter a more specific name.');
     } else {
       renderCountryList(countries);
    }
   } catch (error) {
     notiflix.notification.failure(error.message);
   }
 }
// // 8
//  fetch(url)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error("Country not found");
//     }
//     return response.json();
//   })
//    .then(data => {
// //     // handle successful response
//    })
//    .catch(error => {
//     // handle error
//    });


