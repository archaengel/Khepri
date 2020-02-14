import React from 'react';
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

interface Props {
  title: string | null;
}

export const ProjectHeader = ({ title }: Props) => {
  return (
    <Header className="project-header">
      <Title level={2}>{title}</Title>
    </Header>
  );
};
