import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/features/auth/authSlice';
import { fetchUserProfile } from '../../redux/features/user/userSlice';
import logo from '../../assets/img/argentBankLogo.png';
import './NavBar.scss';

/**
 * Displays the navigation bar with sign-in and sign-out options.
 * 
 * @returns {JSX.Element} The NavBar component.
 */
export default function NavBar() {
    const authToken = useSelector((state) => state.auth.token);
    const storedToken = localStorage.getItem('token');

    let token = authToken || storedToken;
    let tokenExist = !!token;

    const location = useLocation();
    const slug = location.pathname.split("/")[1];
    const dispatch = useDispatch();

    const firstName = useSelector((state) => state.user.firstName);
    
    useEffect(() => {
        if (tokenExist) {
            dispatch(fetchUserProfile());
        }
    }, [dispatch, slug, tokenExist]);

    return (
        <header>
            <nav className="nav">
                <NavLink
                    className='nav__link'
                    to="/">
                    <img className='nav__logo' src={logo} alt="Argent Bank Logo" />
                </NavLink>

                {!tokenExist ? (
                    <NavLink
                        className={`nav__link ${(slug === "sign-in") && "hidden"}`}
                        to="/sign-in">
                        <div className='nav__link__signInBox'>
                            <i className="fa fa-user-circle"></i>
                            <span className='nav__span'> Sign In</span>
                        </div>
                    </NavLink>
                ) : (
                    <div className='nav__link__signOutBox'>
                        <NavLink
                            className='nav__link'
                            to="/user"
                            disabled={slug === "user"}
                            style={slug === "user" ? { pointerEvents: "none", textDecoration: "none" } : {}}
                        >
                            <div className='nav__link__signOutBox__nameWrapper'>
                                <i className="fa fa-user-circle"></i>
                                <span className='nav__span'> {firstName} </span>
                            </div>
                        </NavLink>

                        <NavLink
                            className='nav__link'
                            onClick={() => dispatch(logout())}
                            // to="/sign-in"
                            to="/"
                        >
                            <i className="fa fa-sign-out"></i>
                            <span className='nav__span'>Sign out</span>
                        </NavLink>
                    </div>
                )}
            </nav>
        </header>
    );
}

NavBar.propTypes = {
    authToken: PropTypes.string,
    storedToken: PropTypes.string,
    tokenExist: PropTypes.bool,
    firstName: PropTypes.string,
    slug: PropTypes.string,
};
