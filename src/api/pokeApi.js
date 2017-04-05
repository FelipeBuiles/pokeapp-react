import axios from 'axios'

export function getInitialTwenty() {
    return axios.get('http://pokeapi.co/api/v2/pokemon/')
}

export function getMore(url) {
    return axios.get(url)
}