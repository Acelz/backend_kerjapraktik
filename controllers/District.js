import District from "../models/CodeDistrictModel.js";
import { Op } from "sequelize";

export const getDistricts = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  const totalRows = await District.count({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
  });
  const totalPage = Math.ceil(totalRows / limit);
  const result = await District.findAll({
    where: {
      [Op.or]: [
        {
          name: {
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

export const getDistrictById = async (req, res) => {
  try {
    const response = await District.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ message: "Berhasil", result: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDistrict = async (req, res) => {
  const { number, name } = req.body;

  try {
    const existingDistrict = await District.findOne({
      where: {
        [Op.or]: [{ number: number }, { name: name }],
      },
    });

    if (existingDistrict && existingDistrict.uuid !== req.params.id) {
      return res.status(400).json({ message: "District already exists" });
    }

    const response = await District.update(
      {
        number: number,
        name: name,
      },
      {
        where: {
          uuid: req.params.id,
        },
      }
    );

    if (response[0] === 0) {
      return res.status(404).json({ message: "District not found" });
    }

    res.status(200).json({ message: "Berhasil", result: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createDistrict = async (req, res) => {
  const { number, name } = req.body;

  try {
    const district = await District.create({ number, name });
    return res
      .status(201)
      .json({ message: "District created successfully", result: district });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteDistrict = async (req, res) => {
  try {
    const response = await District.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ message: "Berhasil", result: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllDistricts = async (req, res) => {
  try {
    const response = await District.findAll();
    res.status(200).json({ message: "Berhasil", result: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
