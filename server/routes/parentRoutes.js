const express = require("express");
const {
  createParent,
  updateParent,
  deleteParent,
  loginParent,
  getParentById,
  getEnfantApps,
  lockEnfantApps,
} = require("../controllers/ParentController");

const router = express.Router();

router.get("/:idp", getParentById);

router.post("/", createParent);

router.post("/login", loginParent);

router.put("/:idp", updateParent);

router.delete("/:idp", deleteParent);

router.get("/apps/get-apps", getEnfantApps);

router.post("/apps/lock-apps", lockEnfantApps);

module.exports = router;
