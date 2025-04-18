const http = require("http");
const querystring = require("querystring");
const mysql = require("mysql");

const pool = mysql.createPool({//数据库连接池，能够复用数据库连接，避免频繁建立/断开连接的开销
    connectionLimit: 10,
    host     : "localhost",
    user     : "root",
    password : "dengrx1234",
    database : "demo1",
    port     : "3306"
});

const server = http.createServer((req,res)=>{//创建HTTP服务器实例，回调函数处理所有请求
    if(req.method!=="POST"){//请求方法过滤，目的是控制处理条件，只处理指定类型的请求
        res.end();
        return;
    }
    let postVal=""
    req.on("data",(chunk)=>{postVal+=chunk.toString('utf-8');})
    req.on("end",()=>{//检测到所有请求数据接收完毕后，触发，调用函数进行数据处理，是服务器响应客户端的响应内容
        const params = new URLSearchParams(postVal);//将接收到的字符串转化为对象形式
        const aName = params.get("userName");
        const aPwd = params.get("userPwd");

        pool.getConnection((err,connection)=>{//从连接池获取数据库连接
            if(err){//连接失败，直接结束响应
                console.log("获取连接失败",err);
                res.end("server Error");
                return;
            }
            connection.query(//进行SQL查询,并且在调用函数前就储存好数据，三个参数：查询语句,参数数组(与查询语句结合判断，数据库内有无数组之内的参数)，回调函数
                "select*from user where userName=? and userPwd=?",
                [aName,aPwd],
                (err,results,fields)=>{
                connection.release(); //将连接释放回连接池
                if(err){
                    console.log("查询失败",results);
                    res.end("server Error");
                    return;
                }
                console.log("查询结果：",results);
                res.end(results.length>0?"Success":"Fail");
                }
            );
        });
    });
});
server.listen(8080);//启动服务器，监听8080端口，此处的端口需要与html文件内一致
