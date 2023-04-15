export async function fetchCountries(name) {    
 const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fields=name.official,capital,population,flags.svg,languages`;
      
 const response = await fetch(url);
       if (response.ok) {
        const data = await response.json();
        return data;
    } else if (response.status === 404) {
     throw new Error('Country not found');
    } else {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  }