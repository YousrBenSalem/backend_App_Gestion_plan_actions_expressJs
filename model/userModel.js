const mongoose = require ("mongoose")
const personneModel = require("./personneModel")

const userSchema = new mongoose.Schema ({
    prenom : {type:String}, 
    image : {type :String}
    

})
personneModel.discriminator("user",userSchema)
module.exports=mongoose.model ("user")