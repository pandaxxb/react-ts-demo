import { Layout } from 'antd';
import ImageGallerySider from './sider';

const { Sider, Content } = Layout;

export default function ImageGallery() {
  return (
    <div>
      <Layout
        style={{
          height: 'calc(100vh - 32px)',
          backgroundColor: '#fff',
          margin: 16,
        }}
      >
        <Sider style={{ backgroundColor: 'transparent' }}>
          <ImageGallerySider />
        </Sider>
        <Content />
      </Layout>
    </div>
  );
}
