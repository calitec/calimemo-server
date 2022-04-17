const dotenv = require("dotenv");
const product = process.env.NODE_ENV === "production";

dotenv.config();
module.exports = {
  development: {
    username: product ? "bf29f0d3b2bfb9" : "root",
    password: process.env.DB_PASSWORD,
    database: product ? "heroku_5033457910eb299" : "calimemo",
    host: product ? "us-cdbr-east-05.cleardb.net" : "127.0.0.1",
    dialect: "mysql",
    dialectOptions: { charset: "utf8mb4", dateStrings: true, typeCast: true },
    timezone: "+09:00",
  },
  test: {
    username: product ? "bf29f0d3b2bfb9" : "root",
    password: process.env.DB_PASSWORD,
    database: product ? "heroku_5033457910eb299" : "calimemo",
    host: product ? "us-cdbr-east-05.cleardb.net" : "127.0.0.1",
    dialect: "mysql",
    dialectOptions: { charset: "utf8mb4", dateStrings: true, typeCast: true },
    timezone: "+09:00",
  },
  production: {
    username: product ? "bf29f0d3b2bfb9" : "root",
    password: process.env.DB_PASSWORD,
    database: product ? "heroku_5033457910eb299" : "calimemo",
    host: product ? "us-cdbr-east-05.cleardb.net" : "127.0.0.1",
    dialect: "mysql",
    dialectOptions: { charset: "utf8mb4", dateStrings: true, typeCast: true },
    timezone: "+09:00",
  },
};
