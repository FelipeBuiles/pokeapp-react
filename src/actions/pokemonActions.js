import * as types from '../constants/actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions'
import { setMetadata } from './metadataActions'
import * as api from '../api/pokeApi'
import * as Vibrant from 'node-vibrant'

export function loadPokemonSuccess(pokemon) {
    return { type: types.LOAD_POKEMON_SUCCESS, pokemon }
}

export function getSpecificPokemonSuccess(pokemon) {
    return { type: types.GET_SPECIFIC_POKEMON_SUCCESS, pokemon }
}

export function loadInitialPokemon() {
    return dispatch => {
        dispatch(beginAjaxCall())
        api.getInitialTwenty()
            .then(res => {
                return res.data
            })
            .then(parsedResponse => {
                handleData(dispatch, parsedResponse)
            })
            .catch(error => {
                dispatch(ajaxCallError())
                throw(error)
            })
    }
}

export function loadMorePokemon() {
    return (dispatch, getState) => {
        dispatch(beginAjaxCall())
        const metadata = getState().metadata
        if(metadata && metadata.next) {
            api.getMore(metadata.next)
                .then(res => {
                    return res.data
                })
                .then(parsedResponse => {
                    const nextId = parsedResponse.results[0].url.split('/').reverse()[1]
                    if(metadata.offset == nextId - 1) {
                        handleData(dispatch, parsedResponse)
                    }
                })
                .catch(error => {
                    dispatch(ajaxCallError())
                    throw(error)
                })
        }
    }
}

export function getPokemonById(id) {
    return dispatch => {
        dispatch(beginAjaxCall())
        api.getPokemon(id)
            .then(res => {
                dispatch(getSpecificPokemonSuccess(res))
            })
    }
}

function handleData(dispatch, parsedResponse) {
    const offset = parsedResponse.next.split('offset=')[1]
    const metadata = {
        count: parsedResponse.count,
        next: parsedResponse.next,
        previous: parsedResponse.previous,
        offset
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

    for(const pokemon of pokemons) {
        Vibrant.from(pokemon.img).getPalette((err, palette) => {
            if(!err && palette && palette.Vibrant) {
                const data = Object.assign({}, pokemon, {
                    color: palette.Vibrant._rgb
                })
                dispatch({ type: types.SET_POKEMON_COLOR, pokemon: data })
            }
        })
    }
} 