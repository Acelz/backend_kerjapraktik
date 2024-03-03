import Village from "../models/VillageModel.js";
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

    res.status(200).json({ message: "Berhasil", result: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createVillage = async (req, res) => {
  const { number, name } = req.body;

  try {
    const Village = await Village.create({
      number: number,
      name: name,
    });
    res.status(201).status({ message: "Berhasil", result: Village });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
