import connection from "../database/init.js"

export const bookingticket= (req, res)=> {
    connection.query("INSERT INTO book_ticket(id_type, name, surname, phonenumber, email, type_user, date_birth, month_birth, year_birth, nationality, time_book, id_user) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [req.body.id_type,req.body.name,req.body.surname,req.body.phonenumber || "",req.body.email || "",req.body.type_user,req.body.date_birth || 0,req.body.month_birth || 0,req.body.year_birth || 0,req.body.nationality || "", req.body.time_book, "" ], (err, rows, fields)=> {
        if(err) return console.log(err)
        return res.json("success")
    })
}