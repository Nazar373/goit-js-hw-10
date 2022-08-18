const base = 'https://restcountries.com/v3/';
const endpoint = `name/`;
const key = 'name,capital,population,flags,languages';
function fetchCountries(name) {
  return fetch(`${base}${endpoint}${name}?field=${key}`)
  .then(res => {
    if(!res.ok){
      return
    }
    return res.json()})
  .catch(err => console.log(err))
}

export default { fetchCountries }