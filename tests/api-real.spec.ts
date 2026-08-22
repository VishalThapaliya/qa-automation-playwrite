import { test, expect } from '@playwright/test';

test.describe('API Testing',  () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';

    test('GET /photos returns real photo data', async ({ request }) => {
        const response = await request.get(`${baseURL}/photos`);
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(data.length).toBeGreaterThan(0);
        expect(data[0]).toHaveProperty('albumId');
        expect(data[0]).toHaveProperty('thumbnailUrl');
    });

    test('GET /posts returns real post data', async ({ request }) => {
        const response = await request.get(`${baseURL}/posts`);
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(data.length).toBeGreaterThan(0);
        expect(data[0]).toHaveProperty('userId');
        expect(data[0]).toHaveProperty('title');
    });

    test('GET /users returns real user data', async ({ request }) => {
        const response = await request.get(`${baseURL}/users`);
        expect(response.status()).toBe(200);

        const data = await response.json();
        expect(data.length).toBeGreaterThan(0);
        expect(data[0]).toHaveProperty('username');
        expect(data[0]).toHaveProperty('email');
        expect(data[0].email).toContain('@');
    });
})