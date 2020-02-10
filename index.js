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



});






app.listen(port, () => console.log(`\n**app listening on port ${port} !`))