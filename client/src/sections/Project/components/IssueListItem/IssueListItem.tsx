import React, { useState, FormEvent } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  Card,
  List,
  Form,
  Row,
  Col,
  Icon,
  Input,
  Button,
  Tooltip,
  Tag
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { UPDATE_ISSUE } from '../../../../lib/graphql/mutations';
import { DELETE_ISSUE } from '../../../../lib/graphql/mutations/DeleteIssue';
import {
  UpdateIssue as UpdateIssueData,
  UpdateIssueVariables
} from '../../../../lib/graphql/mutations/UpdateIssue/__generated__/UpdateIssue';
import {
  DeleteIssue as DeleteIssueData,
  DeleteIssueVariables
} from '../../../../lib/graphql/mutations/DeleteIssue/__generated__/DeleteIssue';
import Column from 'antd/lib/table/Column';

const { Item } = List;

interface Props {
  handleProjectRefetch: () => Promise<void>;
  issue: {
    title: string;
    content: string;
    id: string;
    status: string;
  };
  columnPosition: number;
  statuses: string[];
}

export const IssueListItem = ({
  handleProjectRefetch,
  columnPosition,
  issue,
  statuses,
  form
}: Props & FormComponentProps) => {
  const { getFieldDecorator } = form;
  const { title, status, content, id } = issue;
  const [isEditingTitle, setEditingTitle] = useState(false);
  const [isEditingDescription, setEditingDescription] = useState(false);
  const isCompleted = columnPosition === statuses.length - 1;
  const [updateIssue, { loading: updateIssueLoading }] = useMutation<
    UpdateIssueData,
    UpdateIssueVariables
  >(UPDATE_ISSUE, {
    onCompleted: () => {
      setEditingDescription(false);
      setEditingTitle(false);
      form.resetFields();
      handleProjectRefetch();
    }
  });

  const [deleteIssue, { loading: deleteIssueLoading }] = useMutation<
    DeleteIssueData,
    DeleteIssueVariables
  >(DELETE_ISSUE, {
    onCompleted: () => {
      setEditingDescription(false);
      setEditingTitle(false);
      handleProjectRefetch();
    }
  });

  const handleDeleteIssue = () => {
    deleteIssue({
      variables: {
        input: {
          id
        }
      }
    });
  };

  const handleUpdateIssue = (evt: FormEvent) => {
    evt.preventDefault();

    form.validateFields((err, values) => {
      if (err) {
        console.log(err);
        return;
      }

      updateIssue({
        variables: {
          input: {
            ...values,
            id,
            status
          }
        }
      });
    });
  };

  const handleMoveLeft = () => {
    if (columnPosition === 0) {
      return;
    }

    form.validateFields((err, values) => {
      if (err) {
        console.error(err);
      }

      updateIssue({
        variables: {
          input: {
            ...values,
            id,
            status: statuses[columnPosition - 1]
          }
        }
      });
    });
  };

  const handleMoveRight = () => {
    if (columnPosition === statuses.length - 1) {
      return;
    }

    form.validateFields((err, values) => {
      if (err) {
        console.error(err);
      }

      updateIssue({
        variables: {
          input: {
            ...values,
            id,
            status: statuses[columnPosition + 1]
          }
        }
      });
    });
  };

  const titleInputForm = (
    <div style={{ lineHeight: '40px' }}>
      <Icon type="check-circle" theme={isCompleted ? 'twoTone' : 'outlined'} />{' '}
      <Form
        layout="inline"
        style={{ display: 'inline' }}
        onSubmit={handleUpdateIssue}
      >
        <Form.Item style={{ marginTop: '0' }}>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please include a title' }],
            initialValue: title
          })(<Input size="small" maxLength={45} />)}
        </Form.Item>
        <Form.Item>
          <Button.Group size="small">
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button onClick={() => setEditingTitle(false)}>Cancel</Button>
          </Button.Group>
        </Form.Item>
      </Form>
    </div>
  );

  const descriptionInputForm = (
    <div>
      <Form layout="horizontal" onSubmit={handleUpdateIssue}>
        <Form.Item>
          {getFieldDecorator('content', {
            rules: [
              { required: true, message: 'Please include a description' }
            ],
            initialValue: content
          })(<Input.TextArea />)}
        </Form.Item>
        <Form.Item>
          <Button.Group size="small">
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button onClick={() => setEditingDescription(false)}>Cancel</Button>
          </Button.Group>
        </Form.Item>
      </Form>
    </div>
  );

  const cardTitleElement = isEditingTitle ? (
    titleInputForm
  ) : (
    <Tooltip title="click to edit" placement="left">
      <div onClick={() => setEditingTitle(true)} style={{ lineHeight: '40px' }}>
        <Icon
          type="check-circle"
          theme={isCompleted ? 'twoTone' : 'outlined'}
        />{' '}
        <span>{title}</span>
      </div>
    </Tooltip>
  );

  const cardDescriptionElement = isEditingDescription ? (
    descriptionInputForm
  ) : (
    <Tooltip title="click to edit" placement="left">
      <div onClick={() => setEditingDescription(true)}>{content}</div>
    </Tooltip>
  );

  const deleteIssueButton = (
    <div onClick={handleDeleteIssue}>
      <Icon type="delete" />
    </div>
  );

  const moveLeftButton =
    columnPosition !== 0 ? (
      <div onClick={handleMoveLeft}>
        <Icon type="left" />
      </div>
    ) : null;

  const moveRightButton =
    columnPosition !== statuses.length - 1 ? (
      <div onClick={handleMoveRight}>
        <Icon type="right" />
      </div>
    ) : null;

  return (
    <Item>
      <Card
        bordered={false}
        actions={[moveLeftButton, deleteIssueButton, moveRightButton]}
      >
        <Card.Meta
          title={cardTitleElement}
          description={cardDescriptionElement}
        />
        <Tag>{issue.status}</Tag>
      </Card>
    </Item>
  );
};

export const WrappedIssueListItem = Form.create<Props & FormComponentProps>({
  name: 'issue_update_form'
})(IssueListItem);
