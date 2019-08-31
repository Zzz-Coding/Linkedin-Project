import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles(theme => ({
    Invalid: {
        backgroundColor: '#FDA49A'
    }
}));

const Input = props => {
    let inputIcon = null;
    switch (props.elementConfig.type) {
        case ('email'): 
            inputIcon = <EmailIcon />;
            break;
        case ('password'):
            inputIcon = <LockIcon />;
            break;
        default:
            inputIcon = null;
    }

    const classes = useStyles();
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    return (
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={props.elementConfig.placeholder}
            name={props.elementConfig.type}
            autoComplete={props.elementConfig.type}
            type={props.elementConfig.type}
            InputProps={{
                endAdornment:
                    <InputAdornment position="end">
                        {inputIcon}
                    </InputAdornment>
            }}
            className={inputClasses.join(' ')}
            value={props.value}
            onChange={props.changed}
        />
    )
}

export default Input;
