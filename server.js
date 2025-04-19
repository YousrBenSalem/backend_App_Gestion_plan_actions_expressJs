const express = require("express");
const env = require("dotenv").config();
const cors = require("cors");

const port = 3000;
const app = express();
const connectDB = require("./db");
connectDB();
app.use(cors());
app.use(express.json());

//
const adminRouter = require("./routers/adminRouter");
app.use("/admin", adminRouter);

const respoRouter = require("./routers/responsableRouter");
app.use("/responsable", respoRouter);

const userRouter = require("./routers/userRouter");
app.use("/user", userRouter);

const secteurRouter = require("./routers/secteurRouter");
app.use("/secteur", secteurRouter);

const structureRouter = require("./routers/structureRouter");
app.use("/structure", structureRouter);

const planRouter = require("./routers/planActionRouter");
app.use("/plan", planRouter);

const activiteRouter = require("./routers/activiteRouter");
app.use("/activite", activiteRouter);

const sousActiviteRouter = require("./routers/sousActiviteRouter");
app.use("/sousActivite", sousActiviteRouter);

const tacheRouter = require("./routers/tacheRouter");
app.use("/tache", tacheRouter);

const personneRouter = require("./routers/personneRouter");
app.use("/personne", personneRouter);

app.get("/storage/:img", (req, res) => {
  res.sendFile(__dirname + "/storage/" + req.params.img);
});
/* app.get('/storage/:img', (req, res) => {
    const imagePath = path.join(__dirname, "storage", req.params.img);
    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.status(404).send("Image non trouvée");
    }
}); */

app.listen(port, function () {
  console.log(
    `the server is running with ${process.env.PORT} open at http://localhost:${process.env.PORT}`
  );
});
