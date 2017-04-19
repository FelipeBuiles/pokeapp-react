import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as pokemonActions from '../actions/pokemonActions'
import { BarChart, Bar, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
//import { CircularProgress } from 'material-ui/CircularProgress'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import Chip from 'material-ui/Chip'
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider'

const detailsStyle = {
    container: {
        marginTop: 70
    }
}

class PokemonDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemon: {}
        }
        
    }

    componentWillMount() {
        if(this.props.pokemon) {
            this.setState({ pokemon: this.props.pokemon, color: this.rgbToHex(this.props.color) })
        } else {
            this.props.actions.getPokemonById(this.props.pokemonId)
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.pokemon && nextProps.pokemon !== this.state.pokemon) {
            this.setState({ pokemon: nextProps.pokemon, color: this.rgbToHex(nextProps.color) })            
        }
    }

    rgbToHex = ([r, g, b]) => {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    renderContent = () => {
        if(this.state.pokemon && this.state.pokemon.id) {
            return this.renderPokemon()
        } 
        return <p> Loading... </p>
    }

    renderPokemon = () => {
        const pokemon = this.state.pokemon
        return (
            <div id="details-container">
                <Card id="img-card">
                    <CardMedia
                        overlay={<CardTitle title={pokemon.name} style={{backgroundColor: this.state.color}}/>}
                        >
                        <img src={pokemon.img} />
                    </CardMedia>
                </Card>
                <div id="info">
                    <div id="description">
                        <Divider />                 
                        <p>{pokemon.description}</p>
                        <Divider />
                    </div>
                    <List id="attributes">
                        <ListItem key="height" primaryText="Height" secondaryText={pokemon.height / 10 + ' m'}/>
                        <ListItem key="weight" primaryText="Weight" secondaryText={pokemon.weight / 10 + ' kg'}/>
                        <ListItem key="gender" primaryText="Gender" secondaryText={pokemon.gender}/>
                        <Subheader>Abilities</Subheader>
                        {pokemon.abilities.map(a => {
                            return <ListItem key={'ability'+a} primaryText={a}/>
                        })}
                    </List>
                    <div id="types">
                        {pokemon.types.map(t => {
                            return <Chip key={t} className={t+' type'}>{t}</Chip>
                        })}
                    </div>
                    <div id="stats">
                        <BarChart width={500} height={250} data={pokemon.stats}>
                            <XAxis dataKey="stat"/>
                            <YAxis/>
                            <Tooltip/>
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                            <Bar type="monotone" dataKey="value" fill={this.state.color} barSize={50}/>
                        </BarChart>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        let content = this.renderContent()
        return (
            <div style={detailsStyle.container}>
                {content}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let result = { pokemonId: ownProps.params.id }
    if(state.currentPokemon && state.currentPokemon.id == result.pokemonId) {
        result.pokemon = state.currentPokemon
        let storedPokemon = state.pokemonList.filter(p => p.id == result.pokemonId)[0]
        if(storedPokemon && storedPokemon.color) {
            result.color = storedPokemon.color
        }
    }
    return result
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(pokemonActions, dispatch)
    }
}

PokemonDetail.propTypes = {
    pokemon: PropTypes.object,
    color: PropTypes.array,
    pokemonId: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail)