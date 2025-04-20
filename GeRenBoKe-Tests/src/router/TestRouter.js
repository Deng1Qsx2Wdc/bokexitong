const express = require("express")
const router = express.Router();
const mysql = require("mysql")//E:/GeRenBoKe/bokexitong-test/server/db/DbUtils
const {queryAdmin,insertAdmin} = require("../../db/DbUtils")
//一个处理GET请求的路由，路径为/test。
router.get("/test",(req,res)=>{//当客户端发送一个GET请求到/test时，Express会调用这个回调函数。
    const {acount,passwprd} = req.body
    console.log("111",results)
    const results=queryAdmin(acount,passwprd)
    console.log("111",results)
    // queryAdmin(acount,passwprd)
    //         .then((result)=>insertAdmin(result))
    //         .then((result1)=>{
    //             console.log("最终结果",result1)
    //         })
    //         .catch((err)=>{//错误统一执行
    //             console.error("出错:",err)
    //         })
        })
module.exports = router