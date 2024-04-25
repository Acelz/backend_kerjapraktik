import District from "../models/CodeDistrictModel.js";
import Vehicle from "../models/VehicleModel.js";
import CodeRegencyMunicipality from "../models/CodeRegencyMunicipalityModel.js";
import Village from "../models/CodeVillageModel.js";

export const getAllCount = async (req, res) => {
  try {
    const districtCount = await District.count();
    const vehicleCount = await Vehicle.count();
    const regencyMunicipalityCount = await CodeRegencyMunicipality.count();
    const villageCount = await Village.count();

    return res.status(200).json({
      result: [
        { name: "Kelurahan/Desa", count: villageCount },
        { name: "Kecamatan", count: districtCount },
        { name: "Kabupaten/Kota", count: regencyMunicipalityCount },
        { name: "Kendaraan", count: vehicleCount },
      ],
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
