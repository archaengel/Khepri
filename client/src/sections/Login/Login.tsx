import React, { useRef, useEffect } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { Layout, Typography, Button, Spin, Card } from 'antd';
import { LOG_IN } from '../../lib/graphql/mutations';
import { AUTH_URL } from '../../lib/graphql/queries';
import {
  LogIn as LogInData,
  LogInVariables
} from '../../lib/graphql/mutations/LogIn/__generated__/LogIn';
import { AuthUrl as AuthUrlData } from '../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl';
import { Viewer } from '../../lib/types';
import { Redirect } from 'react-router-dom';

const { Content } = Layout;
const { Text, Title } = Typography;

interface Props {
  setViewer: (viewer: Viewer) => void;
}

export const LogIn = ({ setViewer }: Props) => {
  const client = useApolloClient();
  const [
    logIn,
    { data: logInData, loading: logInLoading, error: logInError }
  ] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn && data.logIn.token) {
        setViewer(data.logIn);
        sessionStorage.setItem('token', data.logIn.token);
      }
    }
  });

  const logInRef = useRef(logIn);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      logInRef.current({
        variables: {
          input: { code }
        }
      });
    }
  }, []);

  const handleAuthorize = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({ query: AUTH_URL });
      window.location.href = data.authUrl;
    } catch (error) {}
  };

  if (logInLoading) {
    return (
      <Content className="log-in">
        <Spin size="large" tip="Logging you in..." />
      </Content>
    );
  }

  if (logInData && logInData.logIn) {
    const { id: viewerId } = logInData.logIn;
    return <Redirect to={`/user/${viewerId}`} />;
  }

  return (
    <Content className="log-in">
      <Card className="log-in-card">
        <div className="log-in-card__intro">
          <Title level={3} className="log-in-card__intro-title">
            <span role="img" aria-label="wave">
              👋
            </span>
          </Title>
          <Title level={3} className="log-in-card__intro-title">
            Log in to TradRack!
          </Title>
        </div>
        <Button
          type="primary"
          onClick={handleAuthorize}
          className="log-in-card__google-button"
        >
          <span className="log-in-card__google-button-text">
            Sign in with Google
          </span>
        </Button>
      </Card>
    </Content>
  );
};
