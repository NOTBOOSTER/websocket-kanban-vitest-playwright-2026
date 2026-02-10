import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, beforeEach } from "vitest";
import KanbanBoard from "../../components/KanbanBoard";
import { useTasks } from "../../hooks/useTasks";
import { taskApi } from "../../services/api";

vi.mock("../../hooks/useTasks", () => ({ useTasks: vi.fn() }));
vi.mock("../../components/TaskChart", () => ({ default: () => <div>Chart</div> }));
vi.mock("../../services/api", () => ({ taskApi: { delete: vi.fn() } }));

beforeEach(() => {
  useTasks.mockReturnValue({
    tasks: [
      { _id: "1", title: "Task 1", column: "To Do", priority: "High", category: "Bug" },
    ],
    loading: false,
    error: null,
    moveTask: vi.fn(),
  });
});

test("renders columns", () => {
  render(<KanbanBoard />);

  expect(screen.getByText("To Do")).toBeInTheDocument();
  expect(screen.getByText("In Progress")).toBeInTheDocument();
  expect(screen.getByText("Done")).toBeInTheDocument();
});

test("confirm delete model test", async () => {
  taskApi.delete.mockResolvedValue({});
  render(<KanbanBoard />);

  fireEvent.click(screen.getByTitle("Delete Task"));
  expect(screen.getByText("Delete Task?")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Delete"));
  await waitFor(() => expect(taskApi.delete).toHaveBeenCalledWith("1"));
});

