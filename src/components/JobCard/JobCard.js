import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HistoryIcon from '@material-ui/icons/History';

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

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <img src={props.companyLogo} alt={props.company} className={classes.img}/>
                    </Grid>
                    <Grid item xs={9}>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="h2">
                                {props.title}
                            </Typography>
                            <Typography variant="subtitle2" component="h2" className={classes.jobtype}>
                                {props.type}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {props.company}
                            </Typography>
                            <Typography variant="subtitle1" component="h2">
                                {props.location}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {props.description.replace(/<[^>]+>/g,"").substring(0, 200) + '...'}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" component="p" className={classes.tune}>
                                {props.createdAt}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </CardActionArea>
            <CardActions className={classes.cardactions}>
                <IconButton color="inherit">
                    <FavoriteIcon />
                </IconButton>
                <IconButton color="inherit">
                    <HistoryIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default JobCard;