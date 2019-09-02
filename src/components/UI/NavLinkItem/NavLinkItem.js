import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    activeLink: {
        borderBottom: '4px solid #fff'
    }
});

const NavLinkItem = props => {
    const classes = useStyles();
    return (
        <NavLink 
            to={props.link} 
            exact={props.exact} 
            activeClassName={classes.activeLink}>
                {props.children}
        </NavLink> 
    )
}

export default NavLinkItem;
