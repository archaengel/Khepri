import React, { useEffect } from 'react';
import { useAuth0 } from '../../lib/auth';
import { Route } from 'react-router-dom';

interface Props {
  component: React.FC;
  path: string;
  exact?: boolean;
}

export const PrivateRoute: React.FC<Props> = ({
  component: Component,
  path,
  ...rest
}: Props) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }

    const fn = async () => {
      try {
        await loginWithRedirect({
          appState: { targetUrl: path }
        });
      } catch (e) {
        console.error(e.message);
      }
    };

    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  const render = (props: any) =>
    isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};
