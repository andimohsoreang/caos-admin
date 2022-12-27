const model = require("../models/index");

module.exports = {
  getPosyandu: async (req, res) => {
    const data = await model.Posyandus.findAll({
      attributes: ["uuid", "nama", "alamat"],
    });
    const puskesmas = await model.Puskesmas.findAll({
      attributes: ["uuid", "nama"],
    });
    res.render("./pages/posyandu", { data, puskesmas });
  },
  storePosyandu: async (req, res) => {
    const { nama, alamat, id_puskesmas } = req.body;
    let idPuskes;
    await model.Puskesmas.findOne({
      where: {
        uuid: id_puskesmas,
      },
    })
      .then((result) => {
        idPuskes = result.id;
      })
      .catch((err) => {
        console.log(err);
        req.flash("alert", {
          hex: "#f3616d",
          color: "danger",
          status: "Failed",
        });
        req.flash("message", "Gagal Menambahkan Posyandu");
        res.redirect("/posyandu");
      });
    await model.Posyandus.create({
      nama,
      alamat,
      id_puskesmas: idPuskes,
    })
      .then(() => {
        req.flash("alert", {
          hex: "#28ab55",
          color: "success",
          status: "Success",
        });
        req.flash("message", `Posyandu Berhasil Ditambahkan`);
        res.status(201);
        res.redirect("/posyandu");
      })
      .catch((err) => {
        console.log(err);
        req.flash("alert", {
          hex: "#f3616d",
          color: "danger",
          status: "Failed",
        });
        req.flash("message", "Gagal Menambahkan Posyandu");
        res.status(400);
        res.redirect("/posyandu");
      });
  },
  updatePosyandu: async (req, res) => {
    let { nama, alamat } = req.body;
    const response = await model.Posyandus.findOne({
      where: {
        uuid: req.params.uuid,
      },
    });
    if (!response) {
      req.flash("alert", {
        hex: "#f3616d",
        color: "danger",
        status: "User tidak ditemukan",
      });
      res.redirect("/posyandu");
    }

    if (!nama) {
      nama = response.nama;
    }
    if (!alamat) {
      alamat = response.alamat;
    }

    await model.Posyandus.update(
      {
        nama,
        alamat,
      },
      {
        where: {
          uuid: req.params.uuid,
        },
      }
    )
      .then((result) => {
        console.log("then");
        req.flash("alert", {
          hex: "#28ab55",
          color: "success",
          status: "Success",
        });
        req.flash(
          "message",
          `Berhasil Update Posyandu dengan nama ${response.nama}`
        );
        res.status(201);
        res.redirect("/posyandu");
      })
      .catch((result) => {
        req.flash("alert", {
          hex: "#f3616d",
          color: "danger",
          status: "Gagal Update Posyandu baru",
        });
        res.redirect("/posyandu");
      });
  },
  deletePosyandu: async (req, res) => {
    const response = await model.Posyandus.findOne({
      where: {
        uuid: req.params.uuid,
      },
    });
    if (!response) {
      req.flash("alert", {
        hex: "#f3616d",
        color: "danger",
        status: "Kategori tidak ditemukan",
      });
      res.redirect("/categories");
    }
    await model.Posyandus.destroy({
      where: {
        uuid: response.uuid,
      },
    })
      .then((result) => {
        req.flash("alert", {
          hex: "#28ab55",
          color: "success",
          status: "Success",
        });
        req.flash(
          "message",
          `Berhasil Hapus Posyandu dengan nama ${response.nama}`
        );
        res.status(200);
        res.redirect("/posyandu");
      })
      .catch((result) => {
        req.flash("alert", {
          hex: "#f3616d",
          color: "danger",
          status: "Gagal Hapus Posyandu",
        });
        res.redirect("/posyandu");
      });
  },
};
