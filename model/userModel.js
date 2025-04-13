const mongoose = require ("mongoose")
const personneModel = require("./personneModel")

const userSchema = new mongoose.Schema ({
    prenom : {type:String}, 
    image : {type :String},
    adresse:{type:String},
    status:{type:String , default:"pending"},

    fonction:{type:String},
    telephone:{type:String},
    activiteId : [{
            type : mongoose.Types.ObjectId,
            ref:"activite"
        }],


    

})
personneModel.discriminator("user",userSchema)
module.exports=mongoose.model ("user")