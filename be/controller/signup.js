import connection from "../database/init.js"
import md5 from "md5"
import { v4 as uuidv4 } from "uuid"

export const signup= (req, res)=> {
    connection.query(`INSERT INTO user(account, password, secret_key, firstname, lastname, id_user) VALUES (?, ?, ?, ?, ?, ?)`, [req.body.account,md5(req.body.password), uuidv4(), req.body.firstname, req.body.lastname, uuidv4()], (err, rows, fiels)=> {
        if(err) console.log(err)
        return res.json("success")
    })
}

