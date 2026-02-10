import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import TaskForm from "../../components/TaskForm";
import { taskApi } from "../../services/api";

vi.mock("../../services/api", () => ({
  taskApi: { create: vi.fn() },
}));

test("renders form and submits", async () => {
  const onClose = vi.fn();
  taskApi.create.mockResolvedValue({});

  render(<TaskForm onClose={onClose} />);

  expect(screen.getByText("New Task")).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText("e.g. Redesign Landing Page"), {
    target: { value: "My task" },
  });
  fireEvent.click(screen.getByText("Create Task"));

  await waitFor(() => expect(onClose).toHaveBeenCalled());
});

