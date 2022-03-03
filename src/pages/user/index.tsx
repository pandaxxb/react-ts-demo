import { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import {
  Table,
  Space,
  Button,
  Form,
  Modal,
  Input,
  Select,
  message,
} from 'antd';
import { IUser } from '@/global';

export default function UserIndex() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<IUser>();

  const renderModal = () => {
    return (
      <Modal
        title={!editUser ? '新增用户' : '编辑用户'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() =>
          form.validateFields().then((res) => {
            handleSaveUser(res);
          })
        }
      >
        <Form
          form={form}
          autoComplete='off'
          labelCol={{
            style: {
              width: 100,
            },
          }}
        >
          <Form.Item hidden name='id'>
            <Input></Input>
          </Form.Item>
          <Form.Item
            label='用户姓名'
            required
            name='name'
            rules={[
              {
                required: true,
                message: '用户姓名不能为空',
              },
            ]}
          >
            <Input maxLength={10}></Input>
          </Form.Item>
          <Form.Item
            label='手机号码'
            required
            name='phone'
            rules={[
              {
                required: true,
                message: '手机号码不能为空',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号码格式错误',
              },
            ]}
          >
            <Input minLength={11} maxLength={11} type='number'></Input>
          </Form.Item>
          <Form.Item
            label='权限'
            required
            name='roleId'
            rules={[
              {
                required: true,
                message: '请选择用户权限',
              },
            ]}
          >
            <Select
              options={[
                {
                  label: '管理员',
                  value: 1,
                },
                {
                  label: '普通用户',
                  value: 2,
                },
              ]}
            ></Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const handleAdd = () => {
    setEditUser(undefined);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleSaveUser = (formInfo: any) => {
    const userList = tableData.slice();
    if (formInfo.id) {
      const index = userList.findIndex((user) => user.id === formInfo.id);
      userList[index] = {
        ...formInfo,
        roleDesc: formInfo.roleId === 1 ? '管理员' : '普通员工',
      };
      message.success('编辑用户成功');
    } else {
      userList.push({
        ...formInfo,
        roleDesc: formInfo.roleId === 1 ? '管理员' : '普通员工',
        id: userList.length + 1,
      });
      message.success('新建用户成功');
    }
    setTableData(userList);
    setIsModalVisible(false);
  };

  const handleEdit = (user: IUser) => {
    setEditUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDelete = (index: number) => {
    const userList = tableData.slice();
    userList.splice(index, 1);
    setTableData(userList);
  };

  const dataSource: IUser[] = Array(35)
    .fill(1)
    .map((_, index) => {
      const random = Math.random();
      return {
        id: index + 1,
        name: `用户${index + 1}`,
        phone: `132456787${Math.floor(random * 89) + 10}`,
        roleId: random > 0.5 ? 1 : 2,
        roleDesc: random > 0.5 ? '管理员' : '普通用户',
      };
    });

  const [tableData, setTableData] = useState<IUser[]>(dataSource);

  const columns: ColumnsType<IUser> = [
    {
      title: '用户ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      ellipsis: true,
    },
    {
      title: '用户姓名',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      ellipsis: true,
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
      width: 200,
      ellipsis: true,
    },
    {
      title: '权限',
      dataIndex: 'roleDesc',
      key: 'roleDesc',
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (_: any, record: any, index) => (
        <Space size='middle'>
          <a key='edit' onClick={() => handleEdit(record)}>
            编辑
          </a>
          <a key='delete' onClick={() => handleDelete(index)}>
            删除
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: 16,
      }}
    >
      <Button
        type='primary'
        style={{
          marginBottom: 16,
        }}
        onClick={handleAdd}
      >
        新增用户
      </Button>
      {renderModal()}
      <Table
        rowKey='id'
        bordered
        dataSource={tableData}
        columns={columns}
        scroll={{
          y: `calc(100vh - 200px)`,
        }}
        pagination={{
          position: ['bottomCenter'],
          showTotal: (total) => `共${total}条`,
          defaultPageSize: 20,
          defaultCurrent: 1,
          showSizeChanger: true,
        }}
      ></Table>
    </div>
  );
}
