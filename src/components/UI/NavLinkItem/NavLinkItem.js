import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    navLink: {
        color: '#fff'
    }
});

const NavLinkItem = props => {
    const classes = useStyles();
    return (
        <NavLink className={classes.navLink} to={props.link} exact={props.exact}>
            {props.children}
        </NavLink> 
    )
}

export default NavLinkItem;
