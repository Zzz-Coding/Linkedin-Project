import React, {useState} from 'react';
import { connect } from 'react-redux';
import PlacesAutocomplete from 'react-places-autocomplete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { saveSingleUserInfoIntoDB } from '../../../firebase/firebase';
import CustomSnackbar from '../../UI/Snackbar/CustomSnackbar';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        zIndex: 1,
        left: 0,
        right: 0
    },
}));

const PreferenceForm = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [address, setAddress] = useState('');
    const [jobKeyword, setJobKeyword] = useState('');
    const [error, setError] = useState(false);

    let errorMessage = null;
    if (error) {
        errorMessage = <CustomSnackbar message='Please fill in your preference' />;
    }
    const handleClose = () => {
        if (address === '' || jobKeyword === '') {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 2000);
        } else {
            setOpen(false);
            const loc = address.split(', ')[1];
            console.log('location', loc);
            console.log('keyword', jobKeyword);
            saveSingleUserInfoIntoDB(props.userId, 'preferJob', jobKeyword);
            saveSingleUserInfoIntoDB(props.userId, 'preferLoc', loc);
        }
        
    }

    const handleChange = address => {
        setAddress(address);
    };

    const handleSelect = address => {
        setAddress(address);
    };

    const inputChange = (event) => {
        setJobKeyword(event.target.value);
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Please input your preference for finding jobs"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Your preference is important to us!
                </DialogContentText>
                {errorMessage}
                <TextField
                    autoFocus
                    margin="dense"
                    id="job"
                    label="Job Preference(any keywords about job)"
                    fullWidth
                    variant="outlined"
                    value={jobKeyword}
                    onChange={inputChange}
                />
                <PlacesAutocomplete
                    value={address}
                    onChange={handleChange}
                    onSelect={handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <TextField
                                margin="dense"
                                label="Preferece Working Location"
                                {...getInputProps({
                                    placeholder: 'Preferece Working Location',
                                })}
                                fullWidth
                                variant="outlined"
                                value={address}
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(PreferenceForm);