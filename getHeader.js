const connection = require('./connectDB');

async function getHeader(){
    const query = "SELECT * FROM chude WHERE trangThai = true";
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) {
                reject(err);
            } 
            else 
            {
                resolve(rows)
            }
        });
    })
}

module.exports = getHeader;
