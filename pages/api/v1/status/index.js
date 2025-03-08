import database from "infra/database.js";

async function status(request, response) {
  const timeupdated = new Date().toISOString();

  const dbVersionResult = await database.query("SHOW server_version;");
  const dbVersionValue = dbVersionResult.rows[0].server_version;

  const maxconnectionsResult = await database.query("SHOW max_connections;");
  const maxconnectionsValue = maxconnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;

  const openedConnectionsResult = await database.query({
    text: " SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1",
    values: [databaseName],
  });
  const opennedConnectionsValue = openedConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: timeupdated,
    dependencies: {
      database: {
        version: dbVersionValue,
        max_connections: parseInt(maxconnectionsValue),
        openned_connections: opennedConnectionsValue,
      },
    },
  });
}

export default status;
