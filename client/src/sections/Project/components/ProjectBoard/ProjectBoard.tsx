import React, { useState } from 'react';
import {
  Card,
  Icon,
  Button,
  Menu,
  List,
  Layout,
  Typography,
  Divider,
  Col
} from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { WrappedIssueListItem as IssueListItem } from '../IssueListItem';
import { WrappedCreateIssueModal as CreateIssueModal } from '../CreateIssueModal';
import { StringGradients } from 'antd/lib/progress/progress';
import ButtonGroup from 'antd/lib/button/button-group';

const { Title, Text, Paragraph } = Typography;
const { SubMenu } = Menu;
const { Item } = List;

interface Props {
  position: number;
  statuses: string[];
  status: string;
  issues: {
    id: string;
    title: string;
    content: string;
    status: string;
  }[];
  projectId: string;
  handleProjectRefetch: () => Promise<void>;
  handleMoveColumnLeft: (
    target: number,
    source: number,
    status: string
  ) => void;
  handleMoveColumnRight: (
    target: number,
    source: number,
    status: string
  ) => void;
  handleDeleteStatus: (target: number) => void;
}

export const ProjectBoard = ({
  statuses,
  status,
  issues,
  handleProjectRefetch,
  handleMoveColumnLeft,
  handleMoveColumnRight,
  handleDeleteStatus,
  projectId,
  position
}: Props) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const moveLeftButton =
    position !== 0 && position !== 1 && position !== statuses.length - 1 ? (
      <Menu.Item disabled={position === 0} key="moveLeft">
        <div
          onClick={() => handleMoveColumnLeft(position - 1, position, status)}
        >
          <span>
            <Icon type="left" /> Move Left
          </span>
        </div>
      </Menu.Item>
    ) : null;

  const moveRightButton =
    position !== 0 &&
    position !== statuses.length - 2 &&
    position !== statuses.length - 1 ? (
      <Menu.Item disabled={position === statuses.length - 1} key="moveRight">
        <div
          onClick={() => handleMoveColumnRight(position + 1, position, status)}
        >
          <span>
            <Icon type="right" /> Move Right
          </span>
        </div>
      </Menu.Item>
    ) : null;

  const projectBoardHeader = (
    <div className="project-board__list-header">
      <Title level={4} className="project-board__list-header-title">
        {`${status} (${issues.length})`}
        <Menu
          mode="horizontal"
          className="project-board__list-header-menu"
          selectable={false}
        >
          <SubMenu
            title={<Icon type="more" />}
            className="project-board__list-header-submenu"
          >
            {moveLeftButton}
            {moveRightButton}

            <Menu.Item disabled={issues.length > 0} key="delete">
              <div onClick={() => handleDeleteStatus(position)}>
                <span>
                  <Icon type="delete" /> Delete Column
                </span>
              </div>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Title>
      <Button
        className="project-board__list-header-button"
        type="primary"
        onClick={() => setModalVisible(true)}
      >
        <Icon type="plus" />
      </Button>
    </div>
  );

  return (
    <Item>
      <List
        size={'small'}
        split={false}
        className="project-board__list"
        header={projectBoardHeader}
        itemLayout="vertical"
        renderItem={(issue) =>
          issue ? (
            <IssueListItem
              statuses={statuses}
              columnPosition={position}
              handleProjectRefetch={handleProjectRefetch}
              issue={issue}
            />
          ) : null
        }
        dataSource={issues}
      ></List>
      <CreateIssueModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        handleProjectRefetch={handleProjectRefetch}
        projectId={projectId}
        statuses={statuses}
      />
    </Item>
  );
};
