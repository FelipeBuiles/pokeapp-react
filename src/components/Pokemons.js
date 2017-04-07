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
        const { pokemons, searchString, hasMore } = this.props
        const { loadMorePokemon } = this.props.actions
        let filteredPokemon = (searchString) ? pokemons.filter(p => {
            return p.name.includes(searchString)
        }) : pokemons
        return (
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMorePokemon}
                hasMore={!searchString && hasMore}
                initialLoad={false}
                threshold={50}
                loader={<CircularProgress />}>
                <PokemonList pokemons={filteredPokemon} />
            </InfiniteScroll>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        pokemons: state.pokemonList,
        searchString: state.metadata.searchString,
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
    hasMore: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    searchString: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Pokemons)