const router = require("../app");
const supertest = require("supertest");
const request = supertest(router);
jest.setTimeout(15000);

describe("Gets matchs information endpoint", () => {
    test("GET matches after specific date", async () => {
        const response = await request.get("/api/matches?after=1648184400000&page=1");
        expect(response.status).toBe(200);
        expect(response.type).toMatch("application/json");
        expect(response.body[0].match_id).toBeTruthy();
    })
    test("GET matches between 2 specific dates", async () => {
        const response = await request.get("/api/matches?afterthis=1648184400000&beforethis=1648270800000")
        expect(response.status).toBe(200);
        expect(response.type).toMatch("application/json");
        expect(response.body[0].match_id).toBeTruthy();
    })
})

test("PUT join/edit bet endpoint", async () => {
    const response = await request.put("/api/bets/join?bet=101&user=35&team=677&amount=250");
    expect(response.status).toBe(200);
})

test("DELETE a bet endpoint", async () => {
    const response = await request.delete("/api/bets/delete?bet=101&user=35");
    expect(response.status).toBe(200);
})

test("GET teams endpoint", async () => {
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

test("GET top 5 users endpoint", async () => {
    const response = await request.get("/api/user/top5");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect(response.body[1].username).toBeTruthy();
})

test("GET non-top 5 users endpoint", async () => {
    const response = await request.get("/api/user/rest?page=1&count=1");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect(response.body[5].username).toBeTruthy();
})

test("GET search user endpoint", async () => {
    const response = await request.get("/api/user/search?keyword=bingchilling");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect(response.body[0].username).toMatch("bingchilling");
})

test("GET all users endpoint", async () => {
    const response = await request.get("/api/user/all");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect(response.body[13].username).toMatch("iliketomyumsoup");
})

test("GET user by id endpoint", async () => {
    const response = await request.get("/api/user/1");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect(response.body.email).toBe("bob@notrealemail.com");
})

test("GET all bets from a user endpoint", async () => {
    const response = await request.get("/api/allbets/29");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect(response.body[0].amount_bet).toEqual(1000);
})

test("GET all bets from a user with match data endpoint", async () => {
    const response = await request.get("/api/allbets/matchdata/30");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect(response.body[0].team_betted_on).toBeTruthy;
})

test("GET all custom bets from an user endpoint", async () => {
    const response = await request.get("/api/custombets/35");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect(response.body[0].betInfo).toBeTruthy();
    expect(response.body[0].matchInfo).toBeTruthy();
})

test("GET teams history matches by id endpoint", async () => {
    const response = await request.get("/api/teams/history/819?page=1");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect([response.body[0].team1_id.team_id, response.body[0].team2_id.team_id]).toContain(819);
})

test("GET user history bets by id endpoint", async () => {
    const response = await request.get("/api/user/history/30?page=1&limit=5");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect(response.body[0].team_betted_on).toBeTruthy();
})

test("GET categories endpoint", async () => {
    const response = await request.get("/api/categories");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect(response.body[1].category_name).toMatch("Match After");
})

describe("Gets payout for custom bet", () => {
    test("GET payout before/after time endpoint", async () => {
        const response = await request.get("/api/payout?time1=20&amount=200");
        expect(response.status).toBe(200);
        expect(response.type).toMatch("application/json");
        expect(response.body.before).toBeTruthy();
        expect(response.body.after).toBeTruthy();
    })
    test("GET payout between 2 times endpoint", async() => {
        const response = await request.get("/api/payout?time1=20&amount=300&time2=25");
        expect(response.status).toBe(200);
        expect(response.type).toMatch("application/json");
        expect(response.body.between).toBeTruthy();
    })
})

describe("Checks if a user is following another", () => {
    test("GET follower-following check endpoint", async() => {
        const response = await request.get("/api/follow/check?follower_id=35&following_id=28");
        expect(response.status).toBe(200);
        expect(response.type).toMatch("application/json");
        expect(response.body.result).toBe(true);
    })
    test("An user not following the specified other", async () => {
        const response = await request.get("/api/follow/check?follower_id=1&following_id=69");
        expect(response.status).toBe(200);
        expect(response.type).toMatch("application/json");
        expect(response.body.result).toBe(false);
    })
})

test("GET all following users of a specific user endpoint", async () => {
    const response = await request.get("/api/follow/28");
    expect(response.status).toBe(200);
    expect(response.type).toMatch("application/json");
    expect(response.body[0].follower_id).toBe(28);
    expect(response.body[0].user).toBeTruthy();
})
