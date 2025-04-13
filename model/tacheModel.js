const mongoose = require ("mongoose")

const tacheSchema = new mongoose.Schema ({
    titre : {type:String}, 
    description : {type:String},
    avancement : {type:String},
    pieceJointe :{type:String},
    periorite :{type:String},
    //etat_validation :{type:String},
    sousActiviteId : {
                type : mongoose.Types.ObjectId,
                ref: "sousActivite"
            },
  


  
})


module.exports=mongoose.model ("tache",tacheSchema)