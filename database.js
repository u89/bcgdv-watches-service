/**
 * Here we handle the communication with the database.
 * For this excersie, we will build a simplified database
 * simulator inside this file instead of a real database
 */

const watchesTable = [
    {watchId: '001', watchName: 'Rolex', unitPrice:100, discount: {type: 'x-for-y', value:'3-200'}},
    {watchId: '002', watchName: 'Michael Kors', unitPrice:80, discount: {type: 'x-for-y', value:'2-120'}},
    {watchId: '003', watchName: 'Swatch', unitPrice:50},
    {watchId: '004', watchName: 'Casio', unitPrice:30},
] 
//Assumed in the above schema that we may have more than one type of discounts
//and we will calculate each discount differently.
//For now, we will work with one type only: x-for-y (buy x for y price)

const watches  = {
    find: ({ids}) => {
        if(ids) {
            return watchesTable.filter(watch => ids.indexOf(watch.watchId) > -1);
        }
        else {
            return watchesTable
        }
    }
}

module.exports = {
    watches
}