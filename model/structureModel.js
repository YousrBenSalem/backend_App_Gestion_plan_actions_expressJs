const mongoose = require ("mongoose")

const structureSchema = new mongoose.Schema ({
    nom : {type:String}, 
    abréviation : {type:String},
    

})


module.exports=mongoose.model ("structure",structureSchema)