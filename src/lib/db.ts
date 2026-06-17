import mysql from "mysql";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "data-siswa",
    password: "",
});

export default pool;