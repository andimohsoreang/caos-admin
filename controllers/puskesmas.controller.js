const model = require("../models/index");

module.exports = {
  getPuskesmas: async (req, res) => {
    const data = await model.Puskesmas.findAll({
      include: model.Posyandus,
      attributes: ["uuid", "nama", "alamat"],
    });

    // var posyandus = [];

    // for (var i = 0; i < data.length; i++) {
    //   for (var j = 0; j < data[i].Posyandus.length; j++) {
    //     posyandus.push({
    //       uuid: data[i].Posyandus[j].uuid,
    //       nama: data[i].Posyandus[j].nama,
    //       alamat: data[i].Posyandus[j].alamat,
    //     });
    //   }
    // }

    res.render("./pages/puskesmas", { data });
  },
  getPuskesmasById: async (req, res) => {
    console.log("oke");
  },
  storePuskesmas: async (req, res) => {
    const { nama, alamat } = req.body;
    await model.Puskesmas.create({
      nama,
      alamat,
    })
      .then((result) => {
        req.flash("alert", {
          hex: "#28ab55",
          color: "success",
          status: "Success",
        });
        req.flash("message", `Puskesmas Berhasil Ditambahkan`);
        res.status(201);
        res.redirect("/puskesmas");
      })
      .catch((err) => {
        console.log(error);
        req.flash("alert", {
          hex: "#f3616d",
          color: "danger",
          status: "Failed",
        });
        req.flash("message", "Gagal Menambahkan Puskesmas");
        res.status(400);
        res.redirect("/puskesmas");
      });
  },
  updatePuskesmas: async (req, res) => {
    let { nama, alamat } = req.body;
    const response = await model.Puskesmas.findOne({
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
      res.redirect("/users");
    }

    if (!nama) {
      nama = response.nama;
    }
    if (!alamat) {
      alamat = response.alamat;
    }

    await model.Puskesmas.update(
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
          `Berhasil Update Puskesmas dengan nama ${response.nama}`
        );
        res.status(201);
        res.redirect("/puskesmas");
      })
      .catch((result) => {
        req.flash("alert", {
          hex: "#f3616d",
          color: "danger",
          status: "Gagal Update Puskesmas baru",
        });
        res.redirect("/users");
      });
  },
  deletePuskesmas: async (req, res) => {
    const response = await model.Puskesmas.findOne({
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
    await model.Puskesmas.destroy({
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
          `Berhasil Hapus Puskesmas dengan nama ${response.nama}`
        );
        res.status(200);
        res.redirect("/puskesmas");
      })
      .catch((result) => {
        req.flash("alert", {
          hex: "#f3616d",
          color: "danger",
          status: "Gagal Hapus Puskesmas",
        });
        res.redirect("/puskesmas");
      });
  },
};
