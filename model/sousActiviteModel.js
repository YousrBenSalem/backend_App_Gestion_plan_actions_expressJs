const mongoose = require ("mongoose")

const sousActiviteSchema = new mongoose.Schema ({
    titre : {type:String}, 
    description : {type:String},

    Date_lancement : {type:String},
    etat: {type:String , default:"To Do"},
    //pourcentage_avancement : {type:Number},
    activiteId : {
            type : mongoose.Types.ObjectId,
            ref: "activite"
        },
          tacheId : [{
            type : mongoose.Types.ObjectId,
            ref: "tache"
        }],
})


module.exports=mongoose.model ("sousActivite",sousActiviteSchema)