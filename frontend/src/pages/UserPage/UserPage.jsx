import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../redux/features/user/userSlice';
import './UserPage.scss';
import ChangeNameForm from '../../components/ChangeNameForm/ChangeNameForm';
import NotConnected from '../../components/NotConnected/NotConnected';
import AccountOverview from '../../components/AccountOverview/AccountOverview';
import PropTypes from 'prop-types';

/**
 * Displays the user's profile information and his accounts overviews.
 * 
 * @returns {JSX.Element} The UserPage component.
 */
export default function UserPage() {
  const stokedToken = localStorage.getItem('token');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const authToken = useSelector((state) => state.auth.token);
  let token = stokedToken || authToken;

  useEffect(() => {
    if (token) {
        dispatch(fetchUserProfile(token));
    }
  }, [token, dispatch]);

  return (
    <main className="mainUserPg">
      {!token ? (
        <NotConnected />
      ) : (
        <>            
          <div className="header">
            <h1>Welcome back<br />{user.firstName} {user.lastName} !</h1>
            <br />
            <ChangeNameForm />
          </div>
          <h2 className="sr-only">Accounts</h2>
          <AccountOverview 
            acctType="Checking" 
            acctNumber={8349} 
            acctAmount={2082.79} 
          />
          <AccountOverview 
            acctType="Savings" 
            acctNumber={6712} 
            acctAmount={10928.42} 
          />
          <AccountOverview 
            acctType="Credit Card" 
            acctNumber={8349} 
            acctAmount={184.30} 
          />
        </>
      )}
    </main>
  );
}

UserPage.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  authToken: PropTypes.string,
  stokedToken: PropTypes.string,
  token: PropTypes.string,
};
