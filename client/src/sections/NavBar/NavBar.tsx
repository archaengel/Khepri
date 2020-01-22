import React from 'react';
import { useAuth0 } from '../../lib/auth';
import { Link } from 'react-router-dom';

export const NavBar: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <button
          onClick={() =>
            loginWithRedirect({ appState: { targetUrl: '/profile' } })
          }
        >
          Log in
        </button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

      {isAuthenticated && (
        <span>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
        </span>
      )}
    </div>
  );
};
