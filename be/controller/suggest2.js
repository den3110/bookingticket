import connection from "../database/init.js"

export const suggest2= (req, res)=> {
    connection.query("SELECT * FROM hotel WHERE location=? ORDER BY review", [req.body.place], (err, rows, fileds)=> {
        if(err) return console.log(err)
        return res.json(rows)
    })
}