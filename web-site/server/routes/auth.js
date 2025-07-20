const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email si parola obligatorie" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Utilizator existent" });
    }

    const user = await User.create({ email, password });
    res.status(201).json({ message: "Utilizator creat" });
  } catch (error) {
    console.error("Erroare register", error);
    res.status(500).json({ message: "Server error" });
  }
})
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email si parola obligatorie" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Utilizator nu a fost gasit" });
    }

    const valid = await user.validatePassword(password);
    if (!valid) {
      return res.status(400).json({ message: "Parola incorecta" });
    }

    res.json({ message: "Intrat cu succes" });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Erorr" });
  }
});




module.exports = router;
