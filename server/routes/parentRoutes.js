const express = require("express");
const {
  createParent,
  updateParent,
  deleteParent,
  loginParent,
  getParentById,
  getEnfantApps,
  lockEnfantApps,
  linkEnfantToParent
} = require("../controllers/ParentController");

const router = express.Router();

router.get("/:idp", getParentById);

router.post("/", createParent);

router.post("/login", loginParent);

router.put("/:idp", updateParent);

router.delete("/:idp", deleteParent);

router.get("/apps/get-apps/:idenf", getEnfantApps);

router.post("/apps/lock-apps", lockEnfantApps);

router.post("/link/:idp/:idenf", linkEnfantToParent);

module.exports = router;
