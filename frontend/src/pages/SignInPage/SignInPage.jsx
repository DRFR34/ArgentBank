import React from 'react';
import SignInForm from '../../components/SignInForm/SignInForm';
import './SignInPage.scss';

/**
 * Renders the SignInPage component.
 *
 * @return {JSX.Element} The rendered SignInPage component.
 */
export default function SignInPage() {
  

  return (
    <main className="main bg-dark">
     
        <SignInForm />
      
    </main>
  );
}
