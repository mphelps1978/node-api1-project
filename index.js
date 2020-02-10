const express = require('express')
const app = express()
const port = 5000

app.use(express.json())
const users = require('./data/db')

app.get('/', (req, res) => res.send('Hello World!'))

// GET /api/isers - Returns a list of all users

app.get('/api/users', (req, res) => {
  users.find()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err =>{
  res.status(500).json({errorMessage: 'There was an error'})
  })
});

// POST /api/users - Adds a user to the database
//  - If either name or bio are missing, return 400

app.post('/api/users', (req, res) => {
  const {name, bio} = req.body

  if (!name || !bio) {
    res.status(400).json({errorMessage: "Please provide name and bio for user"})
  } else {
    users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err =>{
      res.status(500).json({errorMessage: 'There was an error'})
    })
  }
})

// GET /api/users/:id - Returns a single user
//  - If user does not exist, return 404

app.get('/api/users/:id', (req, res) => {
  users.findById(req.params.id)
  .then(user => {
    if(user){
      res.status(200).json(user)
    } else {
      res.status(404).json({errorMessage: 'The user with the specified ID does not exist'})
    }
  })
  .catch(err => {
    res.status(500).json({errorMessage: 'There was an error'})
  })
})


// DELETE /api/users/:id - Removes a user from the database
//   - If user does not exist, return 404

app.delete('/api/users/:id', (req, res) => {
 users.remove(req.params.id)
 .then(user => {
   if (user && user > 0){
     res.status(200).json({message: 'The user was removed'})
   } else{
     res.status(404).json({errorMessage: 'The user with the specified ID does not exist'})
   }
 })
 .catch(err => {
   res.status(500).json({errorMessage: 'There was an error'})
 })
})

app.put('/api/users/:id', (req, res) => {
  const {name, bio} = req.body

  if (!name || !bio) {
    res.status(400).json({errorMessage: 'Please provide a name and bio'})
  } else {
    users.update(req.params.id, req.body)
    .then(user => {
      if(user) {
        res.status(200).json({user})
      } else {
        res.status(404).json({errorMessage: 'The user with the specified ID does not exist'})
      }
    })
    .catch(err =>{
      res.status(500).json({errorMessage: 'There was an error'})
    })
  }
})

app.listen(port, () => console.log(`\n**app listening on port ${port} !`))