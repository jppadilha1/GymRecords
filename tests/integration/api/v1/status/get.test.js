test("get to api/v1/status should be return 200", async function () {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
});
