require("dotenv").config();
const express = require("express");
const sequelize = require("./bd");
const path = require("path");
require("./models/user");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, "../public/HTML")));

app.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname, "../public"));
});

const authRouter = require ("./routes/auth");
app.use("/api", authRouter);


const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error("Error starting server:", error);
  }
};


// после всех app.use и маршрутов
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../public/HTML/404.html"));
});




start();
  