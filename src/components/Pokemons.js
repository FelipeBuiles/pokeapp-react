import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PokemonList from './PokemonList'
import { browserHistory } from 'react-router'

class Pokemons extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const pokemons = this.props
        return <PokemonList pokemons={pokemons} />
    }
}

const mapStateToProps = (state, ownProps) => {
    return { pokemons: state.pokemon }
}

export default connect(mapStateToProps)(Pokemons)