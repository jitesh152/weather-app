import React, { useState, useContext } from 'react';
import { sha256 } from 'crypto-hash';
import { Link, useNavigate } from 'react-router-dom';
import { isValidEmail } from '../common/CustomFunctions';
import { AuthURL } from '../axios/AxiosInstance';

import { AuthContext } from '../context/AuthContext';

export default function ForgotPassword() {

    const navigate = useNavigate();
    const {authDispatch} = useContext(AuthContext);

    const [input, setInput] = useState({email: ''});
    const [error, setError] = useState({email: '', msg : ''});
    const handleInput = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    }

    const handleReset = (e) => {
        e.preventDefault();
        let status = true;
        if( input.email == '' ) {
            status = false;
            email = 'Email field is required!';
        } else if( !isValidEmail( input.email ) ) {
            status = false;
            email = 'Invalid Email format!';
        }

        setError({...error, email: email});

        if( status ) {
            AuthURL.post('/forgot-password.php', input)
            .then(function (response) {
              //console.log(response);
              const responseData = response.data;
      
              if( responseData.status == 'error' ) {
                setError({email: '', msg: responseData.message});
              } else if( responseData.status == 'success' ) {
                navigate('/auth/sign-in');
              } else {
                setError({email: '', msg: 'An error occured!'});
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
    }

    return (
        <>
            <div className="atf-page-heading atf-size-md"
                style={{
                backgroundImage: "url(assets/img/bg/6.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center center"
                }}      
            >
                <div className="container" >
                <div className="row" >
                    <div className="atf-page-heading-in text-center" >
                    <h1 className="atf-page-heading-title">Forgot Password</h1>
                    </div>
                </div>
                </div>
            </div>

            <section id="" className="atf-contact-area atf-section-padding bg-light" >
                <div className="container" >
                <div className="row align-items-center">
                    <div className="col-xl-5 col-12 d-block mx-auto" >
                    <div className="contact mt-xl-40" >
                        <form id="contact-form" className="atf-contact-form form" method="POST" onSubmit={handleReset} >
                        <div className="row" >
                            <div className="form-group" >
                                <input type="email" name="email" className="form-control" id="form_email" placeholder="Your Email" required="required" value={input.email} onChange={handleInput} />
                                <span className='text-danger small'>{error.email}</span>
                            </div>
                            <div className="col-md-12" >
                                <div className="actions text-start" >
                                    <button type="submit" value="Send Password" name="submit" id="submitButton" className="atf-themes-btn" title="Send Password"
                                    > <span /><span /><span /><span />Send Password
                                    </button>
                                    <span className='text-danger small'>{error.msg}</span>
                                </div>
                            </div>
                        </div>
                        </form>
                        <p className="form-message" />
                    </div>
                    </div>
                    {/* END COL */}
                </div>
                {/*- END ROW */}
                </div>
                {/*- END CONTAINER */}
            </section>
        </>
    )
}
