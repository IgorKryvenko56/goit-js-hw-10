 export async function fetchCountries(name) {    
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages`;
     
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
  
  // A
  // export function fetchCountries(name) {
  //   // const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  //   const url =`https://restcountries.com/v3.1/all?fields=name,flags`;
  //   return fetch(url).then(response => {
  //     if (!response.ok) {
  //       throw new Error(response.status);
  //     }
  //     return response.json();
  //   });
  // }
  