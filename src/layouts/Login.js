import React from 'react';
import { Navigate } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import logo from '../assets/images/logo.svg';

function Login() {
    const { oktaAuth, authState } = useOktaAuth();
    const login = async () => {
        await oktaAuth.signInWithRedirect();
    }

    const onSuccess = function (res) {

        if (res.status === 'SUCCESS') {
            console.log(res.session);

            oktaAuth.signInWithRedirect({
                sessionToken: res.session.token
            });           
        }
    }

    const onError = function (err) {
        console.log('error logging in', err);
    }

    

    return authState && authState.isAuthenticated ? (<div></div>) : (
        <><div className="container-fluid login-class">
            <div className="row no-gutter">
                <div className="col-md-6 bg-light">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 col-xl-7 mx-auto  ">
                                    <div>
                                        <img src={logo} className='login-logo' alt="React Bootstrap logo" />
                                    </div>
                                    <h3 className="display-8">FCM Mobility Data Utility</h3>
                                    <Button type="button" className="btn btn-primary btn-block shadow-lg" onClick={login} size="lg">Login With OKTA</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 d-none d-md-flex bg-image"></div>
            </div>
        </div>
        </>
    )

}

export default Login;
