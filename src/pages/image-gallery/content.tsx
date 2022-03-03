import {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';
import ImageListItem from '@/components/ImageListItem';
import type { IFolder, IFolderTree, IImage } from '@/global';
import { FolderContext } from './index';
import { Button, Input, Modal, Form, TreeSelect, message } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';

const { Search } = Input;

export default function ImageGalleryContent() {
  const [imageList, setImageList] = useState<IImage[]>([]);

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const searchRef = useRef<any>();
  const imageUploadRef = useRef<any>();

  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [folderTreeData, setFolderTreeData] = useState<IFolderTree[]>();
  const [editImageIndex, setEditImageIndex] = useState<number>();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isEditModalVisible) {
      const transform: any = (folders: IFolder[]) => {
        return folders.map((folder) => ({
          value: folder.id,
          title: folder.name,
          children: transform(folder.children || []),
        }));
      };
      setFolderTreeData(
        transform(JSON.parse(localStorage.getItem('folders') || '')),
      );
    }
  }, [isEditModalVisible]);

  const renderEditModal = () => {
    return (
      <Modal
        title='移动图片'
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={handleImageEdit}
      >
        <Form form={form}>
          <Form.Item required label='目标文件夹' name='targetFolder'>
            <TreeSelect
              // value={selectedFolder.id}
              treeData={folderTreeData}
            ></TreeSelect>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const { selectedFolder } = useContext(FolderContext);

  const filterImageList = useMemo(() => {
    return imageList
      .map((image: IImage, index: number) => ({
        ...image,
        index,
      }))
      .filter((image) => {
        return image.name.includes(searchKeyword.trim());
      });
  }, [imageList, searchKeyword]);

  useEffect(() => {
    if (selectedFolder.id !== -1) {
      form.setFieldsValue({
        targetFolder: selectedFolder.id,
      });
      setImageList(
        Array(Math.ceil(Math.random() * 20) + 5)
          .fill(1)
          .map((e, index) => ({
            url: `https://picsum.photos/200/200?random=${selectedFolder.id}${
              index + 1
            }`,
            id: `${selectedFolder.id}${index + 1}`,
            name: `图片${index + 1}`,
            type:
              Math.random() < 0.33
                ? 'jpg'
                : Math.random() < 0.5
                ? 'png'
                : 'jpeg',
          })),
      );
    }
  }, [selectedFolder]);

  const handleUpload = () => {
    imageUploadRef.current.click();
  };

  const handleAdd = (e: any) => {
    const newImageList = imageList.slice();
    const files = e.target.files;
    files.forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImageList.push({
          url: (e.target?.result as string) || '',
          id: `${selectedFolder.id}${newImageList.length + 1}`,
          name: `图片${newImageList.length + 1}`,
          type: file.type,
        });
        setImageList(newImageList);
      };
      reader.readAsDataURL(file);
    });
  };

  const renderImageItem = useCallback((image) => {
    return (
      <ImageListItem
        key={image.id}
        url={image.url}
        name={image.name}
        type={image.type}
        id={image.id}
        index={image.index}
        onMove={handleMove}
        onEdit={() => handleEdit(image.index)}
        onDelete={() => handleDelete(image.index)}
      />
    );
  }, []);

  const handleDelete = (index: number) => {
    const newImageList = imageList.slice();
    newImageList?.splice(index, 1);
    setImageList(newImageList);
  };

  const handleMove = useCallback((dragIndex: number, hoverIndex: number) => {
    setImageList((prevImageList: IImage[]) =>
      update(prevImageList, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevImageList[dragIndex] as IImage],
        ],
      }),
    );
  }, []);

  const handleEdit = useCallback((index: number) => {
    setEditImageIndex(index);
    setIsEditModalVisible(true);
  }, []);

  const handleImageEdit = () => {
    if (form.getFieldValue('targetFolder') !== selectedFolder.id) {
      handleDelete(editImageIndex ?? -1);
      message.success('图片移动成功');
    }
    setIsEditModalVisible(false);
  };

  return (
    <>
      <input
        type='file'
        accept='.jpg, .jpeg, .png'
        ref={imageUploadRef}
        style={{ display: 'none' }}
        onChange={handleAdd}
      ></input>
      <div
        style={{
          marginBottom: 16,
          height: 32,
          fontSize: 18,
          fontWeight: 'bold',
        }}
      >
        {selectedFolder.name}
        <div
          style={{
            float: 'right',
            marginRight: 20,
          }}
        >
          <Search
            allowClear
            placeholder='输入名称进行搜索'
            style={{ width: 200, marginRight: 8 }}
            onPressEnter={(e: any) => setSearchKeyword(e.target.value)}
            onSearch={(val) => setSearchKeyword(val)}
            ref={searchRef}
            onBlur={() => {
              if (searchRef && searchRef.current) {
                searchRef.current.state.value = searchKeyword;
              }
            }}
          />
          <Button
            type='primary'
            onClick={handleUpload}
            disabled={selectedFolder.id === -1}
          >
            上传图片
          </Button>
        </div>
      </div>
      <DndProvider backend={HTML5Backend}>
        <div style={{ height: 'calc(100vh - 80px)', overflowY: 'auto' }}>
          {filterImageList.map((image) => renderImageItem(image))}
        </div>
      </DndProvider>
      {renderEditModal()}
    </>
  );
}
