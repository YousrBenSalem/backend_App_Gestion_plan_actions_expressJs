const mongoose = require ("mongoose")
const personneModel = require("./personneModel")
const responsableSchema = new mongoose.Schema ({
    prenom : {type:String}, 
    post : {type:String}, 
    adresse : {type:String},   
    telephone : {type:String}, 
    date_nomination : {type:String}, 
    image :{type:String},
    planId : [{
        type : mongoose.Types.ObjectId,
        ref:"plan"
    }]

    

})
personneModel.discriminator("responsable",responsableSchema)
module.exports=mongoose.model ("responsable")