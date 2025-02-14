const mongoose = require ("mongoose")

const activiteSchema = new mongoose.Schema ({
    titre : {type:String}, 
    description : {type:String},
    budget : {type:Number},
    Date_prevu : {type:String},
    Date_lancement : {type:String},
    Date_fin_prevu : {type:String},
    Date_fin_lanc : {type:String},
    TypeFinancement : {type:String},


})


module.exports=mongoose.model ("activite",activiteSchema)