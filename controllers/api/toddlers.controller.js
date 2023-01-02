const model = require("../../models/index");

module.exports = {
  getAllToddlers: async (req, res) => {
    await model.Toddler.findAll()
      .then((result) => {
        res
          .status(200)
          .json({ status: "Success", message: "Fetch data berhasil", result });
      })
      .catch((err) => {
        res.status(404).json({
          status: err.message,
          message: "Data tidak ditemukan",
        });
      });
  },
  getSpesicificToddler: async (req, res) => {
    try {
      const data = await model.Toddler.findOne({
        where: {
          uuid: req.params.uuid,
        },
      });
      if (!data)
        return res
          .status(404)
          .json({ status: "Failed", message: "data tidak ditemukan" });
      res.status(200).json({
        status: "Success",
        message: "Fetch Data Berhasil",
        data,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  storeToddler: async (req, res) => {
    const {
      noKk,
      nik,
      noBpjs,
      name,
      birth,
      anakKe,
      nikAyah,
      namaAyah,
      noBpjsAyah,
      nikIbu,
      namaIbu,
      noBpjsIbu,
      address,
      prov,
      kab,
      kec,
      puskesmas,
      posyandu,
      jk,
    } = req.body;
    await model.Toddler.create({
      no_kk: noKk,
      nik,
      no_bpjs: noBpjs,
      name,
      jk,
      birth,
      anak_ke: anakKe,
      nik_ayah: nikAyah,
      nama_ayah: namaAyah,
      no_bpjs_ayah: noBpjsAyah,
      nik_ibu: nikIbu,
      nama_ibu: namaIbu,
      no_bpjs_ibu: noBpjsIbu,
      address,
      prov,
      kab,
      kec,
      puskesmas,
      posyandu,
    })
      .then(() => {
        res.status(201).json({
          status: "Success",
          message: "Data Berhasil Ditambahkan",
        });
      })
      .catch((err) => {
        if (err) {
          return res
            .status(400)
            .json({ status: "Failed", message: err.message });
        }
      });
  },
  editToddler: async (req, res) => {
    const data = await model.Toddler.findOne({
      where: {
        uuid: req.params.uuid,
      },
    });

    if (!data)
      return res.status(404).json({
        status: "Failed",
        message: "Data tidak ditemukan",
      });
    const {
      noKk,
      nik,
      noBpjs,
      name,
      birth,
      anakKe,
      nikAyah,
      namaAyah,
      noBpjsAyah,
      nikIbu,
      namaIbu,
      noBpjsIbu,
      address,
      prov,
      kab,
      kec,
      puskesmas,
      posyandu,
      jk,
    } = req.body;
    await model.Toddler.update(
      {
        no_kk: noKk,
        nik,
        no_bpjs: noBpjs,
        name,
        jk,
        birth,
        anak_ke: anakKe,
        nik_ayah: nikAyah,
        nama_ayah: namaAyah,
        no_bpjs_ayah: noBpjsAyah,
        nik_ibu: nikIbu,
        nama_ibu: namaIbu,
        no_bpjs_ibu: noBpjsIbu,
        address,
        prov,
        kab,
        kec,
        puskesmas,
        posyandu,
      },
      {
        where: {
          uuid: req.params.uuid,
        },
      }
    )
      .then((result) => {
        res.status(200).json({
          status: "Success",
          message: "Update Data Berhasil",
        });
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({
            status: "Failed",
            message: err.message,
          });
        }
      });
  },
};
