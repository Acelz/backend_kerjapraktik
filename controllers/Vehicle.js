import Vehicle from "../models/VehicleModel.js";

export const createVehicle = async (req, res) => {
  const {
    licensePlate,
    brand,
    model,
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

    res
      .status(201)
      .json({ message: "Vehicle created successfully", result: vehicle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();

    res.status(200).json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
