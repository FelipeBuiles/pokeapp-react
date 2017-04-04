import { combineReducers } from 'redux';
import pokemon from './pokemonReducer'
import metadata from './metadataReducer'
import ajaxCallsInProgress from './ajaxStatusReducer'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    pokemon,
    metadata,
    ajaxCallsInProgress,
    routing: routerReducer
})

export default rootReducer