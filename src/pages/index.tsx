import styles from './index.less';
// import { Layout } from 'antd';
import FileTree from '../components/fileTree';
import ImageListItem from '../components/imageListItem';

export default function IndexPage() {
  return (
    <div>
      <FileTree></FileTree>
      <ImageListItem></ImageListItem>
    </div>
  );
}
