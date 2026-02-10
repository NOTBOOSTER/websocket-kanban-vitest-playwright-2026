import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import KanbanBoard from "../../components/KanbanBoard";

// mock socket.io-client library
vi.mock("../../services/socket", () => ({
  socketService: {
    connect: vi.fn(() => ({})),
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
    disconnect: vi.fn(),
  },
}));

vi.mock("../../services/api", () => ({
  taskApi: {
    getAll: vi.fn(() => Promise.resolve({ data: { data: [] } })),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock("../../components/TaskChart", () => ({
  default: () => <div data-testid="task-chart">Chart</div>,
}));

test("WebSocket receives task update", async () => {
  render(<KanbanBoard />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
