import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCardFlip from 'react-card-flip';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import WorkIcon from '@material-ui/icons/Work';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EditIcon from '@material-ui/icons/Edit';
import FacebookIcon from '@material-ui/icons/Facebook';
import DescriptionIcon from '@material-ui/icons/Description';
import EmailIcon from '@material-ui/icons/Email';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { storage, getUserInfoFromDB, saveUserInfoIntoDB, saveSingleUserInfoIntoDB } from '../../firebase/firebase';

const styles = theme => ({
    root: {
        marginTop: theme.spacing(4)
    },
    header: {
        textAlign: "center",
        backgroundColor: "#3f51b5",
        padding: theme.spacing(4),
        color: "#fff"
    },
    content: {
        display: "flex",
        marginLeft: theme.spacing(10),
        marginBottom: theme.spacing(3),
        alignItems: "center"
    },
    textMargin: {
        marginLeft: theme.spacing(5),
    },
    avatar: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        fontSize: theme.spacing(10),
        marginBottom: theme.spacing(2),
        color: "#000"
    },
    grow: {
        flexGrow: 1,
    },
    chip: {
        marginLeft: theme.spacing(5),
        padding: theme.spacing(1),
        fontWeight: 600,
        fontSize: theme.spacing(2)
    },
    imgInput: {
        display: "none"
    },
    imgArea: {
        display: "flex",
        justifyContent: "center"
    },
    imgIcon: {
        color: "#fff"
    },
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: 200
    },
    btnArea: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end"
    },
})

