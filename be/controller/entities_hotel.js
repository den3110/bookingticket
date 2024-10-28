import connection from "../database/init.js"

export const entities_hotel= (req, res)=> {
    const prepare= [req.body.query_array.wifi,req.body.query_array.pool,req.body.query_array.parking,req.body.query_array.restaurant,req.body.query_array.receptionist,req.body.query_array.elevator,req.body.query_array.fitness_center,req.body.query_array.meeting, req.body.query_array.shuttle]
    connection.query("SELECT * FROM hotel where wifi=? and pool=? and parking=? and restaurant=? and receptionist=? and elevator=? and fitness_center=? and meeting=? and airport_shuttle=?", prepare, (err, rows, fields)=> {
       return res.json(rows)
    })
}