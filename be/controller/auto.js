import connection from "../database/init.js"

export const auto= (req, res)=> {
    connection.query("SELECT * from user where secret_key=?", [req.body.id], (err, rows, fields)=> {
        if(err) console.log(err)
        return res.json(rows)
    })
}   