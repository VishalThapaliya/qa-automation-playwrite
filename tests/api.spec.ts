import { expect, test } from '@playwright/test';

test('should get a single user with status 200', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/2');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(2);
    expect(body).toHaveProperty('email');
});