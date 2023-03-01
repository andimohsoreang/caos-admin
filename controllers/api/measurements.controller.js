// const dirname = `${__dirname}/..`;
// const { existsSync, writeFile } = require("fs");
// const xlsx = require("xlsx");
// const datasetConfig = require(`${__dirname}/../../config/dataset.json`);
// const datasetPath = `${__dirname}/../config/dataset.json`;`
const model = require("../../models/index");
// // const algorithm = require("../helpers/algorithm.helper");
// // const { splitData } = require("../utils");
// // const tf = require("@tensorflow/tfjs");
// // const scikitjs = require("scikitjs");
// // scikitjs.setBackend(tf);
// // const anthropometricTable = require(`${dirname}/public/assets/standar-antropometri.json`);
const readFileDataset = () => {
  const path = __dirname + "/../public/uploads/" + datasetConfig.fileName;
  let data = [];
  if (existsSync(path)) {
    const workbook = xlsx.readFile(path);
    const sheet_name_list = workbook.SheetNames;
    sheet_name_list.forEach((y) => {
      const worksheet = workbook.Sheets[y];
      let headers = {};
      for (z in worksheet) {
        if (z[0] === "!") continue;

        //parse out the column, row, and value
        let tt = 0;
        for (let i = 0; i < z.length; i++) {
          if (!isNaN(z[i])) {
            tt = i;
            break;
          }
        }
        const col = z.substring(0, tt);
        const row = parseInt(z.substring(tt));
        const value = worksheet[z].v;

        //store header names
        if (row == 1 && value) {
          headers[col] = value;
          continue;
        }

        if (!data[row]) data[row] = {};
        data[row][headers[col]] = value;
      }
      //drop those first two rows which are empty
      data.shift();
      data.shift();
    });
    // console.log(data)
  }
  return data;
};
const getUnique = (array) => {
  var uniqueArray = [];
  // Loop through array values
  for (var value of array) {
    if (uniqueArray.indexOf(value) === -1) {
      uniqueArray.push(value);
    }
  }
  return uniqueArray;
};
const getZscore = (type, age, bb, tb, method, jk) => {
  let obj, x, dividend, divisor, quotient, result, rangeAge;

  switch (type) {
    case "BBU":
      rangeAge = "0-60";
      x = bb;
      y = age;
      jsonKey = "Umur";
      break;
    case "TBU":
      x = tb;
      y = age;
      jsonKey = "Umur";
      if (age == 24) {
        if (method == "telentang") {
          type = "PBU";
          rangeAge = "0-24";
        } else {
          rangeAge = "24-60";
        }
      } else if (age < 24) {
        type = "PBU";
        rangeAge = "0-24";
      } else {
        rangeAge = "24-60";
      }
      break;
    case "BBTB":
      x = bb;
      y = tb;
      if (age < 24 && tb > 45.0 && tb < 110.0) {
        type = "BBPB";
        jsonKey = "Panjang Badan";
        rangeAge = "0-24";
      } else {
        jsonKey = "Tinggi Badan";
        rangeAge = "24-60";
      }
      break;
    default:
      return false;
  }

  const key = `${type}.${jk}.${rangeAge}`;
  obj = anthropometricTable[key].find((e) => e[jsonKey] == y);
  dividend = x - obj.Median;

  if (x < obj.Median) {
    divisor = obj.Median - obj["-1sd"];
  } else {
    divisor = obj["+1sd"] - obj.Median;
  }

  quotient = dividend / divisor;
  result = getCategoty(type, quotient);

  return { zs: quotient, status: result, rekom: obj.Median };
};
const getCategoty = (type, quotient) => {
  let status;
  switch (type) {
    case "BBU":
      if (quotient < -3) {
        status = "Berat Badan Sangat Kurang (severely underweight)";
      } else if (quotient <= -2) {
        status = "Berat badan kurang (underweight)";
      } else if (quotient <= 1) {
        status = "Berat badan normal";
      } else {
        status = "Risiko Berat badan lebih";
      }
      break;
    case "TBU":
    case "PBU":
      if (quotient < -3) {
        status = "Sangat pendek (severely stunted)";
      } else if (quotient <= -2) {
        status = "Pendek (stunted)";
      } else if (quotient <= 3) {
        status = "Normal";
      } else {
        status = "Tinggi";
      }
      break;
    case "BBPB":
    case "BBTB":
      if (quotient < -3) {
        status = "Gizi buruk (severely wasted)";
      } else if (quotient <= -2) {
        status = "Gizi kurang (wasted)";
      } else if (quotient <= 1) {
        status = "Gizi baik (normal)";
      } else if (quotient <= 2) {
        status = "Berisiko gizi lebih (possible risk of overweight)";
      } else if (quotient <= 3) {
        status = "Gizi lebih (overweight)";
      } else {
        status = "Obesitas (obese)";
      }
      break;

    default:
      break;
  }
  return status;
};

