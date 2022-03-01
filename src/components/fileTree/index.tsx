import React from 'react';
import { Tree } from 'antd';

const { DirectoryTree } = Tree;
const treeData = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
];

const FileTree: React.FC<{}> = () => {

  return (
    <DirectoryTree
      blockNode={false}
      treeData={treeData}
    >
    </DirectoryTree>
  )
}

export default FileTree;