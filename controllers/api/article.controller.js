const model = require("../../models/index");

module.exports = {
  getAllArticle: async (req, res) => {
    await model.Article.findAll({
      attributes: [
        "uuid",
        "title",
        "slug",
        "category",
        "image_name",
        "url",
        "body",
        "createdAt",
        "updatedAt",
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
    })
    .then((result) => {
      res.status(200).json({
        status: "Success",
        message: "Fetch data berhasil",
        data: result
      })
    })
    .catch((err) => {
      res.status(400).json({
        status: "Failed",
        message: "Terjadi kesalahan",
        error: err
      })
    })
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
