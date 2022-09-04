const express = require('express')
const cors = require('cors')
const store = require('./controllers/store')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/checkout', store.checkout)

module.exports = app