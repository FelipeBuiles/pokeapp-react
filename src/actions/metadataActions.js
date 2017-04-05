import * as types from '../constants/actionTypes'

export function setMetadata(metadata) {
    return { type: types.SET_METADATA, metadata }
}

export function setSearchString(searchString) {
    return { type: types.SET_SEARCH_STRING, searchString }
}