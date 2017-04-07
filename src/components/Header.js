import React, { Component, PropTypes } from 'react'
import { IndexLink } from 'react-router'
import { connect } from 'react-redux'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui/svg-icons/action/search'
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import TextField from 'material-ui/TextField'
import LinearProgress from 'material-ui/LinearProgress'
import DebounceInput from 'react-debounce-input'
import { setSearchString } from '../actions/metadataActions'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searching: false
        }
        this.setSearchString = props.setSearchString

        this.headerStyle = {
            backgroundColor: 'rgba(232, 232, 232, 0.8)',
            backdropFilter: 'blur(10px)'
        }
    }

    toggleSearch = () => {
        this.setState({searching: !this.state.searching})
    }

    onChange = event => {
        this.setSearchString(event.target.value)
    }
 
    render() {
        let location = this.props.location
        return (
            <div>
                <Toolbar id="toolbar" style={this.headerStyle}>
                    <ToolbarGroup>
                        {location == 'details' && (
                            <ToolbarGroup>
                                <IndexLink to="/">
                                    <IconButton>
                                        <NavigationChevronLeft/>
                                    </IconButton>
                                </IndexLink>
                                <ToolbarSeparator />
                            </ToolbarGroup>)}

                        <IndexLink to="/">
                            <ToolbarTitle id="app-title" text="PokéApp" />
                        </IndexLink>

                        {location == 'list' &&
                            (
                                <ToolbarGroup>
                                    <ToolbarSeparator />
                                    <IconButton>
                                        <SearchIcon onClick={this.toggleSearch}/>
                                    </IconButton>
                                    {
                                        this.state.searching &&
                                        <DebounceInput
                                            autoFocus
                                            element={TextField}
                                            id={'searchInput'}
                                            hintText={'Search'}
                                            minLength={2}
                                            debounceTimeout={300}
                                            onChange={this.onChange}
                                            />}
                                </ToolbarGroup>
                            )}
                    </ToolbarGroup> 
                </Toolbar>
                {this.props.loading && <LinearProgress id="progress-bar" mode="indeterminate" />}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        location: ownProps.location,
        loading: state.ajaxCallsInProgress > 0
    }
}

const mapDispatchToProps = dispatch => {
  return {
    setSearchString: searchString => {
      dispatch(setSearchString(searchString))
    }
  }
}

Header.propTypes = {
    location: PropTypes.string.isRequired,
    setSearchString: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)