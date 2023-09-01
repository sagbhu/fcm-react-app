import { useOktaAuth } from '@okta/okta-react';
import { Navigate  } from 'react-router-dom';
import { Switch, Route, Redirect } from "react-router-dom";

// export default function PrivateRoute({ children }) {
//     const { oktaAuth, authState } =  useOktaAuth();

//     return authState?.isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
//   }
  
 
  export default function PrivateRoute({ children }) {
    const { authState } =  useOktaAuth();
    return authState ? (authState?.isAuthenticated ? <>{children}</> : <Navigate to="/login" />) : <></>;
  }