const { response } = require("express")
const responsableModel = require ("../model/responsableModel")
const {randomBytes} = require("crypto");
const code = randomBytes(6).toString("hex");
const nodemailer = require("nodemailer");



module.exports = {

    createResponsable : async (req,res) => {
        try {
      const { email } = req.body; 

      const existingResponsable = await responsableModel.findOne({ email: email });

      if (existingResponsable) {
        return res.status(400).json({
          success: false,
          message: "Responsable already exists with this email",
          data: null,
        });
      }
      if (req.file) {
                    req.body.image = req.file.filename;
              }
      const resp = await responsableModel ({...req.body , code :code})
      const savedresp = await resp.save()
      res.status(200).json ({
          success : true,
          message :"created successfully",
          data: savedresp
      })
      const transport = nodemailer.createTransport({
    host :"sandbox.smtp.mailtrap.io",
        port : 2525,
        secure : false ,
        auth : {
            user : '5eb65c03cb943e',
            pass : '0d8fa1526d3e9d'

        }
  });
        transport.sendMail({
            from: "admin@gmail.com",
            to: savedresp.email,
            subject: "hello"+" "+ savedresp.nom,
            text: "mail de confirmation",
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <h1>verify account</h1>
                <a href ="http://localhost:3000/personne/verify/${savedresp.code}"> click here </a>
              
            </body>
            </html>`
        })
     } 
     catch {
      console.error("Erreur lors de la création de responsable:", error);
      res.status(400).json ({
          success: false,
          message:"creation failed",
          data:null
      })
     }
  },
  
  
  getAllRespos : async (req,res) => {
      try {
          const resp = await responsableModel.find()
          res.status(200).json({
              success:true,
              message:"responsables found",
              data:resp
          })
      }
      catch {
          res.status(400).json ({
              success:false,
              message:"failed to find responsable",
              data:null 
          })
      }
  },
  
  getRespById : async (req, res) => {
    try {
      const respId = req.params.id; 
      const resp = await responsableModel.findById(respId); 

      if (!resp) {
        return res.status(404).json({
          success: false,
          message: "Resp not found",
          data: null,
        });
      }

      res.status(200).json({
        success: true,
        message: "Resp found",
        data: resp,
      });
    } catch (error) {
      console.error("Erreur lors de la recherche de responsable :", error);
      res.status(500).json({
        success: false,
        message: "Erreur interne du serveur",
        data: null,
      });
    }
  },
  
  
  deleteRespo : async (req, res) => {
      try {
      
          const respoId = req.params.id
          const existingRespo = await responsableModel.findById(respoId);

          if (!existingRespo) {
            return res.status(404).json({
              success: false,
              message: "Resp not found", 
              data: null,
            });
          }
          const respo = await responsableModel.findByIdAndDelete(respoId)
          res.status(200).json({
              success: true,
              message: "reponsable deleted",
              data: respo
          })
      }
      catch {
          res.status(400).json({
              success: false,
              message: "responsable not deleted",
              data: null
          })
      }
  },
   
  updateRespo : async (req,res) => {
      try {
          const respoId = req.params.id

  const existingRespo = await responsableModel.findById(respoId);
        if (!existingRespo) {
            return res.status(404).json({
                success: false,
                message: "Respo not found",
                data: null
            });
        }
    if (req.file) {
            req.body.image = req.file.filename;
        } else {
            req.body.image = existingRespo.image; 
        }

  console.log("🔍 Champs reçus:", req.body);
  console.log("🖼️ Fichier reçu:", req.file);
          const respo = await responsableModel.findByIdAndUpdate(respoId,req.body,{new:true})
          res.status(200).json({
              success:true,
              message:"update successful",
              data:respo
          })
      
      }
      catch {
          res.status(400).json ({
              success:false,
              message:"failed to update",
              data:null
          })
      }
  },
   

}