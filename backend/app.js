const express = require('express');

const userRoute=require("./routes/user")

const bookRoute=require("./routes/book")

const path=require("path")

const app = express();

const mongoose = require('mongoose');

require("dotenv").config()

app.use(express.json());

// Middleware pour configurer les en-têtes CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

  // Connexion à la base de données MongoDB
  mongoose.connect(process.env.MONGODB,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use("/api/auth",userRoute)

app.use("/api/books",bookRoute)

app.use("/images",express.static(path.join(__dirname,"images")));

module.exports = app;