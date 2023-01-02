const model = require("../../models/index");

module.exports = {
  getAllPuskesmas: async (req, res) => {
    const data = await model.Puskesmas.findAll({
      include: {
        model: model.Posyandus,
        attributes: ["nama", "uuid", "alamat", "createdAt", "updatedAt"],
      },
      attributes: ["nama", "uuid", "alamat", "createdAt", "updatedAt"],
    });
    res.status(200).json({
      status: "Success",
      message: "Fetch data berhasil",
      data,
    });
  },
  getSpesificPuskesmas: async (req, res) => {
    const data = await model.Puskesmas.findOne({
      include: {
        model: model.Posyandus,
        attributes: ["nama", "uuid", "alamat", "createdAt", "updatedAt"],
      },
      attributes: ["nama", "uuid", "alamat", "createdAt", "updatedAt"],
      where: {
        uuid: req.params.uuid,
      },
    });

    if (!data)
      return res.status(404).json({
        status: "Failed",
        message: "Data tidak ditemukan",
      });

    res.status(200).json({
      status: "Success",
      message: "Fetch data sukses",
      data,
    });
  },
};