module.exports = {
  getAllMeasurements: async (req, res) => {
    await model.Measurement.findAll({
      include: { model: model.Toddler, attributes: ["uuid", "name"] },
    })
      .then((result) => {
        res.status(200).json({
          status: "Success",
          message: "Fetch data berhasil",
          data: result,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "Failed",
          message: err.message,
        });
      });
  },
  getDetailMeasurements: async (req, res) => {
    const data = await model.Measurement.findOne({
      where: {
        uuid: req.params.uuid,
      },
    });
    if (!data)
      return res.status(404).json({
        status: "Failed",
        message: "Data tidak ditemukan",
      });
    await model.Measurement.findOne({
      include: { model: model.Toddler, attributes: ["uuid", "name"] },
      where: {
        uuid: req.params.uuid,
      },
    })
      .then((result) => {
        res.status(200).json({
          status: "Success",
          message: "Fetch data berhasil",
          data: result,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "Failed",
          message: err.message,
        });
      });
  },
  storeMeasurement: async (req, res) => {
    const { uuid, date, age, bb, tb, method, vitamin } = req.body;
    const toddler = await model.Toddler.findOne({ where: { uuid: uuid } });
    console.log(uuid);
    if (!toddler) {
      // objek bernilai null, jadi keluar dari fungsi
      return res.status(400).json({
        status: "Failed",
        message: "Anak tidak ditemukan",
      });
    }
    const { id, jk } = toddler;

    if (
      (age < 24 && method === "berdiri") ||
      (age > 24 && method === "telentang")
    ) {
      return res.status(400).json({
        status: "Failed",
        message: "Terjadi kesalahan dalam pengukuran!",
      });
    }
    const bbu = getZscore("BBU", +age, +bb, +tb, method, jk);
    const tbu = getZscore("TBU", +age, +bb, +tb, method, jk);
    const bbtb = getZscore("BBTB", +age, +bb, +tb, method, jk);
    const {
      predict_result,
      predict_accuracy,
      predict_proba_x,
      predict_proba_y,
    } = await algorithm.prediction(
      +bb,
      +tb,
      +age,
      jk == "L" ? 1 : 0,
      splitData(readFileDataset())
    );
    await model.Measurement.create({
      date,
      bb,
      tb,
      bbu: bbu.status,
      tbu: tbu.status,
      bbtb: bbtb.status,
      zbbu: bbu.zs,
      ztbu: tbu.zs,
      zbbtb: bbtb.zs,
      rekombbu: bbu.rekom,
      rekomtbu: tbu.rekom,
      rekombbtb: bbtb.rekom,
      method,
      vitamin,
      current_age: age,
      id_toddler: id,
      predict_result,
      predict_accuracy,
      predict_proba_x,
      predict_proba_y,
    })
      .then(() => {
        res.status(201).json({
          status: "Success",
          message: "Data Berhasil Ditambahkan",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          status: "Failed",
          message: err.message,
        });
      });
  },
};
