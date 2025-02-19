const mongoose = require ("mongoose")

const structureSchema = new mongoose.Schema ({
    nom : {type:String}, 
    lieu : {type:String},
      planId : {
                type : mongoose.Types.ObjectId,
                ref: "plan"
            },
            secteurId : {
                type : mongoose.Types.ObjectId,
                ref: "secteur"
            },
    

})


module.exports=mongoose.model ("structure",structureSchema)