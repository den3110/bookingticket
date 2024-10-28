import connection from "../database/init.js"

export const detail= (req, res)=> {
    console.log(req.body.id)
    connection.query("SELECT COUNT(*) AS COUNT FROM book_ticket WHERE id_type=?", [req.body.id], (err, rows, fields)=> {
        if(err) return console.log(err)
        return res.json(rows)
    })
}