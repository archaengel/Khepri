import React from 'react';

export const Login: React.FC = () => {
  return (
    <>
      <form action="">
        <label htmlFor="email">
          Email:
          <input type="email" />
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" />
        </label>
      </form>
    </>
  );
};
