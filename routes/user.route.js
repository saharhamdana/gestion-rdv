const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.get('/all',async(req,res)=>{
    try {
        const users = await User.find()
        res.status(200).send(users)

    } catch (error) {
        res.status(500).send(error)
        
    }
})

router.get('/:email',async(req,res)=>{
    try {
        const email = req.params.email
        const user = await User.findOne({email})
        if (!user){
            res.status(404).send({message:"user not found"})
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ msg: "Utilisateur introuvable" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

module.exports = router;
