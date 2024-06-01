// ==========================
// Requires
// ==========================
const compression = require("compression");
const express = require("express");
const app = express();
const router = require("./routes/router.js");

const films = require("./public/json/films.json");

// ==========================
// Configuration Express
// ==========================
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(compression());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// ==========================
// Configuration locals (global)
// ==========================
app.locals.films = films;

// ==========================
// Redirection vers le routeur
// ==========================

app.use("/", router);

// ==========================
// Lancement du serveur
// ==========================
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur en écoute http://localhost:${port}/`);
});