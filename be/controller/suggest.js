import connection from "../database/init.js"

export const suggest= (req, res)=> {
    if(req.body.data.id=== "hotel") {
        connection.query(`SELECT * FROM hotel WHERE MATCH(location) AGAINST ('${req.body.data.location}' WITH QUERY EXPANSION) LIMIT 8`, (err, rows, result)=> {
            if(err) console.log(err)
            return res.json(rows)
        })
    }
    if(req.body.data.id=== "flight") {
        connection.query(`SELECT * FROM flight WHERE MATCH(origin) AGAINST ('${req.body.data.location.origin}' WITH QUERY EXPANSION) AND MATCH(destination) AGAINST ('${req.body.data.location.destination}' WITH QUERY EXPANSION) LIMIT 8`, (err, rows, result)=> {
            if(err) console.log(err)
            return res.json(rows)
        })
    }
}