const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require('./routes/user'); 
const app = express();
const cors = require('cors');
const port = process.env.PORT;

//cors
app.use(cors());

//middleware
app.use(express.json());
app.use('/api',userRouter)

app.get("/", (req, res) => {
    res.send('Bienvenido a mi API REST')
});

//MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Conexion a la BD es exitoso")
    })
    .catch((error) => {
        console.log(error);
    })

app.listen(port, () => console.log('server listening on port', port));