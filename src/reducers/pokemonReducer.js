import * as types from '../constants/actionTypes'
import initialState from './initialState'

export function pokemonList(state = initialState.pokemonList, action) {
    switch(action.type) {
        case types.LOAD_POKEMON_SUCCESS:
            return [...state, ...action.pokemon]

        case types.SET_POKEMON_COLOR:
            return [
                ...state.filter(pokemon => pokemon.id !== action.pokemon.id),
                Object.assign({}, action.pokemon)
            ]

        default:
            return state
    }
}

export function currentPokemon(state = initialState.currentPokemon, action) {
    switch(action.type) {
        case types.GET_SPECIFIC_POKEMON_SUCCESS:
            return {
                id: action.pokemon.id,
                name: action.pokemon.name,
                img: action.pokemon.sprites.front_default,
                abilities: action.pokemon.abilities.map(a => a.ability.name),
                stats: action.pokemon.stats.map(s => {
                    return {
                        stat: s.stat.name,
                        value: s.base_stat
                    }
                }),
                types: action.pokemon.types.map(t => t.type.name),
                weight: action.pokemon.weight,
                height: action.pokemon.height,
                gender: action.pokemon.gender_rate > -1 ? 'Male - Female' : 'None',
                description: action.pokemon.flavor_text_entries[1].flavor_text
            }
        
        default:
            return state
    }
}