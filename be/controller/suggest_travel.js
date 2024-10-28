import connection from "../database/init.js"

export const suggest_travel= (req, res)=> {
    connection.query("SELECT * FROM travels limit 8", (err, rows, fields)=> {
        if(err) console.log(err)
        return res.json(rows)
    })
}