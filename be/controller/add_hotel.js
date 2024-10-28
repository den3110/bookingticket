import { v4 } from "uuid"
import connection from "../database/init.js"
import moment from "moment"

export const add_hotel = (req, res) => {
    connection.query(`INSERT INTO hotel(id_hotel, code_location, name_hotel, photo_hotel, brand,logo_brand, location,
    cost_adult, cost_kid, cost_baby, discount, type, available_from, expire_day, detail_location, country_location,
    review, wifi, pool, parking, restaurant, receptionist, elevator, fitness_center, meeting, airport_shuttle, access_views, timeup, timedetail
    ) VALUES
    ('${v4()}', '${req.body.code_location}', '${req.body.name_hotel}', '${req.body.photo_hotel}', '${req.body.brand || "none"}', '${req.body.logo_brand}', '${req.body.location}',
    ${req.body.cost_adult},${req.body.cost_kid},${req.body.cost_baby},${req.body.discount},'${req.body.type}',${req.body.available_from},${req.body.expire_day}
    ,'${req.body.detail_location}','${req.body.country_location}',${req.body.review},'${req.body.wifi}','${req.body.pool}','${req.body.parking}'
    ,'${req.body.restaurant}','${req.body.receptionist}','${req.body.elevator}','${req.body.fitness_center}','${req.body.meeting}','${req.body.airport_shuttle}'
    ,${req.body.access_views || 0}, '${moment(new Date()).format("DD-MM-YYYY")}', ${parseInt(moment(new Date()).valueOf())}
    )`, (err, rows, fields) => {
        if (err) return console.log(err)
        return res.json("success")
    })
}