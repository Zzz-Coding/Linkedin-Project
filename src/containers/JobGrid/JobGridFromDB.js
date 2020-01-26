import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import JobCard from '../../components/JobCard/JobCard';
import { getUserJobsFromDB } from '../../firebase/firebase';

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

class JobGridFromDB extends Component {
    constructor(props) {
        super(props);
        // used to cancel async calls
        this._isMounted = false;
    }

    state = {
        loading: true,
        jobs: null,
        error: false
    }

    componentDidMount() {
        this._isMounted = true;
        getUserJobsFromDB(this.props.userId, this.props.type)
            .then(snapshot => {
                let updatedJobs = [];
                if (snapshot.val()) {
                    for (let [id, job] of Object.entries(snapshot.val())) {
                        updatedJobs.push({...job, id});
                    }
                    if (this._isMounted) {
                        this.setState({
                            loading: false,
                            jobs: updatedJobs
                        });
                    }
                } else {
                    if (this._isMounted) {
                        this.setState({
                            loading: false,
                            error: true
                        });
                    }
                }
                
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
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
            jobCards = <CircularProgress className={classes.spinner}/>
        } else if (this.state.error) {
            jobCards = <Typography>No {this.props.type} jobs Found, Please go to nearby...</Typography>
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

JobGridFromDB.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    };
};

export default connect(mapStateToProps)(withStyles(styles)(JobGridFromDB));
