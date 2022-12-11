const path = require("path");

module.exports = {
  validateUserStore: (req, res, next) => {
    const message = [];
    // name min length 3
    if (!req.body.name || req.body.name.length < 3) {
      message.push("Please enter a name with min. 3 chars");
    }
    // password min 8 chars
    if (!req.body.password || req.body.password.length < 8) {
      message.push("Please enter a password with min. 8 chars");
    }
    // password (repeat) does not match
    if (
      !req.body.password_repeat ||
      req.body.password != req.body.password_repeat
    ) {
      message.push("Both passwords must match");
    }
    if (message.length) {
      return res.status(400).send({
        status: "Failed",
        message: message,
      });
    }
    next();
  },
  validateImages: (req, res, next) => {
    if (req.files === null) {
        req.flash("alert", { hex: "#f3616d", color: "danger", status: "Failed" });
        req.flash("message", "Pilih Gambar cuy");
        res.status(422);
        return res.redirect("/insertarticle");
    }
    const image = req.files.foto;
    const fileSize = image.data.length;
    if (fileSize > 5000000){
        req.flash("alert", { hex: "#f3616d", color: "danger", status: "Failed" });
        req.flash("message", "Gambar tidak boleh lebih dari 5Mb");
        res.status(422);
        return res.redirect("/insertarticle");
    }
    const ext = path.extname(image.name);
    const allowedPhotoExt = [".png", ".jpg", ".jpeg"];
    if (!allowedPhotoExt.includes(ext.toLowerCase())) {
      console.log("hali");
      req.flash("alert", { hex: "#f3616d", color: "danger", status: "Failed" });
      req.flash("message", "Hanya Menerima Format png,jpg,jpeg");
      res.status(422);
      return res.redirect("/insertarticle");
    }
    next();
  },
};
