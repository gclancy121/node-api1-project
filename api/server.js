// BUILD YOUR SERVER HERE
// imports
const express = require('express');
const Users = require('./users/model');


//create server
const server = express();

// parse JSON payloads
server.use(express.json());

// SERVERS PARTS

// Fetch all users
server.get("/api/users", (req, res) => {
  Users.find().then(result => {
    res.json(result);
  })
})

// Post new user
server.post("/api/users", (req, res) => {
  Users.insert(req.body).then(result => {
    if (result.bio == null || result.name == null) {
      res.status(400).json({message: "provide name and bio"})
      return;
    }
    console.log(result);
    res.status(201).json(result);
  })
})

//Fetch a user by ID
server.get("/api/users/:id", (req, res) => {
  Users.findById(req.params.id).then(result => {
    if (result == null) {
      res.status(404).json({message: "does not exist"});
      return;
    }
    res.json(result);
  });
})

// Delete a user
server.delete('/api/users/:id', (req, res) => {

  Users.remove(req.params.id).then(result => {
    if (result == null) {
      res.status(404).json({message: "does not exist"});
      return;
    }
    res.json(result);
  });
});

// Update a user
server.put('/api/users/:id', (req, res) => {
  Users.update(req.params.id, req.body).then(result => {
    if (result.bio == null || result.name == null) {
      res.status(400).json({message: "provide name and bio"})
      return;
    }
    if (result == null) {
      res.status(404).json({message: "does not exist"});
      return;
    }
    res.json(result);
  })
  .catch(() => {
    res.status(404).json({message: "does not exist"});
  });
});


module.exports = server; // EXPORT YOUR SERVER instead of {}
