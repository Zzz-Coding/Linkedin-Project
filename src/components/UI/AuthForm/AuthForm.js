import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '../Input/Input';

import * as actions from '../../../store/actions/index';

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    spinner: {
        marginTop: theme.spacing(5)
    }
}));

const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
        console.log(isValid);
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}

const AuthForm = props => {
    const classes = useStyles();
    const [controls, setControls] = useState({
        email: {
            elementConfig: {
                type: 'email',
                placeholder: 'Email Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            }
        };
        setControls(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, props.value);
    }

    let form = <form className={classes.form} onSubmit={submitHandler}>
        <Input
            elementConfig={controls.email.elementConfig}
            value={controls.email.value}
            shouldValidate={controls.email.validation}
            invalid={!controls.email.valid}
            touched={controls.email.touched}
            changed={event => inputChangedHandler(event, 'email')} />
        <Input
            elementConfig={controls.password.elementConfig}
            value={controls.password.value}
            shouldValidate={controls.password.validation}
            invalid={!controls.password.valid}
            touched={controls.password.touched}
            changed={event => inputChangedHandler(event, 'password')} />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
        >
            {props.value === 0 ? 'Sign In' : 'Sign Up'}
        </Button>
    </form>;

    if (props.loading) {
        form = <CircularProgress className={classes.spinner}/>
    }

    return (
        <div className={classes.paper}>
            {form}
        </div>
        
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
