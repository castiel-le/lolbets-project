const router = require("../app");
const supertest = require("supertest");
const request = supertest(router);

describe("Gets matchs information endpoint", () => {
    test("Gets matches after specific date", async () => {
        const response = await request.get("/api/matches?after=1640998800&page=1");
        expect(response.status).toBe(200);
        expect(response.type).toMatch("application/json")
        expect(response.body[0].match_id).toBeTruthy();
    })
})

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

test("Gets search user endpoint", async () => {
    const response = await request.get("/api/user/search?keyword=bingchilling");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect(response.body[0].username).toMatch("bingchilling");
})

test("Gets all users endpoint", async () => {
    const response = await request.get("/api/user/all");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect(response.body[13].username).toMatch("iliketomyumsoup");
})

test("Gets user by id endpoint", async () => {
    const response = await request.get("/api/user/1");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect(response.body.email).toBe("bob@notrealemail.com");
})

test("Gets all bets from a user endpoint", async () => {
    const response = await request.get("/api/allbets/29");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect(response.body[0].amount_bet).toEqual(1000);
})

test("Gets teams history matches by id endpoint", async () => {
    const response = await request.get("/api/teams/history/819?page=1");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect([response.body[0].team1_id.team_id, response.body[0].team2_id.team_id]).toContain(819);
})

test("Get user history bets by id endpoint", async () => {
    const response = await request.get("/api/user/history/30?page=1&limit=5");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect(response.body[0].team_betted_on).toBeTruthy();
})