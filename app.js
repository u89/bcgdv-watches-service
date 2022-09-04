const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/checkout', (req, res) => {
    res.send({price: 0})
})

module.exports = app