import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import JobCard from '../../components/JobCard/JobCard';
import { getRecommendJobs } from '../../util/utility';

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

class JobRecommend extends Component {
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
        getRecommendJobs(this.props.userId, this.errorCb)
            .then(res => {
                console.log(res);
                if (this._isMounted) {
                    this.setState({
                        loading: false,
                        jobs: res
                    });
                }
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    errorCb = () => {
        if (this._isMounted) {
            this.setState({
                loading: false,
                error: true
            });
        }
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
                                url={job.how_to_apply.match(/href="(.*?)"/) ? job.how_to_apply.match(/href="(.*?)"/)[1] : job.url}
                                createdAt={job.created_at}
                                company={job.company}
                                location={job.location}
                                title={job.title}
                                description={job.description.replace(/<[^>]+>/g, "")}
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
            jobCards = <Typography>No Recommendation Found, Please Try Again...</Typography>
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

JobRecommend.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    };
};

export default connect(mapStateToProps)(withStyles(styles)(JobRecommend));