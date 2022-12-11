const bcrypt = require("bcryptjs");
const { response } = require("express");
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

    if (!name) name = response.name;

    if (!email) email = response.email;

    if (!role) role = response.role;

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return req.flash("alert", {
          hex: "#f3616d",
          color: "danger",
          status: "Failed",
        });
      }
      if (!password) {
        password = response.password;
      } else {
        password = hash;
      }

      await model.User.update(
        {
          name,
          email,
          role,
          password,
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
            `Berhasil Update User dengan nama ${response.name}`
          );
          res.status(201);
          res.redirect("/users");
        })
        .catch((result) => {
          req.flash("alert", {
            hex: "#f3616d",
            color: "danger",
            status: "Gagal Update users baru",
          });
          res.redirect("/users");
        });
    });
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
    await model.User.destroy({
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
          `Berhasil Hapus User dengan nama ${response.name}`
        );
        res.status(200);
        res.redirect("/users");
      })
      .catch((result) => {
        req.flash("alert", {
          hex: "#f3616d",
          color: "danger",
          status: "Gagal Hapus users",
        });
        res.redirect("/users");
      });
  },
  categories: async (req, res) => {
    const data = await model.Category.findAll({
      attributes: ["uuid", "name", "description"],
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
  updateCategory: async (req, res) => {
    let { name, description } = req.body;
    const response = await model.Category.findOne({
      where: {
        uuid: req.params.uuid,
      },
    });
    if (!response) {
      req.flash("alert", {
        hex: "#f3616d",
        color: "danger",
        status: "Failed",
      });
      req.flash("message", "Category tidak ditemukan");
      res.redirect("/categories");
    }
    if (!name) name = response.name;
    if (!description) description = response.description;

    await model.Category.update(
      {
        name,
        description,
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
        req.flash(
          "message",
          `Kategori dengan nama ${response.name} berhasil diupdate`
        );
        res.redirect("/categories");
      })
      .catch((result) => {
        req.flash("alert", {
          hex: "#f3616d",
          color: "danger",
          status: "Failed",
        });
        req.flash("message", "Category gagal diupdate");
        res.redirect("/categories");
      });
  },
  deleteCategory: async (req, res) => {
    const response = await model.Category.findOne({
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
    await model.Category.destroy({
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
          `Berhasil Hapus Kategori dengan nama ${response.name}`
        );
        res.status(200);
        res.redirect("/categories");
      })
      .catch((result) => {
        req.flash("alert", {
          hex: "#f3616d",
          color: "danger",
          status: "Gagal Hapus Kategori",
        });
        res.redirect("/categories");
      });
  },
  editStatusUser: async (req, res) => {
    let statusUpdate;
    let dump;
    const data = await model.User.findOne({
      where: {
        uuid: req.params.uuid,
      },
    });
    if (data.status === "active") {
      statusUpdate = "inactive";
      dump = "Menonaktifkan";
    } else {
      statusUpdate = "active";
      dump = "Mengaktifkan";
    }

    await model.User.update(
      {
        status: statusUpdate,
      },
      {
        where: { uuid: req.params.uuid },
      }
    )
      .then((result) => {
        req.flash("alert", {
          hex: "#28ab55",
          color: "success",
          status: "Success",
        });
        req.flash("message", `Berhasil ${dump} akun dengan nama ${data.name}`);
        res.redirect("/users");
      })
      .catch((result) => {
        req.flash("alert", {
          hex: "#f3616d",
          color: "danger",
          status: "Failed",
        });
        req.flash(
          "message",
          `Gagal gagal ${dump} akun dengan nama ${data.name}`
        );
        res.redirect("/users");
      });
  },
};
