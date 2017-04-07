import React, { Component, PropTypes } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header'

class App extends Component {
    render() {
        let location
        if(this.props.location.pathname === '/') {
            location = 'list'
        } else {
            location = 'details'
        }
        return (
            <MuiThemeProvider>
                <div>
                    <Header location={location}/>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        )
    }
}

App.propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object.isRequired
}

export default App