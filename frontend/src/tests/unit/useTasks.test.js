import { renderHook, waitFor } from "@testing-library/react";
import { vi, beforeEach } from "vitest";
import { useTasks } from "../../hooks/useTasks";
import { taskApi } from "../../services/api";
import { socketService } from "../../services/socket";

vi.mock("../../services/api", () => ({
  taskApi: {
    getAll: vi.fn(() => Promise.resolve({ data: { data: [] } })),
  },
}));

vi.mock("../../services/socket", () => ({
  socketService: {
    connect: vi.fn(() => ({})),
    on: vi.fn(),
    emit: vi.fn(),
    disconnect: vi.fn(),
  },
}));

test("fetches tasks on mount", async () => {
  renderHook(() => useTasks());

  await waitFor(() => expect(taskApi.getAll).toHaveBeenCalled());
});

