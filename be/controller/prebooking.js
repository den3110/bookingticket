import connection from "../database/init.js"

export const prebooking= (req, res)=> {
    if(req.body.type== "flight") {
        connection.query("SELECT * from flight where id_flight=?", [req.body.id], (err, rows, field)=> {
            if(err) console.log(err)
            return res.json(rows)
        })
    }
    if(req.body.type== "hotel") {
        connection.query("SELECT * FROM hotel where id_hotel=?", [req.body.id], (err, rows, fields)=> {
            if(err) console.log(err)
            return res.json(rows)
        })
    }
}