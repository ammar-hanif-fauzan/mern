import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.MONGODB_URI!;
const client = new MongoClient(url);

const dbName = "simple_crud";

async function mongoConnect() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  return "done.";
}

function getDatabase() {
  const db = client.db(dbName);
  return db;
}

export { mongoConnect, getDatabase };
