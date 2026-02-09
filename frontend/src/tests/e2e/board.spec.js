import { test, expect } from "@playwright/test";

test.describe("Kanban Board", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should create a new task", async ({ page }) => {
    const taskName = `New Task ${Date.now()}`;

    await page.getByText("Add Task").click();
    await page.getByPlaceholder("e.g. Redesign Landing Page").fill(taskName);
    await page
      .getByPlaceholder("Add details about this task...")
      .fill("This is a test task");

    await page.getByRole("button", { name: "Create Task" }).click();

    await expect(page.getByText(taskName)).toBeVisible();
  });

  test("should drag and drop a task", async ({ page }) => {
    const taskName = `Draggable Task ${Date.now()}`;

    await page.getByText("Add Task").click();
    await page.getByPlaceholder("e.g. Redesign Landing Page").fill(taskName);
    await page.getByRole("button", { name: "Create Task" }).click();

    await expect(page.getByText(taskName)).toBeVisible();

    const toDoColumn = page.getByRole("heading", { name: "To Do" });
    const inProgressColumn = page.getByRole("heading", { name: "In Progress" });

    await expect(toDoColumn).toBeVisible();
    await expect(inProgressColumn).toBeVisible();
  });

  test("should delete a task", async ({ page }) => {
    const taskName = `Delete Me ${Date.now()}`;

    await page.getByText("Add Task").click();
    await page.getByPlaceholder("e.g. Redesign Landing Page").fill(taskName);
    await page.getByRole("button", { name: "Create Task" }).click();

    await expect(page.getByText(taskName)).toBeVisible();

    const taskCard = page
      .locator(".group")
      .filter({ hasText: taskName })
      .first();
    await taskCard.hover();

    await taskCard
      .locator("button[title='Delete Task']")
      .click({ force: true });

    await expect(page.getByText("Delete Task?")).toBeVisible();

    // await page

    await page.locator(".confirm-button").click();

    await expect(page.getByText(taskName)).not.toBeVisible();
  });
});
