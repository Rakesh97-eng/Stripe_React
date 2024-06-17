const express = require('express')
const router = express.Router()
const { createCustomer, createSubscription, handleWebhook } = require("../controller/paymentController");

router.post("/create-customer", createCustomer);
router.post("/create-subscription", createSubscription);
router.post('/webhook', express.raw({type:'application/json'}),handleWebhook);

module.exports = router;