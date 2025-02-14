const userController = require ("../controller/userController")
const route = require ("express").Router()
const upload = require ("../middleware/upload")
const authentificationToken = require("../middleWare/authenticateToken")



route.post("/add",upload.single("image"),userController.createUser)
route.get("/get",authentificationToken ,userController.getAllUsers)
route.get("/get/:id",authentificationToken ,userController.getUserById)
route.delete("/delete/:id",authentificationToken,userController.deleteUser)
route.put("/update/:id",authentificationToken,upload.single("image"),userController.updateUser)





module.exports = route