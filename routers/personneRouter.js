const { Router } = require("express")
const personneController = require ("../controller/personController")
const route = require ("express").Router()


route.get("/verify/:code",personneController.verify);

route.post("/login",personneController.login)
route.post("/forget",personneController.forgetPassword)
route.post("/reset/:token",personneController.resetPassword)
route.post("/logout",personneController.logout);




module.exports = route