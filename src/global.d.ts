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
  sourceData: IFolder;
  isLeaf: boolean;
}

export interface IFileTreeProps {
  treeData: IFileTree[];
  onSelect: (node: any) => void;
}

export interface IImage {
  url: string;
  name: string;
  type: 'jpg' | 'png' | 'jpeg';
  id: string;
}

export type IImageProps = {
  onDelete: () => void;
  onRename?: () => void;
  index: number;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onEdit: () => void;
} & IImage;

export interface IFolderTree {
  value: number;
  title: string;
  children?: IFileTree[];
}
