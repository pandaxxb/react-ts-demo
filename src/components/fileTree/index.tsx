// import React, { useEffect, useState } from 'react';
import { Tree } from 'antd';
import type { IFileTreeProps } from '@/global';
import React from 'react';

const { DirectoryTree } = Tree;

const FileTree: React.FC<IFileTreeProps> = ({ treeData, onSelect }) => {
  return (
    <DirectoryTree
      // blockNode={false}
      treeData={treeData}
      onSelect={(keys: React.Key[], e: any) => onSelect(e.node)}
    />
  );
};

export default FileTree;
