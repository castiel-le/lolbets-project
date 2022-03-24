const router = require("../app");
const supertest = require("supertest");
const request = supertest(router);

test("Gets teams endpoint", async () => {
    const response = await request.get("/api/teams");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect(response.body[0].team_name).toMatch("Evil Geniuses");
})

test("Get specific team endpoint", async () => {
    const response = await request.get("/api/teams/819");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect(response.body.team_name).toMatch("Cloud9");
})

test("Specific team does not exist", async () => {
    expect.assertions(2);
    const response = await request.get("/api/teams/69420");
    expect(response.status).toBe(404);
    expect(response.text).toMatch("Not Found");
})

test("Gets top 5 users endpoint", async () => {
    const response = await request.get("/api/user/top5");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect(response.body[1].username).toBe("iloveroblox98");
})

test("Gets non-top 5 users endpoint", async () => {
    const response = await request.get("/api/user/nontop5?page=2&count=1");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect(response.body[5].username).toBe("tunacan06");
})