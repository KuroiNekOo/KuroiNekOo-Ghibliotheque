const { Router } = require("express");
const router = Router();

const view = require("../controllers/homeController.js");

router.get("/", view.get);

module.exports = router;