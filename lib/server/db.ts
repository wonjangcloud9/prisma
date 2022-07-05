import { PrismaClient } from "@prisma/client";

declare global {
  var db: PrismaClient | undefined;
}

const db = new PrismaClient();
console.log("======");
console.log(db);
console.log("======");

if (process.env.NODE_ENV === "test") global.db = db;

export default db;
