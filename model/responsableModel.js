const mongoose = require ("mongoose")
const personneModel = require("./personneModel")
const responsableSchema = new mongoose.Schema ({
    prenom : {type:String}, 
    post : {type:String}, 
    image :{type:String}

    

})
personneModel.discriminator("responsable",responsableSchema)
module.exports=mongoose.model ("responsable")