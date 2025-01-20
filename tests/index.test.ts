import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../src/index";
import { userData } from "./fixtures";

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

describe("Create user", () => {
  it("should return 201 for user sign up and create a user in the db", async () => {
    console.log("userData", userData);
    const res = await request(app).post("/users/signup").send(userData);
    console.log("resBody", res.body);
    expect(res.status).toBe(201);
    expect(res.body.first_name).toBe(userData.firstName);
    expect(res.body.last_name).toBe(userData.lastName);
    expect(res.body.email).toBe(userData.email);
    expect(res.body.password).not.toBe(userData.password);
  });
});
