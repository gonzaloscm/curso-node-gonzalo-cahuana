const express = require('express');
const userSchema = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authenticateToken = require('../middleware');

router.get('/protected', authenticateToken, (req, res) => {
    try{
        res.send('Exitoso');
    }catch(error){
        console.log(error);
    }
})

//register
router.post("/register", async (req, res) => {
    try{
        const newUser = new userSchema(req.body);
        await newUser.save();
        res.status(201).send('usuario registrado con exito');
    }catch(e){
        res.status(400).send(e);
    }
});


router.post('/login', async (req, res) => {
    try{
        const user = await userSchema.findOne({email: req.body.email});
        if(!user || !(await bcrypt.compare(req.body.password, user.password))){
            throw new Error('Credenciales invalidas');
        }

        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET, {expiresIn: "1h"})
        res.status(200).send({token});
    }catch(e){
        res.status(400).send(e.message);
    }
})

//create user
 router.post("/user", (req, res) => {
    //res.send("Usuario creado");
    const user = userSchema(req.body);
    user.save()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({message:error});
        })
 });

 //get all user
 router.get("/users", (req, res) => {
    userSchema.find()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({message:error});
        })
 })

 //Get user by id
 router.get("/user/:id", (req, res) => {
    const { id } = req.params;
    userSchema.findById(id)
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({message:error});
        });
 });

 //Update user
 router.put("/user/:id", (req, res) => {
    const { id } = req.params;
    const {name,age,email} = req.body;

    userSchema.updateOne({_id:id},{$set: {name, age, email}})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error})
        })
 })

 //Delete user
 router.delete("/user/:id", (req, res) => {
    const { id } = req.params;
    userSchema.deleteOne({_id:id})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error});
        })
 })

 module.exports = router;