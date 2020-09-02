const express = require('express')
// const stripe = require('stripe')
require('dotenv').config('.env')

process.env.STRIPE_SECRET_KEY

const app = express();

// Endpoints

// Files can be accessed from this folder
app.use(express.static('public'))

app.listen(3000, () => console.log('Server is running on port 3000'))