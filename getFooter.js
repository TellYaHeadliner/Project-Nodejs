const connection = require('./connectDB');


async function getFooter(){
    const query = "SELECT * FROM footerlienhe";
    return new Promise((resolve, reject) => {
        connection.query(query, (err, rows) => {
            if (err) {
                reject(err);
            } 
            else 
            {
                const result = rows.map(row => ({
                    diaChiLienHe: row.diaChiLienHe,
                    email: row.email,
                    facebook: row.facebook,
                    youtube: row.youtube,
                    thongTinBanQuyen: row.thongTinBanQuyen
                }));
                resolve(result);
            }
        });
    })
}

module.exports = getFooter;
