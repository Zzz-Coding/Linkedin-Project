import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { amber } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles(theme => ({
    warning: {
        backgroundColor: amber[700],
        margin: theme.spacing(1),
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

const CustomSnackbar = (props) => {
    const classes = useStyles();
    const { message } = props;

    const [open, setOpen] = React.useState(true);

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    return (
        <Snackbar 
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center'
            }}
            autoHideDuration={2000}
            open={open}
            onClose={handleClose}
        >
            <SnackbarContent
                className={classes.warning}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        <WarningIcon className={classes.iconVariant} />
                        {message}
                    </span>
                }
                action={[
                    <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
            />
        </Snackbar>
    );
}

export default CustomSnackbar;