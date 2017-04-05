import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import DebounceInput from 'react-debounce-input'
import { setSearchString } from '../actions/metadataActions'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searching: false
        }
        this.style = {
            toolbar: {
                top: 0,
                left: 0,
                width: '100%',
                height: 70,
                position: 'fixed',
                backgroundColor: 'rgba(232, 232, 232, 0.8)',
                zIndex: 10,
                backdropFilter: 'blur(10px)'
            }
        }
        this.setSearchString = props.setSearchString
    }

    toggleSearch = () => {
        this.setState({searching: !this.state.searching})
    }

    onChange = event => {
        this.setSearchString(event.target.value)
    }
 
    render() {

        return (
            <Toolbar style={this.style.toolbar}>
                <ToolbarGroup>
                    <ToolbarTitle text="PokéApp" />
                    <ToolbarSeparator />
                    <IconButton>
                        <SearchIcon onClick={this.toggleSearch}/>
                    </IconButton>
                    {
                        this.state.searching &&
                        <DebounceInput
                            element={TextField}
                            id={'searchInput'}
                            style={this.style.searchInput}
                            hintText={'Search'}
                            minLength={2}
                            debounceTimeout={300}
                            onChange={this.onChange}
                            />
                    }
                </ToolbarGroup> 
            </Toolbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        ajaxCallsInProgress: state.ajaxCallsInProgress
    }
}

const mapDispatchToProps = dispatch => {
  return {
    setSearchString: searchString => {
      dispatch(setSearchString(searchString))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)