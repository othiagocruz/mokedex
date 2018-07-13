import { POKEMON_ENDPOINT } from './endpoint'

export const listPokemons = cb => {
  let payload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return fetch(`${POKEMON_ENDPOINT}/?limit=151`, payload)
    .then(response => response.json())
    .then(json => cb(json))
}

export const getPokemonById = (id, cb) => {
  let payload = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  return fetch(`${POKEMON_ENDPOINT}/${id}/`, payload)
    .then(response => response.json())
    .then(json => cb(json))
}
