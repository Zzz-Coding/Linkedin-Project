import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import JobCard from '../../components/JobCard/JobCard';
import axios from '../../axios-orders';

const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

class JobGrid extends Component {
    state = {
        jobs: null,
        loading: true,
        error: false
    };

    componentDidMount() {
       this.getGeoLocation();  
    }

    getJobFromLatAndLong = (loc) => {
        axios.get(`positions.json?lat=${loc.lat}&long=${loc.long}`)
            .then(res => {
                // we may get [] when using lat and long
                if (res.data.length > 0) {
                    this.setState({
                        jobs: res.data,
                        loading: false
                    })
                } else {
                    console.log('no job found using lat and long, so using region');
                    this.getLocationFromIP();
                }
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    error: true
                })
            });
    }

    getJobFromRegion = (region) => {
        axios.get(`positions.json?location=${region}`)
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        jobs: res.data,
                        loading: false
                    });
                } else {
                    console.log('no job found in this area');
                }
                
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    error: true
                })
            });
    }

    getGeoLocation = () => {
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                (pos) => {
                    this.getJobFromLatAndLong({
                        lat: pos.coords.latitude,
                        long: pos.coords.longitude
                    })
                },
                () => {
                    this.getLocationFromIP();
                }
            )
        } else {
            this.getLocationFromIP();
        }
    };
    
    // if we get location from ip, we just use the region to get jobs
    getLocationFromIP = () => {
        axios.get('https://ipapi.co/json')
            .then(res => {
                console.log(res.data);
                if ('region' in res.data) {
                    const region = res.data.region.replace(/ /g, '+');
                    this.getJobFromRegion(region);
                } else {
                    this.setState({
                        error: true, 
                        loading: false
                    });
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    error: true, 
                    loading: false
                });
            });
    }

    render() {
        const { classes } = this.props;
        let jobCards = null;
        if (this.state.jobs) {
            jobCards = this.state.jobs.map(job => {
                return (
                    <Grid key={job.id} item xs={12} md={6} lg={4}>
                        <div className={classes.paper}>
                            <JobCard
                                type={job.type}
                                url={job.url}
                                createdAt={job.created_at}
                                company={job.company}
                                location={job.location}
                                title={job.title}
                                description={job.description}
                                companyLogo={job.company_logo}
                            />
                        </div>
                    </Grid>
                );
            });
        }
        
        if (this.state.loading) {
            jobCards = <CircularProgress />
        }
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {jobCards}
                </Grid>
            </div>
        );
    }
}

JobGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobGrid);