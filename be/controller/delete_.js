import connection from "../database/init.js"

export const delete_= (req, res)=> {
    const s1= req.body.type
    if(s1=== "flight") {
        connection.query(`DELETE FROM ${s1} WHERE id_flight=?`, [req.body.id], (err, rows, fields)=> {
            if(err) return console.log(err)
            return res.json("success")
        })
    }
    if(s1=== "hotel") {
        connection.query(`DELETE FROM ${s1} WHERE id_hotel=?`, [req.body.id], (err, rows, fields)=> {
            if(err) return console.log(err)
            return res.json("success")
        })
    }
}