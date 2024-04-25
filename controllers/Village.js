import Village from "../models/CodeVillageModel.js";
import { Op } from "sequelize";

export const getVillages = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  const totalRows = await Village.count({
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
  const result = await Village.findAll({
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

export const getVillageById = async (req, res) => {
  try {
    const response = await Village.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ message: "Berhasil", result: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVillage = async (req, res) => {
  const { number, name } = req.body;

  try {
    const response = await Village.update(
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

    return res.status(200).json({ message: "Berhasil", result: response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createVillage = async (req, res) => {
  const { number, name } = req.body;

  try {
    const existingVillage = await Village.findOne({
      where: {
        [Op.or]: [{ number: number }, { name: name }],
      },
    });

    if (existingVillage) {
      return res.status(400).json({ message: "Village already exists" });
    }

    const village = await Village.create({ number, name });
    return res.status(201).json({ message: "Berhasil", result: village });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteVillage = async (req, res) => {
  try {
    const response = await Village.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ message: "Berhasil", result: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllVillages = async (req, res) => {
  try {
    const response = await Village.findAll({});
    res.status(200).json({ message: "Berhasil", result: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
