require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./config/index');
const todoRoute = require('./routes/todo');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 5000;


// manage request
app.use('/todo',todoRoute)

app.listen(PORT,()=>{
    console.log("server listining at POrt ",PORT);
})


