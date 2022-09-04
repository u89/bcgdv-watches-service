/**
 * Here we handle the requests that come through the endpoints
 * and provide the expected response
 */
const watchesModel = require('../models/watch')

const checkout = (req, res) => {
    //handle the request and return the total price in the response
    const watchIds = req.body;
    if(!watchIds || !watchIds.length) {
        res.status(400).send({message: 'Bad request'})
    } else {
        const {total, watches} = calculateTotalPrice(watchIds);
        res.send({price: total})
    }
}

const calculateTotalPrice = (watchIds) => {
    //accepts a list of watches (ids) and return the total price
    //1. know the qty of each watch
    const watchesWithQty = calculateQuantities(watchIds);
    
    const keys = Object.keys(watchesWithQty);
    let total = 0;
    let watches = [];
    for (var i=0; i<keys.length; i++) {
        //2. calculate the price for each one with discount
        const watchId = keys[i];
        const qty = watchesWithQty[watchId];
        //get the watch with the applied discount from the watchModel
        const watch = watchesModel.getWatchWithDiscount({watchId, qty});
        if(watch) {
            total += watch.amount - watch.discountAmount
            watches.push(watch);
        }
    }
    //3. calculate and return the total amount
    return {total, watches};
}

const calculateQuantities = (productIds) => {
    //accepts a list of watches (ids) and return the total price after applying discount on each item
    let products = {}; // a key:value object where key is the product id and value is the qty
    for (const id of productIds) {
        if(!products[id]) {
            //add the product to the list with qty = 1
            products[id] = 1
        } else {
            //increase the product qty by 1
            products[id] += 1
        }
    }
    return products;
}

module.exports = {
    checkout
}