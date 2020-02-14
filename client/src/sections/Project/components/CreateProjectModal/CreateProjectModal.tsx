import React, { FormEvent } from 'react';
import { Input, Form, Modal, Typography, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const { Title, Text } = Typography;
const { Item } = Form;

interface Props {
  viewerId: string | null;
  isModalVisible: boolean;
  setModalVisible: (isVisible: boolean) => void;
}

export const CreateProjectModal = ({
  viewerId,
  isModalVisible,
  setModalVisible,
  form
}: Props & FormComponentProps) => {
  const { getFieldDecorator } = form;
  const handleCreateProject = async (evt: FormEvent): Promise<void> => {
    evt.preventDefault();

    form.validateFields((err, values) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log({
        ...values,
        lead: viewerId
      });
      setModalVisible(false);
      form.resetFields();
    });
  };

  return (
    <Modal
      footer={null}
      visible={isModalVisible}
      onCancel={() => setModalVisible(false)}
    >
      <Form
        className="create-project-modal__form"
        layout="vertical"
        onSubmit={handleCreateProject}
      >
        <div className="create-project-modal__form-header">
          <Title level={3} className="create-project-modal__form-title">
            Let's make you a shiny new project.
          </Title>
          <Text type="secondary">
            Help us out with some information on your new project.
          </Text>
        </div>

        <Item label="Name" extra="Max character count of 45">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please provide a name for your project.'
              }
            ]
          })(<Input placeholder="tradRack.io" />)}
        </Item>

        <Item>
          <Button type="primary" htmlType="submit">
            Create Project
          </Button>
        </Item>
      </Form>
    </Modal>
  );
};

export const WrappedCreateProjectModal = Form.create<
  Props & FormComponentProps
>({
  name: 'project_form'
})(CreateProjectModal);
