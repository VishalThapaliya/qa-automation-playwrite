import { test, expect } from "@playwright/test";

test("mock GET /photos", async ({ page }) => {
    await page.route("**/photos", (route) => {
        route.fulfill({
            status: 200,
            contentType: 'applcation/json',
            headers: {'Access-Control-Allow-Origin' : '*'},
            body: JSON.stringify([
                { albumId: 1, id: 1, title: "Fake Album Title", url: 'fake photo url', thumbnailUrl: 'fake thumbnail URL'}
            ])
        });
    });

    await page.goto('about:blank');

    const data = await page.evaluate(async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/photos');
        return res.json();
    });

    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(1);
    expect(data[0]).toHaveProperty('albumId');
    expect(data[0].title).toBe('Fake Album Title');
});

test("mock GET /posts", async ({ page }) => {
await page.route("**/posts", (route) => {
    route.fulfill({
        status: 200,
        contentType: 'applcation/json',
        headers: {'Access-Control-Allow-Origin' : '*'},
        body: JSON.stringify([
            { id: 1, userId: 1, title: 'Fake post 1', body: 'This is a fake post 1'}
        ])
    })
});

await page.goto('about:blank');

const data = await page.evaluate(async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return res.json();
});

expect(Array. isArray(data)).toBe(true);
expect(data).toHaveLength(1);
expect(data[0]).toHaveProperty('title');
expect(data[0].title).toBe('Fake post 1');
});

test("mock GET /comments", async ({ page }) => {
await page.route("**/comments", (route) => {
    route.fulfill({
        status: 200,
        contentType: 'application/json',
        headers: { 'Access-Control-Allow-Origin' : '*'},
        body: JSON.stringify([
            { id: 1, postId: 1, name: "Fake comment 1", email: "fake@email.com", body: "fake comment 1 body" }
        ])
    })
});

await page.goto('about:blank');

const data = await page.evaluate(async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments');
    return res.json();
});

expect(Array.isArray(data)).toBe(true);
expect(data).toHaveLength(1);
expect(data[0]).toHaveProperty('name');
expect(data[0].email).toContain('@');
});

// // mock GET albums
test("mock GET /albums", async ({ page }) => {
    await page.route("**/albums", (route) => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            headers: {'Access-Control-Allow-Origin' : '*'},
            body: JSON.stringify([
                {id: 1, userId: 1, title: 'Fake album 1'}
            ])
        })
    });

    await page.goto('about:blank');
    const data = await page.evaluate(async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/albums');
        return res.json();
    });

    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(1);
    expect(data[0]).toHaveProperty('title');
    expect(data[0].title).toBe('Fake album 1');
});

// // mock GET todos
test("mock GET /todos", async ({ page }) => {
    await page.route("**/todos", (route) => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            headers: {'Access-Control-Allow-Origin' : '*'},
            body: JSON.stringify([
                {id: 1, userId: 1, title: 'Fake todo 1', completed: false}
            ])
        })
    });

    await page.goto('about:blank');

    const data = await page.evaluate(async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos');
        return res.json();
    });

    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(1);
    expect(data[0]).toHaveProperty('title');
    expect(data[0].completed).toBe(false);
});

// // mock GET users
test("mock GET /users", async ({ page }) => {
    await page.route("**/users", (route) => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            headers: {'Access-Control-Allow-Origin' : '*'},
            body: JSON.stringify([
                { id: 1, name: "Bishal Thapaliya", username: "Bibi", email: "bibi@baba.com", phone: "0123456789" },
                { id: 2, name: "Merina Shrestha Thapaliya", username: "Meri", email: "meri@teri.com", phone: "9876543210" }
            ])
        })
    });

    await page.goto('about:blank');

    const data = await page.evaluate(async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        return res.json();
    });

    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(2);
    expect(data[0]).toHaveProperty('username');
    expect(data[1].email).toContain('@');
});

// // handle 500 errors on POST
test("handles a 500 error from /posts", async ({ page }) => {
    await page.route("**/posts", (route) => {
        route.fulfill({
            status: 500,
            contentType: 'application/json',
            headers: { 'Access-Control-Allow-Origin' : '*' },
            body: JSON.stringify({ 'error': 'Internal Server Error' })
        })
    });

    await page.goto("about:blank");
    const status = await page.evaluate(async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        return res.status;
    });

    expect(status).toBe(500);
});

// // handle malformed JSON from /users
test("handle malformed JSON from /users", async ({ page }) => {
    await page.route("**/users", (route) => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            headers: { 'Access-Control-Allow-Origin' : '*' },
            body: '{ this is not a json'
        });
    });

    await page.goto('about:blank');
    
    const errorCaught = await page.evaluate(async () => {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            await res.json();
            return false;
        } catch {
            return true;
        }
    });

    expect(errorCaught).toBe(true);
});

// // handle slow response from /albums
test("handle slow response from /albums", async ({ page }) => {
    await page.route("**/albums", async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            headers: { 'Access-Control-Allow-Origin' : '*' },
            body: JSON.stringify([])
        })
    });

    await page.goto('about:blank');

    const start = Date.now();
    await page.evaluate(async () => await fetch('https://jsonplaceholder.typicode.com/albums'));
    const elapsed = Date.now() - start;

    expect(elapsed).toBeGreaterThanOrEqual(5000);
});

// // handle emptry array from /comments
test("handle empty array from /comments", async ({ page }) => {
    await page.route("**/comments", (route) => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            headers: { 'Access-Control-Allow-Origin' : '*' },
            body: JSON.stringify([])
        })
    });

    await page.goto('about:blank');
    const data = await page.evaluate(async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/comments');
        return res.json();
    });

    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(0);
});

// // handle 404 from /todos/9999
test("handle 404 from /todos/9999", async ({ page }) => {
    await page.route("**/todos/9999", (route) => {
        route.fulfill({
            status: 404,
            contentType: 'application/json',
            headers: { 'Access-Control-Allow-Origin' : '*' },
            body: JSON.stringify({})
        })
    });

    await page.goto('about:blank');
    const status = await page.evaluate(async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos/9999');
        return res.status;
    });

    expect(status).toBe(404);
});

// // hadle 401 unauthorized from /users
test("handle 401 unauthorized from /users", async ({ page }) => {
    await page.route("**/users", (route) => {
        route.fulfill({
            status: 401,
            contentType: 'application/json',
            headers: {'Access-Control-Allow-Origin' : '*'},
            body: JSON.stringify({ error: 'Unauthorized'})
        })
    });

    await page.goto("about:blank");

    const result = await page.evaluate(async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        return { status: res.status, body: await res.json() };
    });

    expect(result.status).toBe(401);
    expect(result.body).toHaveProperty('error');
});