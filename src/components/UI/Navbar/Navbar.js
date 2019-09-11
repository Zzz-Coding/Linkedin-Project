import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NavLinkItem from '../NavLinkItem/NavLinkItem';
import SearchArea from '../SearchArea/SearchArea';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },

    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    iconBtn: {
        color: '#fff'
    },
    navLink: {
        color: '#000'
    }
}));

const Navbar = (props) => {
    const classes = useStyles();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    function handleProfileMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleMobileMenuClose() {
        setMobileMoreAnchorEl(null);
    }

    function handleMenuClose() {
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    function handleMobileMenuOpen(event) {
        setMobileMoreAnchorEl(event.currentTarget);
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <NavLinkItem link="/profile">
                <MenuItem className={classes.navLink} onClick={handleMenuClose}>
                    <IconButton>
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </NavLinkItem>
            <NavLinkItem link="/logout">
                <MenuItem className={classes.navLink} onClick={handleMenuClose}>
                    <IconButton>
                        <ExitToAppIcon />
                    </IconButton>
                    <p>Logout</p>
                </MenuItem>
            </NavLinkItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <NavLinkItem link="/" exact>
                <MenuItem className={classes.navLink}>
                    <IconButton>
                        <LocationOnIcon />
                    </IconButton>
                    <p>Nearby</p>
                </MenuItem>
            </NavLinkItem>

            <NavLinkItem link="/favorite">
                <MenuItem className={classes.navLink}>
                    <IconButton>
                        <FavoriteIcon />
                    </IconButton>
                    <p>Favorite</p>
                </MenuItem>
            </NavLinkItem>
            <NavLinkItem link="/history">
                <MenuItem className={classes.navLink}>
                    <IconButton>
                        <BookmarkIcon />
                    </IconButton>
                    <p>History</p>
                </MenuItem>
            </NavLinkItem>
            <NavLinkItem link="/recommend">
                <MenuItem className={classes.navLink}>
                    <IconButton>
                        <ThumbUpIcon />
                    </IconButton>
                    <p>Recommend</p>
                </MenuItem>
            </NavLinkItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>User</p>
            </MenuItem>

        </Menu>
    );

    let toolBar = (
        <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
                Linkedin
            </Typography>

            <SearchArea />
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
                <NavLinkItem link="/" exact>
                    <IconButton className={classes.iconBtn}>
                        <LocationOnIcon />
                    </IconButton>
                </NavLinkItem>
                <NavLinkItem link="/favorite">
                    <IconButton className={classes.iconBtn}>
                        <FavoriteIcon />
                    </IconButton>
                </NavLinkItem>
                <NavLinkItem link="/history">
                    <IconButton className={classes.iconBtn}>
                        <BookmarkIcon />
                    </IconButton>
                </NavLinkItem>
                <NavLinkItem link="/recommend">
                    <IconButton className={classes.iconBtn}>
                        <ThumbUpIcon />
                    </IconButton>
                </NavLinkItem>
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>

            </div>
            <div className={classes.sectionMobile}>
                <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                >
                    <MoreIcon />
                </IconButton>
            </div>
        </Toolbar>
    );

    if (!props.isAuth) {
        toolBar = (
            <Toolbar>
                <Typography className={classes.title} variant="h6" noWrap>
                    Linkedin
                </Typography>
                <div className={classes.grow} />
                <NavLinkItem link="/auth">
                    <IconButton className={classes.iconBtn}>
                        <PersonAddIcon />
                    </IconButton>
                </NavLinkItem>
            </Toolbar>
        );
    }

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                {toolBar}
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}

export default Navbar;