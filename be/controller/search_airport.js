import connection from "../database/init.js";

export const search_airport = (req, res) => {
    const queryString = req.body.query_string;

    // Sử dụng prepared statement
    connection.query(
        "SELECT * FROM airports WHERE " +
        "MATCH(name_airport, location_airport, country_airport, code_airport) " +
        "AGAINST (? IN BOOLEAN MODE)",
        [`*${queryString}*`], // Đặt dấu * để tìm kiếm từ khóa ở bất kỳ vị trí nào trong văn bản
        (err, rows, fields) => {
            if (err) {
                console.error("Error executing SQL query:", err);
                return res.status(500).json({ error: "An error occurred while processing your request." });
            }
            return res.json(rows);
        }
    );
};
