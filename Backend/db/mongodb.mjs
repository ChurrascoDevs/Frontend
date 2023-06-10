import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://churrascodev:tl3KOITJknX9famR@biblioteca.gwpwikv.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("Biblioteca");

export default db; 