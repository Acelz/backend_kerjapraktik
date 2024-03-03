import { Sequelize } from "sequelize";

const database = new Sequelize("db_pendataan", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default database;
