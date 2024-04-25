import { Sequelize } from "sequelize";
import database from "../config/Database.js";

const { DataTypes } = Sequelize;

const CodeRegencyMunicipality = database.define(
  "code_regency_municipality",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export default CodeRegencyMunicipality;
