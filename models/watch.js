/**
 * Here we handle the actions on the watches table in the database
 * e.g. find, calculate discounts, add, remove, etc.
 */
const db = require('../database')

/**
 * 
 * @param {string[]} watchIds 
 * @returns array of json objects of type: watch
 */
const getWatches = (watchIds) => {
    return db.watches.find({ids: watchIds});
}

const getWatchWithDiscount = ({watchId, qty}) => {
    const result = db.watches.find({ids: [watchId]});
    if(result && result.length) {
        const watch = result[0];
        const amount = watch.unitPrice * qty; //amount before discount
        if(!watch.discount || !watch.discount.type || !watch.discount.value) {
            return {...watch, amount, discountAmount: 0}
        }
        switch(watch.discount.type.toLowerCase()) {
            case 'x-for-y':
                const [x, y] = watch.discount.value.split("-") //where y is the total price for each x watches
                const discountCount = Math.floor(qty/x) //calculate how many times the discount can be applied on this qty
                const finalAmount = discountCount * y + (qty - discountCount * x) * watch.unitPrice;
                return {...watch, amount, discountAmount: amount - finalAmount} // will return the amount of the discount in case we need to display it to the customer
            default:
                return {...watch, amount, discountAmount: 0}
        }
    } else {
        return null;
    }
}

module.exports = {
    getWatches,
    getWatchWithDiscount
}