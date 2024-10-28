import { v4 } from "uuid"
import connection from "../database/init.js"
import moment from "moment"

export const add_flight= (req, res)=> {
    switch(req.body.seatclass) {
        case "Phổ thông":
            req.body.seatclass= "ECONOMY"
            break
        case "Phổ thông cao cấp":
            req.body.seatclass= "PREMIUM"
        case "Thương gia":
            req.body.seatclass= "BUSINESS"
        case "Hạng nhất":
            req.body.seatclass= "FIRST"
            
    }
    connection.query(`INSERT INTO flight(origin, destination, brand,timestart, timearrive, cost_adult, discount, seatclass, aircraft_number, refund, cost_kid, cost_baby, tax, package, eating, entertainment, id_flight, logo_brand, dayflight, daydestination,wifi, charger,  c_timeflight, c_timedestination, roundtrip, capacity_customer, timeup, timedetail ) 
    VALUES('${req.body.origin}', '${req.body.destination}', '${req.body.brand}','${req.body.timestart}','${req.body.timearrive}', ${parseInt(req.body.cost_adult)},${parseInt(req.body.discount)},'${req.body.seatclass}', '${req.body.aircraft_number}',${0},${parseInt(req.body.cost_kid)},${parseInt(req.body.cost_baby)},${parseInt(req.body.tax)}, ${req.body.package},${req.body.eating},${req.body.entertainment}, '${v4()}','${req.body.logo_brand}','${req.body.daystart}','${req.body.daydestination}', ${req.body.wifi}, ${req.body.charger}, ${parseInt(moment(`${req.body.timestart} ${req.body.dayflight}`, "hh:mm DD-MM-YYYY").valueOf())},${parseInt(moment(`${req.body.timearrive} ${req.body.daydestination}`, "hh:mm DD-MM-YYYY").valueOf())}, 0, 100, '${moment(new Date()).format("DD-MM-YYYY")}', ${parseInt(moment(new Date()).valueOf())})`, (err, rows, fields)=> {
        if(err) return console.log(err)
        return res.json("success")
    })
}
