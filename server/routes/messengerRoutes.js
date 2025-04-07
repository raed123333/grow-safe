const express = require("express");
const router = express.Router();
const messengerController = require("../controllers/messengerController");

router.post("/send", messengerController.sendMessage);
router.get("/messages/:user_id/:user_type", messengerController.getMessages);
router.delete("/delete/:idmess", messengerController.deleteMessage);

module.exports = router;
