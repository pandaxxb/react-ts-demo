import React, { useState } from 'react';
import { Layout } from 'antd';
import ImageGallerySider from './sider';
import ImageGalleryContent from './content';
import type { IFolder } from '@/global';

const { Sider, Content } = Layout;

export const FolderContext = React.createContext({
  selectedFolder: {
    id: -1,
    name: '',
    imageCount: 0,
  },
  updateSelectedFolder: (node: any) => {
    console.log(node);
  },
});

export default function ImageGallery() {
  const [selectedFolder, setSelectedFolder] = useState<IFolder>({
    id: -1,
    name: '',
    imageCount: 0,
  });

  const updateSelectedFolder = (node: any) => {
    setSelectedFolder(node.sourceData);
  };
  return (
    <div>
      <FolderContext.Provider
        value={{
          selectedFolder,
          updateSelectedFolder,
        }}
      >
        <Layout
          style={{
            height: '100vh',
            backgroundColor: '#fff',
            padding: '16px 0 16px 16px',
          }}
        >
          <Sider style={{ backgroundColor: 'transparent', marginRight: 16 }}>
            <ImageGallerySider />
          </Sider>
          <Content>
            <ImageGalleryContent />
          </Content>
        </Layout>
      </FolderContext.Provider>
    </div>
  );
}
