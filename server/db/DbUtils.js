const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const GenId = require("../utils/SnowFlake")


var db = new sqlite3.Database(path.join(__dirname, 'blog.sqlite3'))
const genid = new GenId({WorkerId:1})
//WorkId is the id of the worker, it should be unique for each worker

db.async = {}

db.async.all = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            resolve({err, rows})
        })
    })
}

db.async.run = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, (err, rows) => {
            resolve({err, rows})
        })
    })
}


module.exports = {db, genid}