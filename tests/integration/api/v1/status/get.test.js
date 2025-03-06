test("get to api/v1/status should be return 200", async function () {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  updatedAtParseISO = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toBe(updatedAtParseISO);

  expect(responseBody.dependencies.database.version).toBe("16.0");

  expect(responseBody.dependencies.database.max_connections).toBe(100);

  expect(responseBody.dependencies.database.openned_connections).toBe(1);
});
