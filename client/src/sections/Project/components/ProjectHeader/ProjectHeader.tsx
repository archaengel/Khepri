import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_PROJECT } from '../../../../lib/graphql/mutations';
import {
  DeleteProject as DeleteProjectData,
  DeleteProjectVariables
} from '../../../../lib/graphql/mutations/DeleteProject/__generated__/DeleteProject';
import { Button, Icon, Menu, Layout, Typography } from 'antd';
import { WrappedCreateProjectModal as CreateProjectModal } from '../CreateProjectModal';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Redirect } from 'react-router-dom';

const { Header } = Layout;
const { Title } = Typography;

interface Props {
  projectId: string;
  viewerId: string | null;
  title: string | null;
}

export const ProjectHeader = ({ projectId, viewerId, title }: Props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [deleteProject, { data }] = useMutation<
    DeleteProjectData,
    DeleteProjectVariables
  >(DELETE_PROJECT, {
    onError: (error) => {
      alert(`sorry, but: ${error}`);
    }
  });
  const handleDeleteProject = async () => {
    deleteProject({
      variables: {
        input: {
          id: projectId
        }
      }
    });
  };

  if (data && data.deleteProject.id && viewerId) {
    return <Redirect to={`/user/${viewerId}`} />;
  }
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
        <Menu
          selectable={false}
          mode="horizontal"
          className="project-header__menu"
        >
          <Menu.Item>
            <Button onClick={() => setModalVisible(true)}>
              <span>
                <Icon type="plus" style={{ margin: 0 }} /> New
              </span>
            </Button>
          </Menu.Item>
          <SubMenu title={<Icon type="more" />}>
            <Menu.Item>
              <Button type="danger" onClick={handleDeleteProject}>
                <Icon type="delete" /> <span>Delete Project</span>
              </Button>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </Header>
  );
};
