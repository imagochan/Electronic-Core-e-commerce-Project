const express = require("express"),
    router = express.Router(),
    userController = require("../controller/api/userController");

router.get("/user/:username", userController.getId);
router.get("/user", userController.getId);

router.post("/user", userController.create);

router.put("/user/:username", userController.update);
router.delete("/user/:username", userController.delete);

module.exports = router;
