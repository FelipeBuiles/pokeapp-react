import React, { PropTypes } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {Link} from 'react-router';

const gridStyle = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  image: {
    width: '100%',
    imageRendering: 'pixelated'
  },
};

const PokemonList = (props) => {
  let pokemons = props.pokemons.pokemons // wtf why
  return (
    <div style={gridStyle.root}>
      <GridList
        cellHeight={250}
        cols={5}>
          {pokemons.map((tile) => (
              <GridTile
                key={tile.id}
                title={tile.name}
              >
                <Link to={`/pokemon/${tile.id}`}>
                  <img 
                    src={tile.img} 
                    style={gridStyle.image}  />
                </Link>
              </GridTile>
            ))}
      </GridList>
    </div>
  );
};

PokemonList.propTypes = {
    pokemons: PropTypes.object.isRequired
}

export default PokemonList;
