const express = require("express")
const router = express.Router()
const {db, genid} = require("../db/DbUtils")


router.get("/test", async (req, res) => {
    db.all("select * from `admin`", [], (err, rows) => {
        console.log(rows)
    })


    let out = await db.async.all("select * from `admin`", [])

    db.async.all("select * from `admin`", []).then((res) => {
        console.log(res)
    })


    res.send({
        id:genid.NextId(),
        out:out
    })
})




module.exports = router