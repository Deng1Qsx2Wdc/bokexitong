const express = require("express")
const router = express.Router();
const{v4:uuidv4} = require("uuid")
const mysql =require("mysql2/promise.js")//E:/GeRenBoKe/bokexitong-test/server/db/DbUtils
const {queryAdmin,insertAdmin} = require("../../db/DbUtils")
//一个处理post请求的路由，路径为/login。
router.post("/login",async (req,res)=>{//当客户端发送一个post请求到/test时，Express会调用这个回调函数。
    try{
        const {acount,password} = req.body
        const login_token = uuidv4();
        const arr= {
            acount,
            password,
            login_token
        }
    // let sqll ="admin = ? and password = ? and login_token = ?"
        const cow =  await queryAdmin(arr)
        if(cow){
            return res.status(400).send({
                code:400,
                msg:"用户已存在"
                })
            }
        const col = await insertAdmin(arr)
        if(col){
            res.send({
                code:200,
                msg:"注册成功",
                 data:arr
            })
        }else{
            res.status(500).send({
                code:500,
                msg:"注册失败"
            })
        }
    }catch(err){
        console.log("登录错误：",err)
        res.status(500).send({
            code:500,
            msg:"发送失败"
        })
    }
})
module.exports = router