const mongoose = require ("mongoose")

const tacheSchema = new mongoose.Schema ({
    titre : {type:String}, 
    description : {type:String},
    avancement : {type:String},
    pieceJointe :{type:String},
  
})


module.exports=mongoose.model ("tache",tacheSchema)