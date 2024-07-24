import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, toggleSaveToken } from '../../redux/features/auth/authSlice';
import './SignInForm.scss';

/**
 * Form used for the user authentication.
 * 
 * @returns {JSX.Element} The SignInForm component.
 */
export default function SignInForm() {
    const dispatch = useDispatch();
    const navTo = useNavigate();

    const authStatus = useSelector((state) => state.auth.status);
    const authError = useSelector((state) => state.auth.error);
    const rememberUser = useSelector((state) => state.auth.rememberUser);
    const token = useSelector((state) => state.auth.token);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /**
     * Handles the form submission for signing in.
     * 
     * @param {Object} e - The event object.
     */
    const submitSigninForm = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    useEffect(() => {
        if (authStatus === 'succeeded') {
            navTo('/user');
            rememberUser
                ? localStorage.setItem("token", token)
                : localStorage.removeItem("token");
        }
    }, [authStatus, authError, token, rememberUser, navTo]);

    return (
        <section className="sign-in-content ab">
            <div className="sign-in-header">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
            </div>
            <form onSubmit={submitSigninForm}>
                <div className="input-wrapper">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="employee@test.tld"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-remember">
                    <input
                        className='input-remember_checkbox'
                        type="checkbox"
                        id="remember-me"
                        checked={rememberUser || false}  // control the field to ensure it's never undefined
                        onChange={() => dispatch(toggleSaveToken())}
                    />
                    <label
                        htmlFor="remember-me"
                        style={{ color: (authStatus === 'loading') || !email || !password ? 'grey' : 'black' }}
                    >
                        Remember me
                    </label>
                </div>
                <button
                    type="submit"
                    className="sign-in-button"
                    disabled={(authStatus === 'loading') || !email || !password}
                >
                    Sign In
                </button>
                <div className='auth-status'>
                    {authStatus === 'loading' && <p>Loading...</p>}
                    {authStatus === 'succeeded' && <p>Connected</p>}
                    {authError && <p className='errorMsg'>{authError}</p>}
                </div>
            </form>
        </section>
    );
}

SignInForm.propTypes = {
    authStatus: PropTypes.string,
    authError: PropTypes.string,
    rememberUser: PropTypes.bool,
    token: PropTypes.string,
};
