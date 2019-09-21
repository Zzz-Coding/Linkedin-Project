import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { getUserSingleJobFromDB, saveUserJobsIntoDB, deleteUserJobsFromDB } from '../../firebase/firebase';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 500,
    },
    tune: {
        marginTop: theme.spacing(2)
    },
    cardactions: {
        justifyContent: 'flex-end'
    },
    jobtype: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    img: {
        maxWidth: '100%',
        height: 'auto',
        marginTop: theme.spacing(2)
    }
}));

const JobCard = props => {
    const classes = useStyles();

    const cardClickHandler = () => {
        window.open(props.url);
    }

    const [favorite, setFavorite] = useState(false);
    const [applied, setApplied] = useState(false);
    // const [state, setState] = useState({
    //     favorite: false,
    //     applied: false
    // });

    // use this to avoid useEffect be called at first render
    const didMountRef = useRef(false);

    const favoriteToggleHandler = () => {
        setFavorite(!favorite);
    }

    const appliedToggleHandler = () => {
        setApplied(!applied);
    }

    const setInitialState = () => {
        getUserSingleJobFromDB(props.userId, 'favorite', props.id)
            .then(snapshot => {
                if (snapshot.val()) {
                    setFavorite(true);
                }
            });
            
        getUserSingleJobFromDB(props.userId, 'history', props.id)
            .then(snapshot => {
                if (snapshot.val()) {
                    setApplied(true);
                }
            });
    }

    useEffect(() => {
        if (didMountRef.current) {
            console.log('componetDidUpdate');
            const timer = setTimeout(() => {
                if (favorite) {
                    saveUserJobsIntoDB(props.userId, 'favorite', {
                        id: props.id,
                        type: props.type,
                        url: props.url,
                        created_at: props.createdAt,
                        company: props.company,
                        location: props.location,
                        title: props.title,
                        description: props.description,
                        company_logo: props.companyLogo
                    });
                } else {
                    deleteUserJobsFromDB(props.userId, 'favorite', props.id);
                }

                if (applied) {
                    saveUserJobsIntoDB(props.userId, 'history', {
                        id: props.id,
                        type: props.type,
                        url: props.url,
                        created_at: props.createdAt,
                        company: props.company,
                        location: props.location,
                        title: props.title,
                        description: props.description,
                        company_logo: props.companyLogo
                    });
                } else {
                    deleteUserJobsFromDB(props.userId, 'history', props.id);
                }
            }, 500);
            // debounce
            // in 1s if state.favorite change many times, the function
            // will only be called once
            // the return function will be called when useEffect is re-called
            return () => {
                clearTimeout(timer);
            };
        } else {
            console.log('componentDidMount');
            setInitialState();
            didMountRef.current = true;
        }
        
    }, [favorite, applied]);

    return (
        <Card className={classes.card}>
            <CardActionArea onClick={cardClickHandler}>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <img src={props.companyLogo} alt={props.company} className={classes.img} />
                    </Grid>
                    <Grid item xs={9}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {props.title}
                            </Typography>
                            <Typography variant="subtitle2" component="h2" className={classes.jobtype}>
                                {props.type}
                            </Typography>
                            <Typography variant="h6" component="h2">
                                {props.company}
                            </Typography>
                            <Typography variant="subtitle1" component="h2">
                                {props.location}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {props.description.substring(0, 200) + '...'}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" component="p" className={classes.tune}>
                                {props.createdAt}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </CardActionArea>
            {props.isAuthenticated && <CardActions className={classes.cardactions}>
                <IconButton color="secondary" onClick={favoriteToggleHandler}>
                    {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <IconButton color="primary" onClick={appliedToggleHandler}>
                    {applied ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
            </CardActions>}
        </Card>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userId: state.auth.userId
    };
};

export default connect(mapStateToProps)(JobCard);