import connection from "../database/init.js"
import axios from "axios"

export const code_aiport= async (req, res)=> {
    // try {
    //     connection.query(`SELECT location_airport from airports where code_airport in ('${req.query.code_airport_origin}', '${req.query.code_airport_destination}') order by field (code_airport, '${req.query.code_airport_origin}', '${req.query.code_airport_destination}')`, (err, rows, fields)=> {
    //         if(err) throw err
    //         return res.json(rows)
    //     })
        
    // } catch (error) {
    //     throw error
    // }
    try {
        const response = await axios({
            url: "https://apiportal.ivivu.com/flightinbound//gate/apiv1/PlaceByCode",
            method: "get",
            params: {
                fromCode: req.query.code_airport_origin?.toLowerCase(),
                toCode: req.query.code_airport_destination?.toLowerCase()
            },
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Host: "apiportal.ivivu.com",
            },
        });

        const data = response.data;

        // Trả về dữ liệu từ API
        return res.json(data);
    } catch (error) {
        console.error('Error fetching airport data:', error);
        return res.status(500).send('Error fetching airport data');
    }
}
