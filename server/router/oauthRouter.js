const express = require("express");
const {
    register,
    login,
    refresh,
    logout,
} = require("../controllers/loginController");
const router = express.Router();

router.get("/login/");
router.post("/register/", register);
router.post("/login/", login);
router.post("/refresh/", refresh);
router.post("/logout/", logout);

module.exports = {
    oAuthRouter: router,
};
