import React from 'react';
import { useAuth0 } from '../../lib/auth';

export const Profile: React.FC = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img
        src={user.picture}
        alt="profile"
        style={{ borderRadius: '50%', height: '10rem' }}
      />
      <h2>{user.name}</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};
