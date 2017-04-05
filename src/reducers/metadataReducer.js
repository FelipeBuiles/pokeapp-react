import * as types from '../constants/actionTypes'
import initialState from './initialState'

export default function metadataReducer(state = initialState.metadata, action) {
    switch(action.type) {
        case types.SET_METADATA:
            return {
                ...action.metadata,
                searchString: state.searchString
            }

        case types.SET_SEARCH_STRING:
            return {
                ...state,
                searchString: action.searchString
            }

        default:
            return state
    }
}