

const express = require("express");
const router = express.Router();
const { install } = require("../controllers/install.controller");

router.post("/install", install);

module.exports = router;