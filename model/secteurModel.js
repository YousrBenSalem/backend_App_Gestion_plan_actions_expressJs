const mongoose = require ("mongoose")

const secteurSchema = new mongoose.Schema ({
    libelle : {type:String}, 
  

})


module.exports=mongoose.model ("secteur",secteurSchema)