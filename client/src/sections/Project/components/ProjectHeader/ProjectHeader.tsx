import React, { useState } from 'react';
import { Button, Icon, Menu, Layout, Typography } from 'antd';
import { WrappedCreateProjectModal as CreateProjectModal } from '../CreateProjectModal';

const { Header } = Layout;
const { Title } = Typography;

interface Props {
  viewerId: string | null;
  title: string | null;
}

export const ProjectHeader = ({ viewerId, title }: Props) => {
  const [isModalVisible, setModalVisible] = useState(true);
  return (
    <Header className="project-header">
      <CreateProjectModal
        viewerId={viewerId}
        setModalVisible={setModalVisible}
        isModalVisible={isModalVisible}
      />
      <Title className="project-header__title" level={2}>
        {title}
      </Title>
      <div className="project-header__menu-section">
        <Menu mode="horizontal" className="project-header__menu">
          <Menu.Item>
            <Button onClick={() => setModalVisible(true)}>
              <span>
                <Icon type="plus" style={{ margin: 0 }} /> New
              </span>
            </Button>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};