class Profile extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
    }

    state = {
        flipped: false,
        loading: true,
        front: {
            username: '',
            email: '',
            bio: '',
            location: '',
            preferJob: '',
            preferLoc: '',
            avatarUrl: '',
            linkedinUrl: 'https://linkedin.com',
            facebookUrl: 'https://facebook.com'
        },
        back: {
            username: '',
            bio: '',
            location: '',
            preferJob: '',
            preferLoc: '',
            linkedinUrl: 'https://linkedin.com',
            facebookUrl: 'https://facebook.com'
        }

    };

    componentDidMount() {
        this._isMounted = true;
        getUserInfoFromDB(this.props.userId).then(snapshot => {
            let userInfo = snapshot.val();
            if (!("username" in userInfo)) {
                userInfo = { ...userInfo, username: userInfo.email.substring(0, userInfo.email.lastIndexOf('@')) };
            }
            const { email, avatarUrl, ...formInfo } = userInfo;
            if (this._isMounted) {
                this.setState({
                    front: { ...this.state.front, ...userInfo },
                    back: { ...this.state.back, ...formInfo },
                    loading: false
                });
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    cardFlip = () => {
        this.setState(prevState => ({
            flipped: !prevState.flipped
        }));
    }

    linkedinBtnHandler = () => {
        window.open(this.state.front.linkedinUrl);
    }

    facebookBtnHandler = () => {
        window.open(this.state.front.facebookUrl);
    }

    inputImgHandler = (e) => {
        const image = e.target.files[0];
        const uploadTask = storage.ref(`images/${this.props.userId}`).put(image);
        uploadTask.on('state_changed',
            () => {
                // progress...
            },
            error => {
                console.log(error);
            },
            () => {
                // complete
                storage.ref('images').child(this.props.userId).getDownloadURL().then(url => {
                    this.setState({ front: { ...this.state.front, avatarUrl: url } });
                    saveSingleUserInfoIntoDB(this.props.userId, 'avatarUrl', url);
                });
            });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.cardFlip();
        this.setState({ front: { ...this.state.front, ...this.state.back } });
        saveUserInfoIntoDB(this.props.userId, { ...this.state.front, ...this.state.back });
    }

    cancelHandler = () => {
        this.cardFlip();
        const { email, avatarUrl, ...filterFront } = this.state.front;
        this.setState({ back: { ...this.state.back, ...filterFront } });
    }

    formInputChangeHandler = name => event => {
        this.setState({ back: { ...this.state.back, [name]: event.target.value } });
    }

    render() {
        const { classes } = this.props;

        let profile = <CircularProgress />;
        if (!this.state.loading) {
            let avatar = <Avatar alt="avatar" src={this.state.front.avatarUrl} className={classes.avatar} />
            if (this.state.front.avatarUrl === '') {
                avatar = <Avatar className={classes.avatar}>
                    {this.state.front.username[0].toUpperCase()}
                </Avatar>;
            }
            profile = <ReactCardFlip isFlipped={this.state.flipped} infinite>
                <Card key="front">
                    <div className={classes.header}>
                        <div className={classes.imgArea}>
                            {avatar}
                            <input type="file" className={classes.imgInput} id="avatarImg" onChange={this.inputImgHandler} />
                            <label htmlFor="avatarImg">
                                <IconButton component="span" className={classes.imgIcon}>
                                    <CameraAltIcon />
                                </IconButton>
                            </label>
                        </div>

                        <Typography gutterBottom variant="h3" component="h2">
                            {this.state.front.username}
                        </Typography>
                    </div>
                    <CardContent>
                        <div className={classes.content}>
                            <EmailIcon color="primary" />
                            <Typography variant="h5" component="h2" className={classes.textMargin}>
                                {this.state.front.email}
                            </Typography>
                        </div>
                        <div className={classes.content}>
                            <LocationOnIcon color="primary" />
                            <Typography variant="h5" component="h2" className={classes.textMargin}>
                                {this.state.front.location}
                            </Typography>
                        </div>
                        <div className={classes.content}>
                            <DescriptionIcon color="primary" />
                            <Typography variant="h5" component="h2" className={classes.textMargin}>
                                {this.state.front.bio}
                            </Typography>
                        </div>

                        <div className={classes.content}>
                            <FavoriteIcon color="primary" />
                            <Chip icon={<WorkIcon />} label={this.state.front.preferJob} color="secondary" className={classes.chip} />
                            <Chip icon={<LocationOnIcon />} label={this.state.front.preferLoc} color="secondary" className={classes.chip} />
                        </div>

                    </CardContent>
                    <CardActions>
                        <IconButton onClick={this.linkedinBtnHandler}>
                            <LinkedInIcon color="primary" />
                        </IconButton>
                        <IconButton onClick={this.facebookBtnHandler}>
                            <FacebookIcon color="primary" />
                        </IconButton>
                        <div className={classes.grow} />
                        <IconButton onClick={this.cardFlip}>
                            <EditIcon color="primary" />
                        </IconButton>
                    </CardActions>
                </Card>
                <Card key="back">
                    <form className={classes.container} onSubmit={this.submitHandler} onReset={this.cancelHandler}>
                        <TextField
                            id="username"
                            label="Username"
                            className={classes.textField}
                            value={this.state.back.username}
                            onChange={this.formInputChangeHandler("username")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="location"
                            label="Location"
                            className={classes.textField}
                            value={this.state.back.location}
                            onChange={this.formInputChangeHandler("location")}
                            margin="normal"
                            variant="outlined"
                        />
                        
                        <TextField
                            id="preferJob"
                            label="Prefer Job"
                            className={classes.textField}
                            value={this.state.back.preferJob}
                            onChange={this.formInputChangeHandler("preferJob")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="preferLoc"
                            label="Prefer Location"
                            className={classes.textField}
                            value={this.state.back.preferLoc}
                            onChange={this.formInputChangeHandler("preferLoc")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="linkedinUrl"
                            label="Linkedin URL"
                            className={classes.textField}
                            value={this.state.back.linkedinUrl}
                            onChange={this.formInputChangeHandler("linkedinUrl")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="facebookUrl"
                            label="Facebook URL"
                            className={classes.textField}
                            value={this.state.back.facebookUrl}
                            onChange={this.formInputChangeHandler("facebookUrl")}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="bio"
                            label="Bio"
                            multiline
                            rows="4"
                            className={classes.textField}
                            value={this.state.back.bio}
                            onChange={this.formInputChangeHandler("bio")}
                            margin="normal"
                            variant="outlined"
                        />
                        <div className={classes.btnArea}>
                            <IconButton type="submit">
                                <SaveIcon color="primary" />
                            </IconButton>
                            <IconButton type="reset">
                                <CancelIcon color="primary" />
                            </IconButton>
                        </div>

                    </form>
                </Card>
            </ReactCardFlip>
        }

        return (
            <Container maxWidth="sm" className={classes.root}>
                {profile}
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Profile));
