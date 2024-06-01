const { Router } = require("express");
const router = Router();

const view = require("../controllers/moviesController.js");

router.get("/films", view.get);

module.exports = router;