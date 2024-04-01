import "./Task.css";

export type TaskProps = {
  id: number;
  title: string;
  body: string;
  // laneId?: number;
  onDragStart?: (event: React.DragEvent, id: number) => void;
};

export default function Task({
  id,
  title,
  body,
  // laneId,
  onDragStart,
}: TaskProps) {
  return (
    <div
      className="Task"
      draggable
      onDragStart={(e) => onDragStart && onDragStart(e, id)}
    >
      <h3>
        {id}:{title}
      </h3>
      <p>{body}</p>
    </div>
  );
}
