import React, { Fragment } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { LOG_OUT } from '../../../../lib/graphql/mutations';
import { PROJECTS_BY_LEAD } from '../../../../lib/graphql/queries';
import { LogOut as LogOutData } from '../../../../lib/graphql/mutations/LogOut/__generated__/LogOut';
import {
  ProjectsByLead as ProjectsByLeadData,
  ProjectsByLeadVariables
} from '../../../../lib/graphql/queries/ProjectsByLead/__generated__/ProjectsByLead';
import { Link } from 'react-router-dom';
import { Avatar, Menu, Icon, Button } from 'antd';
import { Viewer } from '../../../../lib/types';

const { ItemGroup, Item, SubMenu } = Menu;

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const AppSiderMenuItems = ({ viewer, setViewer }: Props) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: (data) => {
      if (data && data.logOut) {
        setViewer(data.logOut);
        sessionStorage.removeItem('token');
      }
    }
  });

  // const {} = useQuery<ProjectsByLeadData, ProjectsByLeadVariables>(
  //   PROJECTS_BY_LEAD,
  //   {
  //     variables: {
  //       leadId: viewer.id
  //     }
  //   }
  // );

  const handleLogOut = () => {
    logOut();
  };

  const subMenuLogin =
    viewer.id && viewer.avatar ? (
      <SubMenu title={<Avatar size={16} src={viewer.avatar} />}>
        <Item key="logout">
          <div onClick={handleLogOut}>
            <Icon type="logout" />
            <span>LogOut</span>
          </div>
        </Item>
      </SubMenu>
    ) : (
      <Item key="/login">
        <Link to="/login">
          <Button type="primary">Sign In</Button>
        </Link>
      </Item>
    );

  const projectList =
    viewer && viewer.projects && viewer.projects.length !== 0
      ? viewer.projects
      : null;

  const subMenuProjects =
    viewer && viewer.id ? (
      <SubMenu
        title={
          <span>
            <Icon type="project" /> <span>Projects</span>
          </span>
        }
      >
        {projectList
          ? projectList.map((project) =>
              project ? (
                <Item key={`project.name`}>
                  <Link to={`/project/${project.id}`}>{project.name}</Link>
                </Item>
              ) : null
            )
          : null}
      </SubMenu>
    ) : null;
  return (
    <Menu mode="inline" theme="dark">
      {subMenuLogin}
      {subMenuProjects}
    </Menu>
  );
};
