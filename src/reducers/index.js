import { combineReducers } from 'redux';
import { pokemonList, currentPokemon } from './pokemonReducer'
import metadata from './metadataReducer'
import ajaxCallsInProgress from './ajaxStatusReducer'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    pokemonList,
    metadata,
    currentPokemon,
    ajaxCallsInProgress,
    routing: routerReducer
})

export default rootReducer