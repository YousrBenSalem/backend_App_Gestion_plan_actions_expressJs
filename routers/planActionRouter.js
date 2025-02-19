const planActionController = require ("../controller/planActionController")
const route = require ("express").Router()
//const authentificationToken = require("../middleWare/authenticateToken")


route.post("/add",planActionController.createPlanAction)
route.get("/get",planActionController.getAllPlans)
route.get("/get/:id",planActionController.getPlanById)
route.delete("/delete/:id",planActionController.deletePlan)
route.put("/update/:id",planActionController.updatePlan)





module.exports = route