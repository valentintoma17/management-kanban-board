import { useRef, useState } from "react";
import Lane from "../Lane/Lane";
import "./Board.css";

const lanes = [
  { id: 1, title: "To Do" },
  { id: 2, title: "In Progress" },
  { id: 3, title: "Review" },
  { id: 4, title: "Done" },
];

export default function Board() {
  const [tasks, setTasks] = useState(loadedTask);
  const [dragging, setDragging] = useState(false);

  const dragItem = useRef<{ laneId: number; id: number } | null>(null);
  const dragNode = useRef<HTMLDivElement | null>(null);

  function onDragStart(
    event: React.DragEvent,
    item: { laneId: number; id: number }
  ) {
    dragItem.current = item;
    dragNode.current = event.target as HTMLDivElement;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setDragging(true), 0; // Creates the blank space for the postion in the lane
    });
  }

  function handleDragEnter(
    event: React.DragEvent,
    paramsTarget: { laneId: number; id: number }
  ) {
    event.preventDefault(); // Prevent default behavior (e.g., opening a link)
    event.stopPropagation(); // Stop the event from bubbling up the DOM tree
    if (dragItem?.current?.id !== paramsTarget.id) {
      const index = tasks.findIndex((e) => e.id === dragItem?.current?.id);
      const indexTarget = tasks.findIndex((e) => e.id === paramsTarget.id);
      setTasks((oldTasks) => {
        const newTasks = JSON.parse(JSON.stringify(oldTasks));
        if (dragItem.current) {
          const x = newTasks.splice(index, 1)[0]; // Remove the dragged item
          x.laneId = paramsTarget.laneId; // Update the laneId of the dragged item
          newTasks.splice(indexTarget, 0, x); // Insert the dragged item to the new position
          dragItem.current = { laneId: paramsTarget.laneId, id: x.id }; // Update dragged item
        }
        return newTasks;
      });
    }
  }

  function handleDragEnd() {
    dragItem.current = null;
    dragNode.current?.removeEventListener("dragend", handleDragEnd);
    dragNode.current = null;
    setDragging(false);
  }

  return (
    <div className="Board">
      {lanes.map((lane) => (
        <Lane
          key={lane.id}
          id={lane.id}
          title={lane.title}
          tasks={tasks.filter((t) => t.laneId === lane.id)}
          onDragStart={onDragStart}
          draggingStatus={dragging}
          ref={dragItem}
          onDragEnter={handleDragEnter}
        />
      ))}
    </div>
  );
}

const loadedTask = [
  {
    id: 1,
    title: "Fix navigation bug",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque egestas dictum libero, vel tristique odio pulvinar vitae.",
    laneId: 1,
  },
  {
    id: 2,
    title: "Release new website",
    body: "hasellus eleifend lacus vitae est ultrices placerat. Nunc at risus id risus venenatis laoreet sit amet cursus neque.",
    laneId: 2,
  },
  {
    id: 3,
    title: "Change button color",
    body: "Suspendisse ac lorem a neque tempus luctus non aliquam sapien. Cras ut lacus bibendum, placerat nibh eu, tempus neque.",
    laneId: 3,
  },
  {
    id: 4,
    title: "Deploy server on acceptance environment",
    body: "Pellentesque pharetra fermentum sapien, aliquet ultrices ligula mattis porttitor.",
    laneId: 3,
  },
  {
    id: 5,
    title: "Change layout for the content page",
    body: "Cras tellus ligula, mattis at facilisis eu, ultricies vel elit. Ut aliquam volutpat lacus, a rutrum sem vulputate non.",
    laneId: 3,
  },
  {
    id: 6,
    title: "Complete the registration flow",
    body: "In vel commodo ipsum. Duis id ipsum semper, condimentum ipsum sit amet, maximus massa.",
    laneId: 4,
  },
  {
    id: 7,
    title: "Create new database instance",
    body: " Curabitur nec sem lorem. Donec venenatis, arcu vitae malesuada consequat, dolor ante placerat mi, in fermentum diam ipsum id libero.",
    laneId: 4,
  },
];
