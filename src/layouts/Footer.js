import React from 'react';
import '../assets/styles/App.css';
import { useOktaAuth } from '@okta/okta-react';

export default function Footer() {


  const { oktaAuth, authState } = useOktaAuth();
  const login = async () => { await oktaAuth.signInWithRedirect(); }
  const logout = async () => { await oktaAuth.signOut(); }

  return (
    authState?.isAuthenticated ?
      (<>
        <footer className='d-flex flex-wrap justify-content-between align-items-center'>
          <div className='col-md-4 d-flex align-items-center'>
          <span className='text-muted'>©  {new Date().getFullYear()}  <a style={{color:'#00BCD4'}}>S&P Global Inc </a>, All Rights Reserved.</span>
          </div>
        </footer>
      </>) : (<div>  </div>)
  );
}

