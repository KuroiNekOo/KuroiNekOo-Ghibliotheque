const { Router } = require("express");
const router = Router();

const view = require("../controllers/detailsController.js");

router.get("/films/:id", view.get);

module.exports = router;