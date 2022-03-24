const dbConnection = require('./controllers/dbConnection');
const cors = require('cors');
//middleware
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());
const morgan = require('morgan');

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


//Hashing
const { hash, compare } = require("bcrypt");
const saltRounds = 12;
const { createUser, getPasswordHash, selectUserProfile } = require("./controllers/controllers.js");


app.use(morgan("tiny"));
app.use(cors());

app.get('/users', function(req, res) {
  dbConnection
    .select('*')
    .from("users")
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

app.get('/users/:username', function(req, res) {
  console.log(req.params)
  dbConnection
    .select('*')
    .from("users")
    .where({username: req.params.username})
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

app.get('/posts', function(req, res) {
  dbConnection
    .select('*')
    .from("posts")
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

app.get('/posts/:id', function(req, res) {
  dbConnection
    .select('*')
    .from("posts")
    .where({user_id: req.params.id})
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

app.post('/posts', function(req, res) {
  dbConnection
  .insert({ user_id: req.body.user_id, title: req.body.title, content: req.body.content}).from('posts')
    .then((data) => res.status(201).json(data))
    .catch((err) => {
      console.error(`error here:`, err);
      res.status(404).json({ message: "Something is wrong." })
  })
});

app.delete('/posts/:id', function(req, res) {
  dbConnection
  ('posts').where({ id: req.params.id}).del()
  .then((data) => res.status(200).json(data))
  .catch((err) => {
    console.error(err);
    res.status(404).json({ message: "Something is wrong." })
})
});


app.post("/users", function(req, res) {
  let {username, password, first_name, last_name} = req.body;

  if(!username) res.status(401).send('username required for signup')
  if(!password) res.status(401).send('password required for signup')
  if(!first_name) res.status(401).send('first name required for signup')
  if(!last_name) res.status(401).send('last name required for signup')

    else {
      hash(password, saltRounds).then(hashedPassword=>{
      console.log(`users real password:`, password);
      console.log(`That password is now:`, hashedPassword)
        createUser(username, hashedPassword, first_name, last_name)
        .then(data=> res.status(201).json("USER CREATED SUCCESFULLY"))
        .catch(err => rescape.status(500).json(err));
        });
      }
  });

  app.post("/login", (req, res) => {
    let { username, password } = req.body;

    if (!username) res.status(401).send("username required for login");
    else if (!password) res.status(401).send("password require for login");
    else {
      getPasswordHash(username)
        .then((hashedPassword) => {
          compare(password, hashedPassword)
            .then((isMatch) => {
              if (isMatch) {res.status(200).json({data})}
                // selectUserProfile(username)
                // .then(res.status(200).json({data}))
                // dbConnection
                // .select('*')
                // .from("users")
                // .where({username: req.params.username})
                // .then(data => res.status(200).json(data))

              else
                res.status(401).json("incorrect username or password supplied");
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    }
  });

module.exports = app;