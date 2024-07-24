const express = require("express")
const router = express.Router()
const fs = require("fs")
const {db, genid} = require("../db/DbUtils")

router.post("/rich_editor_upload", async(req, res) =>{
    if(!req.files){ //失败
        res.send({
            "errno": 1,
            "message": "失败信息"
        })
        return;
    }

    let files = req.files;
    let return_files = [];
    for(let file of files){
        let file_ext = file.originalname.substring(file.originalname.lastIndexOf(".") + 1)
        let file_name = genid.NextId() + "." + file_ext;

        //修改文件名
        fs.renameSync(
            process.cwd() + "/public/upload/temp/" + file.filename,
            process.cwd() + "/public/upload/" + file_name
        )
        return_files.push("/upload/" + file_name)
    }

    res.send({ //成功
        "errno": 0,
        "data":{
            "url":return_files[0],
        }
    })
})




module.exports = router