import database from "infra/database.js";

async function status(request, response) {
  const testequery = await database.query("SELECT 5+123 as SUM;");

  response.status(200).json({
    teste: testequery.rows[0],
  });
}

export default status;
