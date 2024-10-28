import connection from "../database/init.js"
import moment from "moment"

export const result_hotel= (req, res)=> {
    connection.query("SELECT * FROM hotel where `available_from`<=? and `expire_day`>=? and `location`=? and MATCH (`location`) AGAINST ('"+req.body.data.l.toString().replaceAll("-", " ")+"' IN BOOLEAN MODE) OR MATCH (`name_hotel`) AGAINST ('"+req.body.data.l.toString().replaceAll("-", " ")+"' IN BOOLEAN MODE) OR MATCH (`detail_location`) AGAINST ('"+req.body.data.l.toString().replaceAll("-", " ")+"' IN BOOLEAN MODE)",[parseInt(moment(req.body.data.origin.toString(), "DD-MM-YYYY").valueOf()),parseInt(moment(req.body.data.destination.toString(), "DD-MM-YYYY").valueOf()), req.body.data.l.toString().replaceAll("-", " ")], (err, rows, fields)=> {
        if(err) console.log(err)
        return res.json(rows)
    })
}