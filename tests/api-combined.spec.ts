import { test, expect } from '@playwright/test';

test.describe('Todos API', () => {
    test('GET /todos/1 returns real data (live API)', async ({ request }) => {
        const response = await request.get(`https://jsonplaceholder.typicode.com/todos/1`);
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(data).toHaveProperty('id');
        expect(data).toHaveProperty('completed');
        expect(typeof data.completed).toBe('boolean');
    });

    test('handles a simulated 500 error (mocked, via page.route)', async ({ page }) => {
        await page.route('**/todos/1', (rotue) => {
            rotue.fulfill({
                status: 500,
                contentType: 'application/json',
                headers: { 'Access-Control-Allow-Origin' : '*' },
                body: JSON.stringify({ error: 'Internal Server Error' })
            })
        });

        await page.goto('about:blank');
        const status = await page.evaluate(async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
            return res.status;
        });

        expect(status).toBe(500);
    });
});