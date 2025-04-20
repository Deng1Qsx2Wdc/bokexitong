const mysql =require("mysql2/promise.js")
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

async function queryAdmin(arr) {
    let connection;
    try{
        connection = await pool.getConnection();
        const sqll = "select * from admin where acount = ? and password = ? and token = ?"
        const values = [arr.acount,arr.password,arr.login_token]
        const [result] = await connection.query(sqll,values)
        return result.length>0?1:0;
    }
    catch(err){
        console.error("查询错误",err)
        throw err
    }finally{
        if(connection)
            connection.release()
    }
}
async function insertAdmin(arr) {
    let connection;
    try{
        connection = await pool.getConnection();
        const sqll = "insert into admin (acount,password,token) values (?,?,?)"
        const values = [arr.acount,arr.password,arr.login_token]
        const [result] = await connection.query(sqll,values)//返回的结果是一个数组，包含 结果对象 和 字段元数据 两部分
        return result.affectedRows > 0;//是 MySQL 操作结果对象的一个属性，表示 受影响的数据库行数。
                                        //对于 INSERT 操作，成功插入一条记录时，affectedRows 的值为 1；失败则为 0。
    }
    catch(err){
        console.error("注册错误",err)
        throw err
    }finally{
        if(connection)
            connection.release()
    }
}

module.exports = {queryAdmin,insertAdmin};//将pool和genid导出文件，可以在其他文件中使用


//const [result] = await connection.query("INSERT INTO users (name) VALUES ('John')");
//console.log(result);
// 输出：
// {
//   fieldCount: 0,
//   affectedRows: 1,  // 插入了一行
//   insertId: 42,      // 新插入行的自增 ID
//   info: '...',
//   serverStatus: 2,
//   warningStatus: 0
// }