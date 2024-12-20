import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../src/index";

describe("get home page", () => {
  it("should return 200 for get home page", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("this is coming from the home page");
  });
});

describe("Get all tags", () => {
  it("should return 200 for tags get req", async () => {
    const res = await request(app).get("/tags");
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: 1,
      name: "Brown",
    });
  });
});
