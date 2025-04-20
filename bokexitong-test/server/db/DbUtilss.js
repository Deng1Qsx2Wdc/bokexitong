const mysql =require("mysql")
const querystring = require("querystring");
const GenId = require("../utils/SnowFlake")

const pool = mysql.createPool({//数据库连接池，能够复用数据库连接，避免频繁建立/断开连接的开销
    connectionLimit: 10,
    host     : "localhost",
    user     : "root",
    password : "dengrx1234",
    database : "demo1",
    port     : "3306"
});
//查询MYSQL
async function queryAdmin(arr){ //括号内填传入的数据
    return new Promise((resolve,reject)=>{ //创建Promise一个对象，表示这个任务需要时间等待结果，其他任务延后
        //当前函数功能的具体实现方法函数
        pool.getConnection((err,connection)=>{
            if(err) {
                console.log("连接失败") 
                return res.status(500).json({ code: 500, message: "数据库连接失败" });
            }
            //let sqll ="selsect * from admin values admin = ? and password = ? and login_token = ?"
            connection.query("selsect * from admin values admin = ? and password = ? and login_token = ?",[arr.acount,arr.password,arr.login_token],(err,results)=>{
                connection.release();
                if(err)
                    reject(err)
                else{
                    if(results.length>0){
                        results = 1
                        resolve(results)
                    }
                    else{
                        results = 0;
                        resolve(results);
                        console.log(results)
                    }
                }
            })
        })
    })
}
async function insertAdmin(date){//插入MYSQL
    return new Promise((resolve,reject)=>{ //创建Promise一个对象，表示这个任务需要时间等待结果，其他任务延后
        if(date===1)
            return;
        //当前函数功能的具体实现方法函数
        pool.getConnection((err,connection)=>{
            if(err) {
                console.log("连接失败") 
                return res.status(500).json({ code: 500, message: "数据库连接失败" });
            }
            connection.query("insert into admin (acount,password,login_token) values (?,?,?)",[arr.acount,arr.password,arr.login_token],(err,results)=>{
                if(err){
                    console.error("插入错误",err)
                    connection.release();
                    return;
                }
                else
                    resolve(results);
                connection.release();
            })
            
        })
    })
}
// const genid = new GenId({WorkerId:1}) 

module.exports = {queryAdmin,insertAdmin};//将pool和genid导出文件，可以在其他文件中使用

