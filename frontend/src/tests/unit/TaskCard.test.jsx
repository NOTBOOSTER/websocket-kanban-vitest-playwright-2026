import { render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskCard from "../../components/TaskCard";

test("renders task info", () => {
  const task = { _id: "1", title: "Fix bug", priority: "High", category: "Bug" };

  render(
    <DndProvider backend={HTML5Backend}>
      <TaskCard task={task} onDelete={() => {}} />
    </DndProvider>
  );

  expect(screen.getByText("Fix bug")).toBeInTheDocument();
  expect(screen.getByText("High")).toBeInTheDocument();
});

