import District from "../models/CodeDistrictModel.js";
import Vehicle from "../models/VehicleModel.js";
import CodeRegencyMunicipality from "../models/CodeRegencyMunicipalityModel.js";
import Village from "../models/CodeVillageModel.js";
import User from "../models/UserModel.js";

export const getAllCount = async (req, res) => {
  try {
    const districtCount = await District.count();
    const vehicleCount = await Vehicle.count();
    const regencyMunicipalityCount = await CodeRegencyMunicipality.count();
    const villageCount = await Village.count();
    const userCount = await User.count();

    return res.status(200).json({
      result: [
        { name: "Kode Kelurahan/Desa", count: villageCount },
        { name: "Kode Kecamatan", count: districtCount },
        { name: "Kode Kabupaten/Kota", count: regencyMunicipalityCount },
        { name: "Kendaraan", count: vehicleCount },
        { name: "Pengguna", count: userCount },
      ],
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
