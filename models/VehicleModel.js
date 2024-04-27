import { Sequelize } from "sequelize";
import database from "../config/Database.js";
import CodeRegencyMunicipality from "./CodeRegencyMunicipalityModel.js";
import CodeVillage from "./CodeVillageModel.js";
import CodeDistrict from "./CodeDistrictModel.js";

const { DataTypes } = Sequelize;

const Vehicle = database.define(
  "vehicle",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    licensePlate: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearMade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicleType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cylinderCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ownerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    districtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    villageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    regencyOrMunicipalityId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow null if needed
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
