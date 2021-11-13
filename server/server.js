const path = require('path')
const express = require('express')
const routes = require('./routes/routes')

// const widgets = require('./routes/widgets')

const server = express()
server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

// server.use('/api/v1/widgets', widgets)

module.exports = server