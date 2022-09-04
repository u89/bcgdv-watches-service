const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/checkout', (req, res) => {
    const watchIds = req.body;
    if(!watchIds || !watchIds.length) {
        res.status(400).send({message: 'Bad request'})
    } else {
        res.send({price: 0})
    }
})

module.exports = app