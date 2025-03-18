import database from "infra/database";
import jestConfig from "jest.config";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("GET to api/v1/migrations should be return 200", async function () {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  console.log(responseBody);

  expect(responseBody.length).toBeGreaterThan(0);

  expect(Array.isArray(responseBody)).toBe(true);
});
