const mongoose = require ("mongoose")
const personneModel = require("./personneModel")

const adminSchema = new mongoose.Schema ({
})
personneModel.discriminator("admin",adminSchema)
module.exports=mongoose.model ("admin")