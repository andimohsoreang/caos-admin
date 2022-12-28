const model = require("../../models/index");

module.exports = {
  getAllArticle: async (req, res) => {
    const data = await model.Article.findAll();
    res.status(200).json({
      status: "Success",
      message: "Fetch data berhasil",
      data,
    });
  },
  getSpesificArticle: async (req, res) => {
    const data = await model.Article.findOne({
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
