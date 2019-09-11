import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import JobCard from '../../components/JobCard/JobCard';
import queryString from 'query-string';
import * as utils from '../../util/utility';

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
    },
    spinner: {
        margin: 'auto'
    }
});

class JobGrid extends Component {
    state = {
        jobs: null,
        loading: true,
        error: false
    };

    componentDidMount() {
        const query = queryString.parse(this.props.location.search);
        if (Object.entries(query).length === 0) {
            this.getNearbyJob();
        } else {
            this.getSearchJob(query);
        }
        
    }

    getNearbyJob = () => {
        // first get geocode using navigator
        utils.getGeoLocation(
        // success cb
        (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            utils.getJobFromLatLng(lat, lng, this.errorCb)
                .then(res => {
                    if (res.length > 0) {
                        this.getJobSuccessCb(res);
                    } else {
                        // if there is no job using lat lng, we get the location
                        utils.getLocationFromGeoCode(lat, lng, this.errorCb)
                            .then(loc => {
                                utils.getJobFromLocation(loc.State, this.errorCb)
                                    .then(jobs => {
                                        if (jobs.length > 0) {
                                            this.getJobSuccessCb(jobs);
                                        } else {
                                            this.errorCb();
                                        }
                                    })
                            })
                    }
                })
        },
        // fail cb 
        () => {
            utils.getLocationFromIP(this.errorCb)
                .then(res => {
                    if ('region' in res) {
                        utils.getJobFromLocation(res.region, this.errorCb)
                            .then(jobs => {
                                if (jobs.length > 0) {
                                    this.getJobSuccessCb(jobs);
                                } else {
                                    this.errorCb();
                                }
                            })
                    } else {
                        this.errorCb();
                    }
                })
        })
    }

    getSearchJob = (query) => {
        utils.getJobFromSearch(query.location, query.description, this.errorCb)
            .then(res => {
                if (res.length > 0) {
                    this.getJobSuccessCb(res);
                } else {
                    this.errorCb();
                }
            })
    }

    getJobSuccessCb = (res) => {
        this.setState({
            jobs: res,
            loading: false
        });
        if (this.props.isAuthenticated) {
            utils.saveJobsIntoDB(res);
        }
    }

    errorCb = () => {
        this.setState({
            loading: false,
            error: true
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
                                id={job.id}
                                type={job.type}
                                url={job.how_to_apply.match(/href="(.*?)"/)[1]}
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
            jobCards = <CircularProgress className={classes.spinner}/>
        } else if (this.state.error) {
            jobCards = <Typography>No Job Found, Please Try Again...</Typography>
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

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(withStyles(styles)(JobGrid));