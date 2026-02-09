import { test, expect } from "@playwright/test";

test.describe("Kanban Board", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("basic test", async ({ page }) => {
    await expect(page.getByText("Add Task")).toBeVisible();
  });

});
