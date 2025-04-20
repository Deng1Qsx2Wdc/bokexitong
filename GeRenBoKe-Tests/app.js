const express = require("express")//引入express
const multer = require("multer")
const app = express()//express实例化

const port = 8080//一个端口

app.use(express.json())//中间件配置，json,用于前后端的交互，尽可能往前写

app.use(function(req,res,next){//用于跨域请求
    //设置允许跨域的域名，*是允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*")
    //设置允许的Headers类型
    res.header("Access-Control-Allow-Headers","*")
    //设置允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS")
    //让options尝试请求 快速结束
    if(req.method=="OPTION") res.sendStatus(200)//快请求
    else next();

})

//文件上传中间件
const update = multer({
    dest:"./public/upload/temp"
})
app.use(update.any())

const router = require("./src/router/AdminRouter")
app.use("/admin",router)//所有以/test开头的路由都会被testRoutes模块处理。

//根路由
app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(port,()=>{//监听一个端口
    console.log(`启动成功:http://localhost:${port}/`)
})