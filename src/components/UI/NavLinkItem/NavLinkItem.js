import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    activeLink: {
        borderBottom: '4px solid #fff'
    }
})

class NavLinkItem extends Component {
    render() {
        const { classes } = this.props;
        return (
            <NavLink 
                to={this.props.link} 
                exact={this.props.exact} 
                activeClassName={classes.activeLink}>
                    {this.props.children}
            </NavLink> 
        )
    }
    
}

export default withStyles(styles)(NavLinkItem);
