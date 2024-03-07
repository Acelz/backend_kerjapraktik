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

    res.status(200).json({ message: "Berhasil", result: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createDistrict = async (req, res) => {
  const { number, name } = req.body;

  try {
    const District = await District.create({
      number: number,
      name: name,
    });
    res.status(201).status({ message: "Berhasil", result: District });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
