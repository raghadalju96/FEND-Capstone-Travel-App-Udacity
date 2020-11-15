const app = require("./server");
const supertest = require("supertest");
const request = supertest(app);

describe("Test", () => {
  test("GET method", () => {
    return request.get("/").expect(200);
  });
});
