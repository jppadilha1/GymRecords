import database from "infra/database";
import jestConfig from "jest.config";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("POST to api/v1/migrations should be return 201", async function () {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(201);

  const responseBody = await response.json();

  console.log(responseBody);

  expect(responseBody.length).toBeGreaterThan(0);
  expect(Array.isArray(responseBody)).toBe(true);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response2.status).toBe(200);
  const responseBody2 = await response2.json();
  console.log(responseBody2);

  expect(responseBody2.length).toEqual(0);
  expect(Array.isArray(responseBody2)).toBe(true);
});
