const bcrypt = require("bcrypt");
const userModel = require("../model/personneModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const accessKey = process.env.rtoken;
const refreshKey = process.env.ftoken;
const { join } = require("path");
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, accessKey, { expiresIn: "10m" });
};
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, refreshKey, { expiresIn: "1h" });
};
let refreshTokens = [];

module.exports = {
  /*  verify : async (req, res) => {
    try {
        const verifyCode = await userModel.findOne({ code: req.params.code });
        verifyCode.code = undefined;//supprimer
        verifyCode.verify = true;
        verifyCode.save();
        return res.sendFile(join(__dirname + "../../template/sucess.html"));
    } catch (err) {

        return res.sendFile(join(__dirname + "../../template/error.html"));
    }
}, */

  verify: async (req, res) => {
    try {
      const verifyCode = await userModel.findOne({ code: req.params.code });

      if (!verifyCode) {
        return res.sendFile(join(__dirname + "../../template/error.html"));
      }

      // Mise à jour sans déclencher `pre("save")`
      await userModel.updateOne(
        { _id: verifyCode._id },
        { $unset: { code: "" }, $set: { verify: true } }
      );

      return res.sendFile(join(__dirname + "../../template/sucess.html"));
    } catch (err) {
      return res.sendFile(join(__dirname + "../../template/error.html"));
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        res.status(400).json({
          message: "email doesnt exist",
        });
      } else {
        const pass = await bcrypt.compare(password, user.password);
        if (!pass) {
          res.status(400).json({
            message: "wrong password",
          });
        } else {
          const accessToken = generateAccessToken(user);
          const refreshToken = generateRefreshToken(user);
          refreshTokens.push(refreshToken);
          res.status(200).json({
            success: true,
            message: "correct email and password",
            data: user,
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
        }
      }
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "email wrong or doesnt exist " + err,
      });
    }
  },

  forgetPassword: async (req, res) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "wrong email",
      });
    } else {
      const generateAccessToken = jwt.sign({ id: user.id }, accessKey, {
        expiresIn: "5m",
      });
      await userModel.findOneAndUpdate(
        { email },
        { token: generateAccessToken },
        { new: true }
      );
      const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        secure: false,
        auth: {
          user: "5eb65c03cb943e",
          pass: "0d8fa1526d3e9d",
        },
      });

      const send = await transporter.sendMail({
        from: "youremail@email.com",
        to: user.email,
        subject: "sending emails",
        text: "test",
        html: `<b> click here to take your token</b>,<a href=http://localhost:3001/reset/${generateAccessToken}>clic</a>`,
      });
      res.status(200).json({
        success: true,
        message: "send email",
        data: user,
      });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const verifyToken = await jwt.verify(
        req.params.token,
        accessKey,
        async (error) => {
          if (error) {
            res.status(400).json({
              success: false,
              message: "failed to verify",
              data: null,
            });
          }
          const user = await userModel.findOne({ token: req.params.token });
          const newPassword = await req.body.password;
          user.password = newPassword;
          user.token = undefined;
          user.save();
          res.status(200).json({
            message: "you're able to change your password",
          });
        }
      );
    } catch {
      res.status(400).json({
        success: false,
        message: "unable to change your password",
        data: null,
      });
    }
  },

  logout: (req, res) => {
    const refreshtoken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshtoken);
    res.status(200).json({
      message: "Déconnexion réussie",
    });
  },
  changerMotDePasse: async (req, res) => {
    try {
      const { ancienMotDePasse, nouveauMotDePasse } = req.body;
      const userId = req.params.id;

      // Validation de l'ID
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Format ID invalide" });
      }

      // 1. Vérifier que l'utilisateur existe
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur non trouvé",
        });
      }

      // 2. Vérifier l'ancien mot de passe
      const isMatch = await bcrypt.compare(ancienMotDePasse, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Ancien mot de passe incorrect",
        });
      }

      user.password = nouveauMotDePasse;
      await user.save();

      // 4. Réponse de succès
      return res.status(200).json({
        success: true,
        message: "Mot de passe mis à jour avec succès",
      });
    } catch (error) {
      console.error("Erreur lors du changement de mot de passe:", error);
      return res.status(500).json({
        success: false,
        message: "Erreur serveur lors du changement de mot de passe",
        error: error.message,
      });
    }
  },
};
