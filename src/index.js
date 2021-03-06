import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import Root from './components/Root'

import configureStore from './store/configureStore'
import { loadInitialPokemon } from './actions/pokemonActions'

import './styles/general.scss'
import { syncHistoryWithStore } from 'react-router-redux'

import injectTapEventPlugin from 'react-tap-event-plugin'

const store = configureStore()
store.dispatch(loadInitialPokemon())
const history = syncHistoryWithStore(browserHistory, store)

injectTapEventPlugin()
render(
    <AppContainer>
        <Root store={store} history={history} />
    </AppContainer>,
  document.getElementById('app')   
)

if (module.hot) {
    module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}