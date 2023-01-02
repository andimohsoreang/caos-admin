const model = require("../../models/index");

module.exports = {
  getAllArticle: async (req, res) => {
    const data = await model.Article.findAll({
      attributes: [
        "title",
        "uuid",
        "category",
        "image_name",
        "url",
        "createdAt",
        "updatedAt",
        "body",
      ],
      include: [
        {
          model: model.Category,
          attributes: ["name", "description"],
        },
        {
          model: model.User,
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json({
      status: "Success",
      message: "Fetch data berhasil",
      data,
    });
  },
  getSpesificArticle: async (req, res) => {
    const data = await model.Article.findOne({
      attributes: [
        "title",
        "uuid",
        "image_name",
        "url",
        "createdAt",
        "updatedAt",
        "body",
      ],
      include: model.Category,
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
