import { useState } from "react";
import Lane from "../Lane/Lane";
import "./Board.css";

const lanes = [
  { id: 1, title: "To Do" },
  { id: 2, title: "In Progress" },
  { id: 3, title: "Review" },
  { id: 4, title: "Done" },
];

function onDragStart(event: React.DragEvent, id: number) {
  console.log("onDragStart", id);
  event.dataTransfer.setData("text/plain", id.toString());
}

function handleDragOver(event: React.DragEvent) {
  event.preventDefault();
}

export default function Board() {
  const [tasks, setTask] = useState(loadedTask);

  function onDrop(event: React.DragEvent, laneId: number) {
    const id = event.dataTransfer.getData("text/plain");
    event.preventDefault();

    const task = tasks.find((t) => t.id === Number(id));
    if (task) {
      const newTask = tasks.filter((t) => t.id !== Number(id));
      setTask(newTask.concat({ ...task, laneId }));
    }
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
          onDragOver={handleDragOver}
          onDrop={onDrop}
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
