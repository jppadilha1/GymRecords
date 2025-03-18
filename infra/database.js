import { Client } from "pg";

async function query(object) {
  let client;

  try {
    client = await getNewClient();
    const result = await client.query(object);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_LOCALHOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    ssl: getSSLValues(),
  });

  await client.connect();
  return client;
}

function getSSLValues() {
  return process.env.NODE_ENV === "development" || "test" ? false : true;
}

export default {
  query,
  getNewClient,
};
