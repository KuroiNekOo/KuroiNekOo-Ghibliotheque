const { Router } = require("express");
const router = Router();

const view = require("../controllers/searchController.js");

router.get("/search", view.get);

module.exports = router;