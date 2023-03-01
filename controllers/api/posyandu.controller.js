const model = require("../../models/index");

module.exports = {
  getAllPosyandu: async (req, res) => {
    const data = await model.Posyandus.findAll({
      include: {
        model: model.Puskesmas,
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
  getSpesificPosyandu: async (req, res) => {
    const data = await model.Posyandus.findOne({
      where: {
        uuid: req.params.uuid,
      },
      attributes: ["nama", "uuid", "alamat", "createdAt", "updatedAt"],
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
