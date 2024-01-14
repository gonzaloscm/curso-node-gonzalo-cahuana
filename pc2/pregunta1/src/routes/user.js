const express = require('express');
const userSchema = require('../models/user');
const router = express.Router();

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