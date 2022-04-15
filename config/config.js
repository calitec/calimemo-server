const dotenv = require("dotenv");
const product = process.env.NODE_ENV === "production";

dotenv.config();
module.exports = {
  development: {
    username: product ? "bb7098d217cb18" : "root",
    password: process.env.DB_PASSWORD,
    database: product ? "heroku_d94c92834c35d19" : "calimemo",
    host: product ? "us-cdbr-east-05.cleardb.net" : "127.0.0.1",
    dialect: "mysql",
    dialectOptions: { charset: "utf8mb4", dateStrings: true, typeCast: true },
    timezone: "+09:00",
  },
  test: {
    username: product ? "bb7098d217cb18" : "root",
    password: process.env.DB_PASSWORD,
    database: product ? "heroku_d94c92834c35d19" : "calimemo",
    host: product ? "us-cdbr-east-05.cleardb.net" : "127.0.0.1",
    dialect: "mysql",
    dialectOptions: { charset: "utf8mb4", dateStrings: true, typeCast: true },
    timezone: "+09:00",
  },
  production: {
    username: product ? "bb7098d217cb18" : "root",
    password: process.env.DB_PASSWORD,
    database: product ? "heroku_d94c92834c35d19" : "calimemo",
    host: product ? "us-cdbr-east-05.cleardb.net" : "127.0.0.1",
    dialect: "mysql",
    dialectOptions: { charset: "utf8mb4", dateStrings: true, typeCast: true },
    timezone: "+09:00",
  },
};
