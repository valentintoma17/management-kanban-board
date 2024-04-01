import Task, { TaskProps } from "../Task/Task";
import "./Lane.css";

type LaneProps = {
  id: number;
  title: string;
  tasks: TaskProps[];
  onDragStart: (event: React.DragEvent, id: number) => void;
  onDragOver?: (event: React.DragEvent) => void;
  onDrop?: (event: React.DragEvent, id: number) => void;
};

export default function Lane({
  id,
  title,
  tasks,
  onDragStart,
  onDragOver,
  onDrop,
}: LaneProps) {
  return (
    <div
      className="Lane"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop && onDrop(e, id)}
    >
      <h2>{title}</h2>
      {tasks.map((t) => (
        <Task
          key={t.id}
          id={t.id}
          title={t.title}
          body={t.body}
          onDragStart={onDragStart}
        />
      ))}
    </div>
  );
}
