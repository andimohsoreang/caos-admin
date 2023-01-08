const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 3000;

app.use(fileUpload());
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

// config data http
app.use(bodyParser.json());

// config library session
app.use(
  session({
    secret: "caosBayesGakNgotak",
    saveUninitialized: true,
    resave: true,
    name: "secretName",
    cookie: {
      sameSite: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);
app.use(flash());
app.use((req, res, next) => {
    res.locals.alert = req.flash("alert");
    res.locals.message = req.flash("message");
    baseUrl = `${req.protocol}://${req.headers.host}`
    dirName = __dirname
    next();
});

const web = require("./routes/web.js");
app.use("/", web);

const api = require("./routes/api.js");
app.use("/api", api);

app.use((req, res, next) => {
  res.status(404);
  if (req.accepts("html")) {
    return res.render("./errors/404", { baseUrl });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
