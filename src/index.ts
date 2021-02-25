import app from "./server";
import connectDB from "./session/db";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  connectDB();
  await app.listen(app.get("port"));
  console.log("Server on port", app.get("port"));
}

main();
