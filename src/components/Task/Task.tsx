import { ForwardedRef, forwardRef } from "react";
import "./Task.css";

export type TaskProps = {
  id: number;
  title: string;
  body: string;
  laneId: number;
  onDragStart?: (
    event: React.DragEvent,
    params: { laneId: number; id: number }
  ) => void;
  draggingStatus?: boolean;
  onDragEnter?: (
    event: React.DragEvent,
    params: { laneId: number; id: number }
  ) => void;
};

const Task = forwardRef(function (
  {
    id,
    title,
    body,
    laneId,
    onDragStart,
    draggingStatus,
    onDragEnter,
  }: TaskProps,
  dragItem: ForwardedRef<{ laneId: number; id: number }>
) {
  const getStyle = (params: { laneId: any; id: any }) => {
    const currentItem = (
      dragItem as React.MutableRefObject<{ laneId: number; id: number } | null>
    ).current;
    if (
      currentItem &&
      currentItem.id === params.id &&
      currentItem.laneId === params.laneId
    ) {
      return "current Task";
    }
    return "Task";
  };

  return (
    <div
      className={draggingStatus ? getStyle({ laneId, id }) : "Task"}
      draggable
      onDragStart={(e) => onDragStart && onDragStart(e, { laneId, id })}
      onDragEnter={
        draggingStatus
          ? (e) => onDragEnter && onDragEnter(e, { laneId, id })
          : undefined
      }
    >
      <h3>
        {id}:{title}
      </h3>
      <p>{body}</p>
    </div>
  );
});

export default Task;
