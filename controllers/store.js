/**
 * Here we handle the requests that come through the endpoints
 * and provide the expected response
 */

const checkout = (req, res) => {
    //handle the request and return the total price in the response
    const watchIds = req.body;
    if(!watchIds || !watchIds.length) {
        res.status(400).send({message: 'Bad request'})
    } else {
        res.send({price: 0})
    }
}

const calculateTotalPrice = (watchIds) => {
    //accepts a list of watches (ids) and return the total price
}

const priceAfterDiscounts = (watchIds) => {
    //accepts a list of watches (ids) and return the total price after applying discount on each item
}

module.exports = {
    checkout
}