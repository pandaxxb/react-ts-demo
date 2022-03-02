import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import ImageListItem from '@/components/ImageListItem';
import type { IImage } from '@/global';
import { FolderContext } from './index';
import { Button, Input } from 'antd';

const { Search } = Input;

export default function ImageGalleryContent() {
  const [imageList, setImageList] = useState<IImage[]>([]);

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const searchRef = useRef(null);

  const { selectedFolder } = useContext(FolderContext);

  const filterImageList = useMemo(() => {
    return imageList.filter((image) => {
      return image.name.includes(searchKeyword.trim());
    });
  }, [imageList, searchKeyword]);

  useEffect(() => {
    if (selectedFolder.id !== -1) {
      setImageList(
        Array(Math.ceil(Math.random() * 20) + 5)
          .fill(1)
          .map((e, index) => ({
            url: `https://picsum.photos/200/200?random=${selectedFolder.id}${
              index + 1
            }`,
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

  const handleAdd = () => {
    const newImageList = imageList.slice();
    newImageList.push({
      url: `https://picsum.photos/200/200?random=${selectedFolder.id}${
        newImageList.length + 1
      }`,
      name: `图片${newImageList.length + 1}`,
      type: Math.random() < 0.33 ? 'jpg' : Math.random() < 0.5 ? 'png' : 'jpeg',
    });
    setImageList(newImageList);
    return;
  };

  const handleDelete = (index: number) => {
    const newImageList = imageList.slice();
    newImageList?.splice(index, 1);
    setImageList(newImageList);
  };

  return (
    <>
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
            placeholder="输入名称进行搜索"
            style={{ width: 200, marginRight: 8 }}
            onPressEnter={(e: any) => setSearchKeyword(e.target.value)}
            onSearch={(val) => setSearchKeyword(val)}
            ref={searchRef}
            // onBlur={() => {
            //   if (searchRef && searchRef.current) {
            //     searchRef.current = searchKeyword;
            //   }
            // }}
          />
          <Button type="primary" onClick={handleAdd}>
            上传图片
          </Button>
        </div>
      </div>
      <div style={{ height: 'calc(100vh - 80px)', overflowY: 'auto' }}>
        {filterImageList?.map((image, index) => {
          return (
            <ImageListItem
              key={image.name}
              url={image.url}
              name={image.name}
              type={image.type}
              onDelete={() => handleDelete(index)}
            />
          );
        })}
      </div>
    </>
  );
}
