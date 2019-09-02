import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import JobCard from '../../components/JobCard/JobCard';
import { database } from '../../firebase/firebase';

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
    state = {
        loading: true,
        jobs: null
    }

    componentDidMount() {
        database.ref('/users/' + this.props.userId + '/' + this.props.type + '/').once('value')
            .then(snapshot => {
                let targetIds = snapshot.val();
                console.log(targetIds);
                return database.ref('/jobs/').once('value')
                        .then(sp => {
                            let storedJobs = sp.val();
                            let updatedJobs = [];
                            for (let id in targetIds) {
                                if (id in storedJobs) {
                                    updatedJobs.push({...storedJobs[id], id: id});
                                }
                            }
                            this.setState({
                                loading: false,
                                jobs: updatedJobs
                            });
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
