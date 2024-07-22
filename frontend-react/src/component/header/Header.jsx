import React, { useState, useEffect, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Header() {

    const [sticky, setSticky] = useState('');
    const { authState } = useContext( AuthContext );

    useEffect(() => {
        const handleScroll = () => {
            if( window.scrollY > 20 ) {
                setSticky('atf-sticky-active');
            } else {
                setSticky('');
            }
        }    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return (
        <>
        <header className={'atf-site-header atf-style1 atf-sticky-header ' + sticky}>
            <div className="atf-main-header">
                <div className="container">
                <div className="atf-main-header-in">
                    <div className="atf-main-header-left">
                    <Link className='atf-site-branding atf-white-logo' to="/">
                        <img src="assets/img/logo.png" alt="Logo" />
                    </Link>
                    </div>
                    <div className="atf-main-header-right">
                    <div className="atf-nav">
                        <ul className="atf-nav-list">
                        <li className="menu-item-has-children">
                            <Link to="/">Home</Link>
                        </li>       
                        {
                            authState.isAuth ? 
                            <>
                            <li className="atf-menu-btn d-none d-lg-block">
                                <Link to="auth/logout" className="atf-themes-btn"><span /><span /><span /><span />Logout</Link>
                            </li>
                            </> 
                            : 
                            <>
                            <li className="atf-menu-btn d-none d-lg-block">
                                <Link to="auth/sign-in" className="atf-themes-btn"><span /><span /><span /><span />Sign In</Link>
                            </li>
                            <li className="atf-menu-btn d-none d-lg-block">
                                <Link to="auth/sign-up" className="atf-themes-btn"><span /><span /><span /><span />Sign Up</Link>
                            </li>
                            </>
                        }                 
                                                
                        </ul>
                        <Outlet />
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </header>
        </>
    )
}
