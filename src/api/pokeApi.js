import axios from 'axios'

export function getInitialTwenty() {
    return axios.get('https://pokeapi.co/api/v2/pokemon/')
}

export function getMore(url) {
    return axios.get(url)
}

export function getPokemon(id) {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => {
            let basicInfo = res.data
            return axios.get(basicInfo.species.url)
                .then(species => {
                    return Object.assign({}, {...basicInfo}, {...species.data})
                })
        })
}