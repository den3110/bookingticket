import connection from "../database/init.js"
import md5 from "md5"
import { v4 as uuidv4 } from "uuid"

export const signupOauth2= (req, res)=> {
    connection.query(`INSERT INTO user(account, password, secret_key, firstname, lastname, id_user) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE account = VALUES(account), password= VALUES(password), secret_key= VALUES(secret_key), firstname= VALUES(firstname), lastname= VALUES(lastname), id_user= VALUES(id_user)`, [req.body.account,md5(req.body.password), uuidv4(), req.body.firstname, req.body.lastname, req.body.id_user], (err, rows, fields)=> {
        if(err) return console.log(err)
        return res.json("success")
    })
}