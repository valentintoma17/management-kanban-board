import { forwardRef } from "react";
import Task, { TaskProps } from "../Task/Task";
import "./Lane.css";

type LaneProps = {
  id: number;
  title: string;
  tasks: TaskProps[];
  onDragStart?: (
    event: React.DragEvent,
    params: { laneId: number; id: number }
  ) => void;
  onDragEnter?: (
    event: React.DragEvent,
    params: { laneId: number; id: number }
  ) => void;
  draggingStatus?: boolean;
};

const Lane = forwardRef(function (
  { id, title, tasks, onDragStart, onDragEnter, draggingStatus }: LaneProps,
  dragItem
) {
  return (
    <div
      className="Lane"
      onDragEnter={(e) => onDragEnter && onDragEnter(e, { laneId: id, id: -1 })} // -1 is a placeholder for the lane
    >
      <h2>{title}</h2>
      {tasks.map((t) => (
        <Task
          key={t.id}
          id={t.id}
          title={t.title}
          body={t.body}
          laneId={t.laneId}
          onDragStart={onDragStart}
          ref={dragItem as React.RefObject<{ laneId: number; id: number }>}
          onDragEnter={onDragEnter}
          draggingStatus={draggingStatus}
        />
      ))}
    </div>
  );
});

export default Lane;
