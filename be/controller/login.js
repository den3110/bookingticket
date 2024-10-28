import connection from "../database/init.js"
import md5 from "md5"

export const login= (req, res)=> {
    connection.query("SELECT * from user where account=? and password=?", [req.body.account, md5(req.body.password)], (err, rows, fields)=> {
        if(err) console.log(err)
        return res.json(rows)
    })
}