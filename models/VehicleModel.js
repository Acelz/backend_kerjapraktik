import { Sequelize } from "sequelize";
import database from "../config/Database.js";
import CodeRegencyMunicipality from "./CodeRegencyMunicipalityModel.js";
import CodeVillage from "./CodeVillageModel.js";
import CodeDistrict from "./CodeDistrictModel.js";

const { DataTypes } = Sequelize;

const Vehicle = database.define(
  "vehicle",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    licensePlate: {
      type: DataTypes.STRING,
      allowNull: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    yearMade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    vehicleType: {
      type: DataTypes.STRING,
      allowNull: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    cylinderCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ownerName: {
      type: DataTypes.STRING,
      allowNull: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ownerAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    districtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    villageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    regencyOrMunicipalityId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

Vehicle.belongsTo(CodeDistrict, { foreignKey: "districtId" });
CodeDistrict.hasMany(Vehicle, { foreignKey: "districtId" });

Vehicle.belongsTo(CodeVillage, { foreignKey: "villageId" });
CodeVillage.hasMany(Vehicle, { foreignKey: "villageId" });

Vehicle.belongsTo(CodeRegencyMunicipality, {
  foreignKey: "regencyOrMunicipalityId",
});

CodeRegencyMunicipality.hasMany(Vehicle, {
  foreignKey: "regencyOrMunicipalityId",
});

export default Vehicle;
