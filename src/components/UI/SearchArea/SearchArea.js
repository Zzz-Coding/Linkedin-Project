import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import PlacesAutocomplete from 'react-places-autocomplete';
import { withStyles, fade } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { getGeoLocation, getLocationFromGeoCode } from '../../../util/utility';

const styles = theme => ({
    container: {
        display: 'flex'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(2),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        left: 0,
        right: 0
    },
    iconBtn: {
        color: '#fff',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        padding: '5px'
    }
})

class SearchArea extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    state = {
        address: '',
        keyword: ''
    }

    handleChange = address => {
        this.setState({ address });
        //console.log(address);
    };

    handleSelect = address => {
        console.log(address);
        this.setState({ address });
    };

    handleKeyword = e => {
        this.setState({ keyword: e.target.value });
        console.log(e.target.value);
    }

    handleSearchClick = () => {
        const locArr = this.state.address.split(', ');
        let location = '';
        if (locArr.length > 2) {
            location = locArr[1];
        } else {
            location = locArr[0];
        }
        console.log(location);
        console.log(this.state.keyword);
        this.props.history.push(`/search?location=${location}&description=${this.state.keyword}`)
        
    }

    componentDidMount() {
        this._isMounted = true;
        getGeoLocation((pos) => {
            getLocationFromGeoCode(pos.coords.latitude, pos.coords.longitude)
                .then(res => {
                    const address = `${res.City}, ${res.State}, ${res.Country}`;
                    if (this._isMounted) {
                        this.setState({ address });
                    }
                })
        }, 
        err => {
            console.log(err);
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <div className={classes.container}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search Keyword..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={this.handleKeyword}
                        />
                    </div>
                    <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <LocationOnIcon />
                                </div>
                                <InputBase
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                    })}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={this.state.address}
                                />
                                <Paper className={classes.paper} >
                                    {loading && <MenuItem>Loading...</MenuItem>}
                                    {suggestions.map(suggestion => {
                                        return (
                                            <MenuItem
                                                {...getSuggestionItemProps(suggestion)}
                                            >
                                                <Typography>{suggestion.description}</Typography>
                                            </MenuItem>
                                        );
                                    })}
                                </Paper>
                            </div>
                        )}
                    </PlacesAutocomplete>

                </div>
                <IconButton className={classes.iconBtn} onClick={this.handleSearchClick}> 
                    <SearchIcon />
                </IconButton>
            </Fragment>
        );
    }
}

export default withStyles(styles)(withRouter(SearchArea));