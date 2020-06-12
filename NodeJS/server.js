const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

const routes = require('./src/routes');

//Iniciando o App
const app = express();
app.use(cors());
app.use(express.json());

//Iniciando o DB
mongoose.connect('mongodb://localhost:27017/nodeapi', {
   useUnifiedTopology: true,
   useNewUrlParser:true,
   useCreateIndex: true
});

requireDir('./src/models');

app.use('/api', routes);
app.listen('3000', ()=>{
   console.log('Server Running on Port 3000');
});