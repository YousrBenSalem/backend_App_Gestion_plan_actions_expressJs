const userController = require ("../controller/userController")
const route = require ("express").Router()
const upload = require ("../middleware/upload")
//const authentificationToken = require("../middleWare/authenticateToken")



route.post("/add",upload.single("image"),userController.createUser)
route.get("/get" ,userController.getAllUsers)
route.get("/get/:id" ,userController.getUserById)
route.delete("/delete/:id",userController.deleteUser)
route.put("/update/:id",upload.single("image"),userController.updateUser)





module.exports = route