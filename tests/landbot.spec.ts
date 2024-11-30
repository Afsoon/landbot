import { test, expect } from '@playwright/test';

test('WHEN I visit the home page THEN I see the chatbot and a welcome message', async ({ page }) => {
  await page.goto('/');


  await expect(page.getByRole('heading', { name: 'Landbot core Example' })).toBeVisible();
  await expect(page.getByText("Type something to start chatbotting!")).toBeVisible();
});

test("WHEN I type a message THEN I see the chatbot respond", async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText("Type something to start chatbotting!")).toBeVisible();

  await page.getByRole('textbox').fill('hello');
  await page.getByRole('button', { name: '➤' }).click(); 

  await expect(page.getByRole('textbox')).toHaveValue('');

  await expect(page.getByText("Hi! Nice to meet you")).toBeVisible();
  await expect(page.getByText("Are you playing with Landbot?")).toBeVisible();
})