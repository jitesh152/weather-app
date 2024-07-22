import React, { useState, useContext } from 'react';
import { sha256 } from 'crypto-hash';
import { Link, useNavigate } from 'react-router-dom';
import { isValidEmail } from '../common/CustomFunctions';
import { AuthURL } from '../axios/AxiosInstance';

import { AuthContext } from '../context/AuthContext';

export default function Login() {

  const navigate = useNavigate();
  const {authDispatch} = useContext(AuthContext);

  const [input, setInput] = useState({email: '', password: ''});
  const [error, setError] = useState({email: '', password: '', msg : ''});
  const handleInput = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    let status = true;
    let email = password = '';
    if( input.email == '' ) {
      status = false;
      email = 'Email field is required!';
    } else if( !isValidEmail( input.email ) ) {
      status = false;
      email = 'Invalid Email format!';
    }
    if( input.password == '' ) {
      status = false;
      password = 'Password field is required!';
    }

    setError({...error, email: email, password: password});
    if( status ) {
      const encPassword = await sha256(input.password.toString());
      const registerData = {...input, password : encPassword};

      AuthURL.post('/login.php', registerData)
      .then(function (response) {
        //console.log(response);
        const responseData = response.data;

        if( responseData.status == 'error' ) {
          setError({email: '', password: '', msg: responseData.message});
        } else if( responseData.status == 'success' ) {
          authDispatch({type: 'update', payload:{ userdata: responseData, isAuth: true }});
          localStorage.setItem('accessToken', responseData.token);
          navigate('/user/dashboard');
        } else {
          setError({email: '', password: '', msg: 'An error occured!'});
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
              <h1 className="atf-page-heading-title">Sign In</h1>
            </div>
          </div>
        </div>
      </div>

      <section id="" className="atf-contact-area atf-section-padding bg-light" >
        <div className="container" >
          <div className="row align-items-center">
            <div className="col-xl-5 col-12 d-block mx-auto" >
              <div className="contact mt-xl-40" >
                <form id="contact-form" className="atf-contact-form form" method="POST" onSubmit={handleLogin} >
                  <div className="row" >
                    <div className="form-group" >
                      <input type="email" name="email" className="form-control" id="form_email" placeholder="Your Email" required="required" value={input.email} onChange={handleInput} />
                      <span className='text-danger small'>{error.email}</span>
                    </div>
                    <div className="form-group" >
                      <input type="password" name="password" className="form-control" id="password" placeholder="********" required="required" value={input.password} onChange={handleInput} />
                      <span className='text-danger small'>{error.password}</span>
                    </div>
                    <div className="col-md-12" >
                      <div className="actions text-start" >
                        <button type="submit" value="Sign In" name="submit" id="submitButton" className="atf-themes-btn" title="Sign In"
                        > <span /><span /><span /><span />Sign In
                        </button>
                        <span className='text-danger small'>{error.msg}</span>
                      </div>
                      <p style={{textAlign:'center'}}><Link to="/auth/forgot-password">Forgot Password</Link></p>
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
