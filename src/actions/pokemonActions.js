import * as types from '../constants/actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions'
import { setMetadata } from './metadataActions'
import * as api from '../api/pokeApi'

export function loadPokemonSuccess(pokemon) {
    return { type: types.LOAD_POKEMON_SUCCESS, pokemon }
}

export function loadPokemon() {
    return dispatch => {
        dispatch(beginAjaxCall())
        api.getInitialTwenty()
            .then(response => {
                return response.json()
            })
            .then(parsedResponse => {
                const metadata = {
                    count: parsedResponse.count,
                    next: parsedResponse.next,
                    previous: null
                }
                dispatch(setMetadata(metadata))
                const pokemons = parsedResponse.results.map(p => {
                    const id = p.url.split('/').reverse()[1]
                    return {
                        id,
                        name: p.name,
                        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
                    }
                })
                dispatch(loadPokemonSuccess(pokemons))
            })
            .catch(error => {
                throw(error)
                dispatch(ajaxCallError())
            })
    }
}