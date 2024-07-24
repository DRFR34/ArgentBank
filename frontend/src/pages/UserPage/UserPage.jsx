import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../redux/features/user/userSlice';
import './UserPage.scss';
import ChangeNameForm from '../../components/ChangeNameForm/ChangeNameForm';
import NotConnected from '../../components/NotConnected/NotConnected';
import AccountOverview from '../../components/AccountOverview/AccountOverview';

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
    <main className="main bg-dark">
      {!token
        ? (
            <NotConnected/>
        )
        : (
          <>            
            <div className="header">
              <h1>Welcome back<br />{user.firstName} {user.lastName} !</h1>
              <br />
              
              <ChangeNameForm/>

            </div>
            <h2 className="sr-only">Accounts</h2>

            <AccountOverview 
            acctType="Checking" 
            acctNumber="8349" 
            acctAmount= "2,082.79" 
            />
            <AccountOverview 
            acctType="Savings" 
            acctNumber="6712" 
            
            acctAmount="10,928.42" 
            />

            <AccountOverview 
            acctType="Credit Card" 
            acctNumber="8349" 
            acctAmount="184,30" 
            />

           
          </>
        )}
    </main>
  )
}
