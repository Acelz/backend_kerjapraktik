import Vehicle from "../models/VehicleModel.js";
import { Op } from "sequelize";

export const createVehicle = async (req, res) => {
  const {
    licensePlate,
    brand,
    model,
    type,
    yearMade,
    color,
    vehicleType,
    cylinderCapacity,
    ownerName,
    ownerAddress,
    districtId,
    villageId,
    regencyOrMunicipalityId,
  } = req.body;

  try {
    const vehicle = await Vehicle.create({
      licensePlate,
      brand,
      model,
      type,
      yearMade,
      color,
      vehicleType,
      cylinderCapacity,
      ownerName,
      ownerAddress,
      districtId,
      villageId,
      regencyOrMunicipalityId,
    });

    return res
      .status(201)
      .json({ message: "Vehicle created successfully", result: vehicle });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllVehicles = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  const totalRows = await Vehicle.count({
    where: {
      [Op.or]: [
        {
          ownerName: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
  });
  const totalPage = Math.ceil(totalRows / limit);
  const result = await Vehicle.findAll({
    where: {
      [Op.or]: [
        {
          ownerName: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
    offset: offset,
    limit: limit,
    order: [["id", "DESC"]],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};
