import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/UI/Navbar/Navbar';

const Layout = props => {
    return (
        <Fragment>
            <Navbar isAuth={props.isAuthenticated} />
            <main>
                {props.children}
            </main>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);