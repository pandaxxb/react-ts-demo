import React from 'react';
import { Card, Space, Button, Divider } from 'antd';

const { Meta } = Card;

const ImageWrapper: React.FC<{}> = () => {
  return (
    <Card
      style={{ width: 200 }}
      bordered={false}
      cover={
        <img
          alt='image'
          src='https://picsum.photos/200/200?random=1g'
        ></img>
      }
    >
      <Meta
        title='image 1'
      ></Meta>
      <Space split={<Divider type='vertical'></Divider>}>
        <Button type='link'>重命名</Button>
        <Button type='link'>删除</Button>
      </Space>
    </Card>
  )
}

export default ImageWrapper