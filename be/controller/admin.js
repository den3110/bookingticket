import connection from "../database/init.js"
import moment from "moment"

export const admin= (req, res)=> {
    const s1= req.body.s1
    const s2= req.body.s2
    if(s2=== "all_flight") {
        connection.query(`SELECT * FROM ${s1}`, (err, rows, fields)=> {
            if(err) return console.log(err)
            return res.json(rows)
        })
    }
    if(s2=== "expired_flight") {
        connection.query(`SELECT * FROM ${s1} WHERE c_timedestination < ${parseInt(moment(new Date()).valueOf())} AND capacity_customer= 0`, (err, rows, fields)=> {
            if(err) return console.log(err)
            return res.json(rows)
        })
    }
    if(s2=== "activing_flight") {
        connection.query(`SELECT * FROM ${s1} WHERE c_timeflight < ${parseInt(moment(new Date()).valueOf())} AND c_timedestination > ${parseInt(moment(new Date()).valueOf())}`, (err, rows, fields)=> {
            if(err) return console.log(err)
            return res.json(rows)
        })
    }
    if(s2=== "completed_flight") {
        connection.query(`SELECT * FROM ${s1} WHERE c_timedestination < ${parseInt(moment(new Date()).valueOf())} AND capacity_customer> 0`, (err, rows, fields)=> {
            if(err) return console.log(err)
            return res.json(rows)
        })
    }
    if(s2=== "prepare_flight") {
        connection.query(`SELECT * FROM ${s1} WHERE c_timeflight > ${parseInt(moment(new Date()).valueOf())}`, (err, rows, fields)=> {
            if(err) return console.log(err)
            return res.json(rows)
        })
    }
    if(s2=== "all_hotel") {
        connection.query(`SELECT * FROM ${s1}`, (err, rows, fields)=> {
            if(err) return console.log(err)
            return res.json(rows)
        })
    }
    if(s2=== "available_hotel") {
        connection.query(`SELECT * FROM ${s1} WHERE available_from < ${moment(new Date()).valueOf()} AND expire_day > ${moment(new Date()).valueOf()}`, (err, rows, fields)=> {
            if(err) return console.log(err)
            return res.json(rows)
        })
    }
    if(s2=== "expired_hotel") {
        connection.query(`SELECT * FROM ${s1} WHERE expire_day < ${moment(new Date()).valueOf()}`, (err, rows, fields)=> {
            if(err) return console.log(err)
            return res.json(rows)
        })
    }
    if(s2=== "new_flight") {
        connection.query(`SELECT * FROM ${s1} WHERE timeup= '${moment(new Date()).format("DD-MM-YYYY")}'`, (err, rows, fields)=> {
            if(err) return console.log(err)
            return res.json(rows)
        })
    }
    if(s2=== "new_hotel") {
        connection.query(`SELECT * FROM ${s1} WHERE timeup= '${moment(new Date()).format("DD-MM-YYYY")}'`, (err, rows, fields)=> {
            if(err) return console.log(err)
            return res.json(rows)
        })
    }
}