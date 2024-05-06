const dotenv = require('dotenv');
const mysql  = require('mysql');

dotenv.config();

/* VUI LÒNG CHỈNH SỬA FILE .env và chạy file connnectDB.js bằng lệnh node connectDB.js để kiểm tra cơ sở dữ liệu chạy 
thành công không */
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect((err) => {
    if (err){
        console.error(err);
    }
    else {
        console.log('Kết nối cơ sở dữ liệu thành công');
    }
})


// Vì connection đã export nên không cần require mysql hay ghi lại địa chỉ liên kết chỉ cần gọi connection từ connectDB 
module.exports = connection;

