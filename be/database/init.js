import mysql from "mysql2"

const connection= mysql.createPool({
    host: "185.232.14.52",
    user: "u898129453_datistpham",
    database: "u898129453_booking_ticket",
    password: "3Q+mkdHc",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default connection
