import { test, expect } from "@playwright/test"

test("WHEN I visit the home page THEN I see the chatbot and a welcome message", async ({ page }) => {
	await page.goto("/")

	await expect(page.getByRole("heading", { name: "Landbot core Example" })).toBeVisible()
	await expect(page.getByText("Type something to start chatbotting!")).toBeVisible()
})

test("WHEN I type a message THEN I see the chatbot respond", async ({ page }) => {
	await page.goto("/")

	await expect(page.getByText("Type something to start chatbotting!")).toBeVisible()

	await page.getByLabel("Type your message here").fill("hello")
	await page.getByRole("button", { name: "Send message" }).click()

	await expect(page.getByLabel("Type your message here")).toHaveValue("")

	await expect(page.getByText("Hi! Nice to meet you")).toBeVisible()
	await expect(page.getByText("Are you playing with Landbot?")).toBeVisible()
})

test("WHEN user don't type a message THEN an error is shown", async ({ page }) => {
	await page.goto("/")

	await expect(page.getByText("Type something to start chatbotting!")).toBeVisible()

	await page.getByRole("button", { name: "Send message" }).click()

	await expect(page.locator("input:user-invalid")).toBeVisible()
})

test("WHEN the user is using a slow connection THEN the chatbot shows a loading state", async ({ page }) => {
	await page.route("https://chats.landbot.io/u/H-441480-B0Q96FP58V53BJ2J/index.json", async (route) => {
		await new Promise((resolve) => setTimeout(resolve, 10000))
		return route.continue()
	})

	await page.goto("/")

	await expect(page.getByText("Loading Chatbot, please wait...")).toBeVisible()
	await expect(page.getByRole("button", { name: "Send message" })).toBeDisabled()
})