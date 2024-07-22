import React, { useState } from 'react';
import { sha256 } from 'crypto-hash';
import { AuthURL } from '../axios/AxiosInstance';
import { validatePhoneNumber, isValidEmail } from '../common/CustomFunctions';
import { useNavigate  } from "react-router-dom";


export default function Register() {

  const initialInput = {name: '', email: '', password: '', phone: ''};
  const [input, setInput] = useState(initialInput);
  const [error, setError] = useState({...initialInput, msg: ''});

  const navigate = useNavigate();

  const handleInput = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    let status = true;
    let email = password = phone = '';
    let iname = '';

    if( input.name == '' ) {
      status = false;
      iname = 'Name field is required!';
    }
    if( input.email == '' ) {
      status = false;
      email = 'Email field is required!';
    } else if( !isValidEmail( input.email ) ) {
      status = false;
      email = 'Invaild email ID!';
    }

    if( input.phone == '' ) {
      status = false;
      phone = 'Phone Number field is required!';
    } else if ( !validatePhoneNumber( input.phone ) ) {
      status = false;
      phone = 'Invalid phone number!';
    }

    if( input.password == '' ) {
      status = false;
      password = 'Password field is required!';
    }

    setError({...error, email: email, password: password, name: iname, phone: phone});
    if( status ) {
      const encPassword = await sha256(input.password.toString());
      // console.log(encPassword);
      const registerData = {...input, password : encPassword};
      AuthURL.post('/register.php', registerData)
      .then(function (response) {
        const responseData = response.data;
        // console.log(responseData);

        if( responseData.status == 'error' ) {
          setError({...initialInput, msg: responseData.message});
        } else if( responseData.status == 'success' ) {
          navigate('/auth/sign-in');
        } else {
          setError({...initialInput, msg: 'An error occured!'});
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
              <h1 className="atf-page-heading-title">Sign Up</h1>
            </div>
          </div>
        </div>
      </div>
      <section id="contact" className="atf-contact-area atf-section-padding bg-light" >
      <div className="container" >
        <div className="row align-items-center">
          <div className="col-xl-6 col-12 d-block mx-auto" >
            <div className="contact mt-xl-40" >
              <form id="contact-form" className="atf-contact-form form" method="POST" onSubmit={handleRegister} >
                <div className="row" >
                  <div className="form-group col-md-12" >
                    <input type="text"  name="name" className="form-control" id="name" placeholder="Name"  onChange={handleInput} />
                    <span className="text-danger small">{error.name}</span>
                  </div>
                  <div className="form-group col-md-12" >
                    <input type="email" name="email" className="form-control" id="form_email" placeholder="Your Email"  onChange={handleInput} />
                    <span className="text-danger small">{error.email}</span>
                  </div>
                  <div className="form-group col-md-12" >
                    <input type="text" name="phone" className="form-control" id="phone" placeholder="Phone Number"  onChange={handleInput} />
                    <span className="text-danger small">{error.phone}</span>
                  </div>
                  <div className="form-group col-md-12" >
                    <input type="password" name="password" className="form-control" id="password" placeholder="Password"  onChange={handleInput} />
                    <span className="text-danger small">{error.password}</span>
                  </div>
                  <div className="col-md-12" >
                    <div className="actions text-start" >
                      <button type="submit" value="Sign Up" name="submit" className="atf-themes-btn" title="Sign Up">
                        <span /><span /><span /><span />Sign Up
                      </button>
                      <span className="text-danger small">{error.msg}</span>
                    </div>
                  </div>
                </div>
              </form>
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
