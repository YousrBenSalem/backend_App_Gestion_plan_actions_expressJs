const adminController = require ("../controller/adminController")
const route = require ("express").Router()
const authentificationToken = require("../middleWare/authenticateToken")


route.post("/add",adminController.createAdmin)
route.get("/get",authentificationToken ,adminController.getAllAdmins)
route.get("/get/:id", authentificationToken,adminController.getAdminById)
route.delete("/delete/:id", authentificationToken ,adminController.deleteAdmin)
route.put("/update/:id",authentificationToken ,adminController.updateAdmin)





module.exports = route