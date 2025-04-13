const mongoose = require ("mongoose")
const bcrypt = require ("bcrypt")
const baseOptions = {discriminatorKey : "itemType",collection: "items"}

const personneSchema = new mongoose.Schema ({
    nom : {type:String}, 
    email : {type:String},
    password : {type:String},
    token : {type:String},
    verify: {
        type: Boolean,
        default: false
    },
    code: {type: String},

},baseOptions)
personneSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next(); // ✅ Ne pas re-hasher si le mot de passe n'a pas changé

        if (!this.password) {
            throw new Error("Le mot de passe est obligatoire !");
        }

        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds); // ✅ Hasher correctement
        next();
    } catch (error) {
        next(error); // ✅ Gérer les erreurs correctement
    }
});
module.exports=mongoose.model ("personne",personneSchema)