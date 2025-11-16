const express = require("express");
const router = express.Router();
const { getwalletAmount,getallTransaction } = require("../Controllers/Wallet");

router.post("/getwalletAmount", getwalletAmount);
router.post("/getwalletTransaction", getallTransaction);

module.exports = router;