const bcrypt = require("bcryptjs");
const model = require("../models/index");
module.exports = {
  users: async (req, res) => {
    const data = await model.User.findAll({
      attributes: ["uuid", "name", "email", "role", "status"],
    });
    res.render("./pages/users", { data });
  },
  storeUsers: async (req, res) => {
    let { name, email, role, password } = req.body;

    if (password === null) password = /(\w+)@/g.exec(email)[1];

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.log("hasdsadalo");
        return req.flash("alert", {
          hex: "#f3616d",
          color: "danger",
          status: "Failed",
        });
      }
      await model.User.create({
        name: name,
        email: email,
        role: role,
        password: hash,
      })
        .then((result) => {
          req.flash("alert", {
            hex: "#28ab55",
            color: "success",
            status: "Success",
          });
          req.flash("message", `User baru berhasil ditambahkan`);
          res.status(201);
        })
        .catch((result) => {
          console.log(result);
          req.flash("alert", {
            hex: "#f3616d",
            color: "danger",
            status: "Gagal Menambahkan users baru",
          });
        });
      res.redirect("/users");
    });
  },
  updateUser: async (req, res) => {
    let { name, email, role, password } = req.body;
    const response = await model.User.findOne({
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
    if (!password) {
      await model.User.update(
        {
          name,
          email,
          role,
          password: response.password,
        },
        {
          where: {
            uuid: req.params.uuid,
          },
        }
      )
        .then((result) => {
          req.flash("alert", {
            hex: "#28ab55",
            color: "success",
            status: "Success",
          });
          req.flash("message", `Berhasil Update User`);
          res.status(201);
          res.redirect("/users");
        })
        .catch((result) => {
          console.log(result);
          req.flash("alert", {
            hex: "#f3616d",
            color: "danger",
            status: "Gagal Update users baru",
          });
          res.redirect("/users");
        });
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return req.flash("alert", {
            hex: "#f3616d",
            color: "danger",
            status: "Failed",
          });
        }
        await model.User.update(
          {
            name,
            email,
            role,
            password: hash,
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
            req.flash("message", `Berhasil Update User`);
            res.status(201);
            res.redirect("/users");
          })
          .catch((result) => {
            console.log("catch");
            console.log(result);
            req.flash("alert", {
              hex: "#f3616d",
              color: "danger",
              status: "Gagal Update users baru",
            });
            res.redirect("/users");
          });
      });
    }
  },
  deleteUser: async (req, res) => {
    const response = await model.User.findOne({
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

    // await model.User.

  },
  categories: async (req, res) => {
    const data = await model.Category.findAll({
      attributes: ["name", "description"],
    });
    res.render("./pages/categories", { data });
  },
  storecategory: async (req, res) => {
    const { name, description } = req.body;
    await model.Category.create({
      name,
      description,
    })
      .then(() => {
        req.flash("alert", {
          hex: "#28ab55",
          color: "success",
          status: "Success",
        });
        req.flash("message", "Kategori berhasil ditambahkan");
        res.redirect("/categories");
      })
      .catch(() => {
        req.flash("alert", {
          hex: "#f3616d",
          color: "danger",
          status: "Failed",
        });
        req.flash("message", "Gagal menambahkan kategori");
        res.redirect("/categories");
      });
  },
};
