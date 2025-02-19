const mongoose = require ("mongoose")
const personneModel = require("./personneModel")

const userSchema = new mongoose.Schema ({
    prenom : {type:String}, 
    image : {type :String},
    adresse:{type:String},
    fonction:{type:String},
    telephone:{type:String},
    activiteId : [{
            type : mongoose.Types.ObjectId,
            ref:"activite"
        }],
    tacheId : [{
            type : mongoose.Types.ObjectId,
            ref:"tache"
        }]

    

})
personneModel.discriminator("user",userSchema)
module.exports=mongoose.model ("user")