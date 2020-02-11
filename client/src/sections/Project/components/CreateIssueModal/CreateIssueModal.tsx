import React, { FormEvent } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { FormComponentProps } from 'antd/lib/form';
import { Modal, Typography, Form, Input, Button, Select } from 'antd';
import { CREATE_ISSUE } from '../../../../lib/graphql/mutations';
import {
  CreateIssue as CreateIssueData,
  CreateIssueVariables
} from '../../../../lib/graphql/mutations/CreateIssue/__generated__/CreateIssue';
import './styles/index.css';

const { Item } = Form;
const { Title, Text } = Typography;

interface Props {
  statuses: string[];
  projectId: string;
  isModalVisible: boolean;
  setModalVisible: (isVisible: boolean) => void;
  handleProjectRefetch: () => Promise<void>;
}

export const CreateIssueModal = ({
  statuses,
  handleProjectRefetch,
  setModalVisible,
  isModalVisible,
  projectId,
  form
}: Props & FormComponentProps) => {
  const { getFieldDecorator } = form;
  const [createIssue, { loading, data }] = useMutation<
    CreateIssueData,
    CreateIssueVariables
  >(CREATE_ISSUE, {
    onCompleted: () => {
      setModalVisible(false);
      handleProjectRefetch();
    }
  });
  const handleCreateIssue = async (evt: FormEvent) => {
    evt.preventDefault();

    form.validateFields((err, values) => {
      if (err) {
        console.log(err);
        return;
      }

      const input = {
        ...values,
        projectId
      };

      createIssue({
        variables: {
          input
        }
      });
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };
  return (
    <Modal
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <Form layout="vertical" onSubmit={handleCreateIssue}>
        <div className="create-issue-modal__form-header">
          <Title level={3} className="create-issue-modal__form-title">
            Let's create an issue
          </Title>
          <Text type="secondary">Give us more information on your issue</Text>
        </div>

        <Item label="Title" extra="Max character count of 45">
          {getFieldDecorator('title', {
            rules: [
              { required: true, message: 'Please give your issue a title' }
            ],
            initialValue: ''
          })(<Input maxLength={45} placeholder="User Story: ..." />)}
        </Item>

        <Item label="Description" extra="Max character count of 400">
          {getFieldDecorator('content', {
            rules: [
              {
                required: true,
                message: 'Please give your issue a description'
              }
            ],
            initialValue: ''
          })(
            <Input.TextArea
              placeholder="As TradRack user, I can..."
              maxLength={400}
            />
          )}
        </Item>

        <Item label="Status">
          {getFieldDecorator('status', {
            rules: [
              { required: true, message: 'Please give your issue a status' }
            ],
            initialValue: statuses[0]
          })(
            <Select>
              {statuses.map((status) => (
                <Select.Option key={status}>{status}</Select.Option>
              ))}
            </Select>
          )}
        </Item>

        <Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Item>
      </Form>
    </Modal>
  );
};

export const WrappedCreateIssueModal = Form.create<Props & FormComponentProps>({
  name: 'issue_form'
})(CreateIssueModal);
