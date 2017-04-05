import React, { PropTypes } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import {Link} from 'react-router';

const gridStyle = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 56
  },
  image: {
    width: '100%',
    imageRendering: 'pixelated'
  },
};

const PokemonList = ({ pokemons }) => {
  return (
    <div style={gridStyle.root}>
      <GridList
        cellHeight={250}
        cols={5}>
          {pokemons.map((tile) => (
              <GridTile
                key={tile.id}
                title={tile.name}
                titleBackground={tile.color && `rgba(${tile.color[0]}, ${tile.color[1]}, ${tile.color[2]}, 0.6)`} >
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
    pokemons: PropTypes.array.isRequired
}

export default PokemonList;
