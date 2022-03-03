// import React from 'react'
import React, { useState, useMemo, useEffect } from 'react';
import type { IFileTree, IFolder } from '@/global';
import { FolderAddOutlined } from '@ant-design/icons';
import FileTree from '../../components/fileTree';
import { Button, Modal, Input, Form, message } from 'antd';
import { FolderContext } from './index';

export default function ImageGallerySider() {
  const [folders, setFolders] = useState<IFolder[]>([
    {
      id: 11,
      name: '根目录',
      imageCount: 0,
    },
    {
      id: 12,
      name: '图片库1',
      imageCount: 5,
    },
  ]);

  const treeData: IFileTree[] = useMemo(() => {
    const transform: any = (arr: IFolder[]) => {
      return arr.map((folder) => ({
        title: `${folder.name}(${folder.imageCount})`,
        key: folder.id + '',
        isLeaf: false,
        sourceData: {
          id: folder.id,
          name: folder.name,
          imageCount: folder.imageCount,
        },
        children: transform(folder.children ?? []),
      }));
    };
    return transform(folders);
  }, [folders]);

  useEffect(() => {
    localStorage.setItem('folders', JSON.stringify(folders));
  }, [folders]);

  const { selectedFolder, updateSelectedFolder } =
    React.useContext(FolderContext);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [form] = Form.useForm();

  const handleOk = () => {
    const folderName = form.getFieldValue('folderName');
    const newFolders: IFolder[] = folders.slice();
    if (selectedFolder.id === -1) {
      newFolders.push({
        id: folders[folders.length - 1].id + 1,
        name: folderName,
        imageCount: Math.floor(Math.random() * 30),
      });
    } else {
      const traverse = (arr: IFolder[], key: number) => {
        arr.forEach((e) => {
          if (e.id === key) {
            if (e.children === undefined || e.children?.length === 0) {
              e.children = [
                {
                  id: e.id * 100 + 1,
                  name: folderName,
                  imageCount: Math.floor(Math.random() * 30),
                },
              ];
              return;
            } else {
              e.children.push({
                id: e.children[e.children.length - 1].id + 1,
                name: folderName,
                imageCount: Math.floor(Math.random() * 30),
              });
            }
            return;
          }
          if (e.children && e.children.length > 0) {
            traverse(e.children, key);
          }
        });
      };
      traverse(newFolders, selectedFolder.id);
    }
    setFolders(newFolders);
    setIsModalVisible(false);
    message.success('文件夹新建成功');
  };

  const handleAdd = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const renderAddFolderModal = () => {
    return (
      <Modal
        title="新建文件夹"
        visible={isModalVisible}
        onOk={() => form.validateFields().then(() => handleOk())}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form}>
          <Form.Item
            required
            label="文件夹名"
            name="folderName"
            rules={[
              {
                required: true,
                message: '文件夹名不能为空',
              },
            ]}
          >
            <Input maxLength={10}></Input>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <div>
      <Button
        type="default"
        style={{ marginBottom: 16 }}
        icon={<FolderAddOutlined />}
        onClick={handleAdd}
      >
        新建文件夹
      </Button>
      <FileTree treeData={treeData} onSelect={updateSelectedFolder} />
      {renderAddFolderModal()}
    </div>
  );
}
