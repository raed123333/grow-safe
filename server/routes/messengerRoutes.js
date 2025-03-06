const express = require('express');
const {getMessenger,createMessenger} = require("../controllers/MessengerController");

const router = express.Router();

router.get('/', getMessenger);
router.post('/', createMessenger);

module.exports = router;