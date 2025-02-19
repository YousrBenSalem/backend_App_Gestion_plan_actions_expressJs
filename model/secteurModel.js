const mongoose = require ("mongoose")

const secteurSchema = new mongoose.Schema ({
    libelle : {type:String}, 
    code : {type:String}, 
    structureId : [{
            type : mongoose.Types.ObjectId,
            ref: "structure"
        }],

  

})


module.exports=mongoose.model ("secteur",secteurSchema)