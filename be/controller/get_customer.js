import connection from "../database/init.js"

export const getcustomer= (req, res)=> {
    connection.query("SELECT * FROM book_ticket WHERE id_type=?", [req.body.id], (err, rows, fields)=> {
        if(err) return console.log(err)
        return res.json(rows)
    })
}