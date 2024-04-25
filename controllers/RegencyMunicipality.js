import CodeRegencyMunicipality from "../models/CodeRegencyMunicipalityModel.js";
import { Op } from "sequelize";

export const getcodeRegencyMunicipality = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  const totalRows = await CodeRegencyMunicipality.count({
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
  const result = await CodeRegencyMunicipality.findAll({
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

export const getCodeRegencyMunicipalityById = async (req, res) => {
  try {
    const response = await CodeRegencyMunicipality.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ message: "Berhasil", result: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCodeRegencyMunicipality = async (req, res) => {
  const { number, name } = req.body;

  try {
    const response = await CodeRegencyMunicipality.update(
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

export const createCodeRegencyMunicipality = async (req, res) => {
  const { number, name } = req.body;

  try {
    const codeRegencyMunicipality = await CodeRegencyMunicipality.create({
      number: number,
      name: name,
    });
    return res
      .status(201)
      .json({ message: "Berhasil", result: codeRegencyMunicipality });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCodeRegencyMunicipality = async (req, res) => {
  try {
    const response = await CodeRegencyMunicipality.destroy({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ message: "Berhasil", result: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
