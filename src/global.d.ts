export interface IFolder {
  name: string;
  imageCount: number;
  id: number;
  children?: IFolder[];
}

export interface IFileTree {
  title: string;
  key: string;
  children?: IFileTree[];
  isLeaf: boolean;
}

export interface IFileTreeProps {
  treeData: IFileTree[];
  onSelect: (key: string) => void;
}
