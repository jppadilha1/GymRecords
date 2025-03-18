import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migration(request, response) {
  const methodsAllowed = ["GET", "POST"];

  if (!methodsAllowed.includes(request.method)) {
    return response.status(405).json({
      message: `Method ${request.method} not allowed`,
    });
  }

  const dbClientInstance = await database.getNewClient();

  const schemaMigrations = {
    dbClient: dbClientInstance,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const migrations = await migrationRunner(schemaMigrations);
    await dbClientInstance.end();
    return response.status(200).json(migrations);
  }

  if (request.method === "POST") {
    const migrations = await migrationRunner({
      ...schemaMigrations,
      dryRun: false,
    });

    if (migrations.length > 0) {
      await dbClientInstance.end();
      return response.status(201).json(migrations);
    }
    await dbClientInstance.end();
    return response.status(200).json(migrations);
  }
}
