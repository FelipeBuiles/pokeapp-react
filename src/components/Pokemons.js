import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PokemonList from './PokemonList'
import InfiniteScroll from 'react-infinite-scroller'
import CircularProgress from 'material-ui/CircularProgress'
import * as pokemonActions from '../actions/pokemonActions'

class Pokemons extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { pokemons, hasMore } = this.props
        const { loadMorePokemon } = this.props.actions
        return (
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMorePokemon}
                hasMore={hasMore}
                initialLoad={false}
                threshold={50}
                loader={<CircularProgress />}>
                <PokemonList pokemons={pokemons} />
            </InfiniteScroll>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        pokemons: state.pokemon,
        hasMore: !!state.metadata.next
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators(pokemonActions, dispatch)
  }
}

Pokemons.propTypes = {
    pokemons: PropTypes.array.isRequired,
    hasMore: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons)