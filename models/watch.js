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

module.exports = {
    getWatches,
}