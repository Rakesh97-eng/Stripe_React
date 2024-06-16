const express = require('express')
const router = express.Router()
const { createCustomer, createSubscription } = require("../controller/paymentController");

router.post("/create-customer", createCustomer);
router.post("/create-subscription", createSubscription);

module.exports = router;