import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthURL } from '../axios/AxiosInstance';

import { AuthContext } from '../context/AuthContext';

export default function Logout() {
    const navigate = useNavigate();
    const {authDispatch} = useContext(AuthContext);

    useEffect(()=> {
        localStorage.setItem('accessToken', '');
        localStorage.removeItem('accessToken');
        authDispatch({type: 'reset'});
        navigate('/auth/sign-in');
    }, []);

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
                    <h1 className="atf-page-heading-title">Logout</h1>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}
