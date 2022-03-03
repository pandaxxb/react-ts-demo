import React, { useRef } from 'react';
import { Card, Space, Button, Divider } from 'antd';
import type { IImageProps } from '@/global';
import { useDrag, useDrop } from 'react-dnd';
import type { XYCoord, Identifier } from 'dnd-core';

const { Meta } = Card;

interface IDragItem {
  index: number;
  id: string;
  type: string;
}

const ImageListItem: React.FC<IImageProps> = ({
  url,
  name,
  type,
  onDelete,
  index,
  id,
  onMove,
  onEdit,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    IDragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'Card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: IDragItem, monitor) {
      // console.log(ref.current);
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // console.log(clientOffset);

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (
        dragIndex < hoverIndex &&
        hoverClientY < hoverMiddleY &&
        hoverClientX < hoverMiddleX
      ) {
        return;
      }

      // Dragging upwards
      if (
        dragIndex > hoverIndex &&
        hoverClientY > hoverMiddleY &&
        hoverClientX > hoverMiddleX
      ) {
        return;
      }

      // Time to actually perform the action
      onMove(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'Card',
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        display: 'inline-block',
        opacity,
      }}
      data-handler-id={handlerId}
    >
      <Card
        style={{ width: 200 }}
        bordered={false}
        cover={<img alt="image" src={url} />}
      >
        <Meta title={`${name}.${type}`} />
        <Space split={<Divider type="vertical" />}>
          <Button type="link" onClick={onEdit}>
            移动
          </Button>
          <Button type="link" onClick={onDelete}>
            删除
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default ImageListItem;
