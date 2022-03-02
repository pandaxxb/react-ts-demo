import React from 'react';
import { Card, Space, Button, Divider } from 'antd';
import type { IImageProps } from '@/global';

const { Meta } = Card;

const ImageListItem: React.FC<IImageProps> = ({
  url,
  name,
  type,
  onDelete,
}) => {
  return (
    <Card
      style={{ width: 200 }}
      bordered={false}
      cover={<img alt="image" src={url} />}
    >
      <Meta title={`${name}.${type}`} />
      <Space split={<Divider type="vertical" />}>
        <Button type="link">重命名</Button>
        <Button type="link" onClick={onDelete}>
          删除
        </Button>
      </Space>
    </Card>
  );
};

export default ImageListItem;
