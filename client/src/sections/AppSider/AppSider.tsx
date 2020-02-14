import React from 'react';
import { Layout } from 'antd';
import { AppSiderMenuItems } from './components';
import { Viewer } from '../../lib/types';

const { Sider } = Layout;

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const AppSider = ({ viewer, setViewer }: Props) => {
  return (
    <Sider className="app-sider">
      <div className="app-sider__menu-section">
        <AppSiderMenuItems viewer={viewer} setViewer={setViewer} />
      </div>
    </Sider>
  );
};
