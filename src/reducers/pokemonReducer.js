import * as types from '../constants/actionTypes'
import initialState from './initialState'

export default function pokemonReducer(state = initialState.pokemon, action) {
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