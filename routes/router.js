const { Router } = require("express");
const router = Router();

// ==========================
// Définition des routes
// ==========================

router.use("/", require("./home.js"));

router.use("/", require("./movies.js"));

router.use("/", require("./details.js"));

router.use("/", require("./search.js"));

router.use("/404", (_, res) => {

  res.render("404.ejs");

});

module.exports = router;