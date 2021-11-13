const express = require('express')
const router = express.Router()
const request = require('superagent')

module.exports = router

// Server use '/api/v1/home'
router.get('/', (req, res) => {
  request.get('https://random-d.uk/api/v2/random')
    .then(response => {
      res.json({ output: response.body.url })
      return null
    }).catch(err => console.error(err))
})

router.post('/', (req, res) => {
  console.log(req.body)
  res.json(req.body)
})
