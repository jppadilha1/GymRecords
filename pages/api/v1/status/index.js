import database from "infra/database.js";
import { version } from "react";

async function status(request, response) {
  const timeupdated = new Date().toISOString();

  const dbVersionResult = await database.query("SHOW server_version;");
  const dbVersionValue = dbVersionResult.rows[0].server_version;

  const maxconnectionsResult = await database.query("SHOW max_connections;");
  const maxconnectionsValue = maxconnectionsResult.rows[0].max_connections;

  const openedConnectionsResult = await database.query(
    " SELECT count(*)::int FROM pg_stat_activity WHERE datname = 'local_db'"
  );
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
