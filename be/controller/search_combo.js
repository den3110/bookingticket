import connection from "../database/init.js"

export const search_combo = (req, res) => {
    let sql = `SELECT DISTINCT hotel.*, flight.*, flight.cost_adult AS cost_adult_flight, hotel.cost_adult AS cost_adult_hotel FROM hotel inner join flight ON hotel.code_location = flight.destination
     Where flight.destination='${req.body.data.destination}'`
    connection.query(sql, (err, rows, fields) => {
        return res.json(rows)
    })
}