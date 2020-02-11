import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  WrappedCreateIssueModal as CreateIssueModal,
  WrappedIssueListItem as IssueListItem,
  ProjectBoard
} from './components';
import { PROJECT } from '../../lib/graphql/queries';
import { UPDATE_PROJECT_STATUSES } from '../../lib/graphql/mutations';
import {
  Project as ProjectData,
  ProjectVariables
} from '../../lib/graphql/queries/Project/__generated__/Project';
import {
  UpdateProjectStatuses as UpdateProjectStatusesData,
  UpdateProjectStatusesVariables
} from '../../lib/graphql/mutations/UpdateProjectStatuses/__generated__/UpdateProjectStatuses';
import { useParams } from 'react-router-dom';
import {
  Card,
  Button,
  List,
  Layout,
  Icon,
  Input,
  Col,
  Row,
  Typography
} from 'antd';
import './styles/index.css';

const { Content } = Layout;
const { Title } = Typography;

interface MatchParams {
  id: string;
}

export const Project = () => {
  const { id } = useParams<MatchParams>();
  const [isVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState('');

  const { data, loading: projectLoading, error, refetch } = useQuery<
    ProjectData,
    ProjectVariables
  >(PROJECT, {
    variables: {
      id
    },
    fetchPolicy: 'cache-and-network'
  });

  const [
    updateProjectStatuses,
    { loading: updateProjectStatusesLoading }
  ] = useMutation<UpdateProjectStatusesData, UpdateProjectStatusesVariables>(
    UPDATE_PROJECT_STATUSES,
    {
      onCompleted: () => {
        handleProjectRefetch();
      }
    }
  );

  const projectDetailsElement = data && data.project ? data.project.name : null;
  const issues = data && data.project ? data.project.issues : undefined;
  const statuses = data && data.project ? data.project.statuses : undefined;

  const handleMoveColumnLeft = (
    target: number,
    source: number,
    status: string
  ) => {
    if (target === 0) {
      return;
    }

    if (!statuses) {
      throw new Error('cannot find project statuses');
    }

    let statusesResult = [...statuses];

    statusesResult.splice(source, 1);
    statusesResult.splice(target, 0, status);

    updateProjectStatuses({
      variables: {
        input: {
          projectId: id,
          statuses: statusesResult
        }
      }
    });
  };

  const handleMoveColumnRight = (
    target: number,
    source: number,
    status: string
  ) => {
    if (!statuses) {
      throw new Error('cannot find project statuses');
    }

    if (target === statuses.length - 1) {
      return;
    }

    let statusesResult = [...statuses];

    statusesResult.splice(source, 1);
    statusesResult.splice(target, 0, status);

    updateProjectStatuses({
      variables: {
        input: {
          projectId: id,
          statuses: statusesResult
        }
      }
    });
  };

  const handleProjectRefetch = async () => {
    await refetch();
  };

  const handleCreateStatus = (status: string) => {
    if (!statuses) {
      throw new Error('cannot find project statuses');
    }

    let statusesResult = [...statuses];

    statusesResult.splice(statuses.length - 1, 0, status);

    updateProjectStatuses({
      variables: {
        input: {
          projectId: id,
          statuses: statusesResult
        }
      }
    });
  };

  const handleDeleteStatus = (target: number) => {
    if (!statuses) {
      throw new Error('cannot find project statuses');
    }

    let statusesResult = [...statuses];

    statusesResult.splice(target, 1);

    updateProjectStatuses({
      variables: {
        input: {
          projectId: id,
          statuses: statusesResult
        }
      }
    });
  };

  const createStatusElement = (
    <Col xs={24} md={12} lg={8} xl={6}>
      <div className="project__status-input">
        <Input
          placeholder="Create new status..."
          onPressEnter={(evt: any) => handleCreateStatus(evt.target.value)}
        />
      </div>
    </Col>
  );

  return (
    <Content className="project-content">
      <Title level={2}>
        <Icon type="container" /> {projectDetailsElement}
      </Title>
      {/* <List
        grid={{}}
        footer={
          <Button
            type="primary"
            style={{ width: '100%' }}
            onClick={() => setModalVisible(true)}
          >
            <Icon type="plus"></Icon>
          </Button>
        }
        itemLayout="horizontal"
        dataSource={
          statuses ? statuses.concat(['one', 'two', 'one', 'two']) : statuses
        }
        renderItem={(status) =>
          // issue ? (
          //   <IssueListItem
          //     handleProjectRefetch={handleProjectRefetch}
          //     issue={issue}
          //   />
          status ? <ProjectBoard status={status} id={id} /> : null
        }
      ></List> */}
      <Row gutter={50}>
        {statuses && issues
          ? statuses
              .map((status, i) => {
                return (
                  <Col xs={24} md={12} lg={8} xl={6}>
                    <ProjectBoard
                      statuses={statuses}
                      key={status}
                      position={i}
                      status={status}
                      issues={issues.filter((issue) => issue.status === status)}
                      handleProjectRefetch={handleProjectRefetch}
                      handleMoveColumnLeft={handleMoveColumnLeft}
                      handleMoveColumnRight={handleMoveColumnRight}
                      handleDeleteStatus={handleDeleteStatus}
                      projectId={id}
                    />
                  </Col>
                );
              })
              .concat(createStatusElement)
          : null}
      </Row>
    </Content>
  );
};
