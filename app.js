const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register')
const signIn = require('./controllers/signIn')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  }})
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


const app = express();
app.use(bodyParser.json())
app.use(cors());

app.get('/', (req, res) => {
    res.send('asd');
})

app.post('/signIn', (req, res) => {
    signIn.handleSignIn(req, res, knex, bcrypt);
});

app.post('/register', (req, res) => {
    register.handleRegister(req, res, knex, bcrypt);
})

app.get('/profile/:id', (req, res) => {
    profile.handleProfile(req, res, knex);
});

app.put('/image', (req, res) => {
    image.handleImage(req, res, knex);
});

app.post('/imageUrl', (req, res) => {
    image.handleClarifai(req, res);
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`app running on port ${process.env.PORT}`);
})