const connection = require('./connectDB');
const { format } = require('date-fns')

async function getBlog(){
    const query = "SELECT maBaiViet ,tieuDeBaiViet , noiDungTomTat , hinhAnhDaiDien,  ngayDang FROM baiviet ORDER BY ngayDang DESC LIMIT 10"
    return new Promise((res,rej) => {
        connection.query(query, (err,rows) => {
            if (err){
                throw err;
            }
            else {
                const blogs = rows.map( row => ({
                    maBaiViet: row.maBaiViet,
                    tieuDeBaiViet: row.tieuDeBaiViet,
                    noiDungTomTat: row.noiDungTomTat,
                    hinhAnhDaiDien: row.hinhAnhDaiDien,
                    ngayDang: format(new Date(row.ngayDang), 'dd/MM/yyyy'),
                }))
                res(blogs);
            }
        })
    })
}


async function getBlogs(limit){
    const query = "SELECT maBaiViet ,tieuDeBaiViet , noiDungTomTat , hinhAnhDaiDien,  ngayDang FROM baiviet ORDER BY ngayDang DESC LIMIT ?"
    return new Promise((res,rej) => {
        connection.query(query,[limit], (err,rows) => {
            if (err){
                throw err;
            }
            else {
                const blogs = rows.map( row => ({
                    maBaiViet: row.maBaiViet,
                    tieuDeBaiViet: row.tieuDeBaiViet,
                    noiDungTomTat: row.noiDungTomTat,
                    hinhAnhDaiDien: row.hinhAnhDaiDien,
                    ngayDang: format(new Date(row.ngayDang), 'dd/MM/yyyy HH:mm:ss'),
                }))
                res(blogs);
            }
        })
    })
}


async function getBlogDetail(id){
    const query =  "SELECT tieuDeBaiViet , noiDungBaiViet , hinhAnhBaiViet , ngayDang , tacGia  FROM baiviet WHERE maBaiViet = ?"
    return new Promise((res,rej) => {
        connection.query(query, [id], (err,rows) => {
            if (err){
                throw err;
            }
            else {
                const blogs = rows.map( row => ({
                    tieuDeBaiViet: row.tieuDeBaiViet,
                    noiDungBaiViet: row.noiDungBaiViet,
                    hinhAnhBaiViet: row.hinhAnhBaiViet,
                    ngayDang: format(new Date(row.ngayDang), 'dd/MM/yyyy HH:mm:ss'),
                    tacGia: row.tacGia
                }))
                res(blogs);
            }
        })
    })
}

async function findBlog(keyword){
    const query = "SELECT maBaiViet ,tieuDeBaiViet , noiDungTomTat , hinhAnhDaiDien, ngayDang FROM baiviet WHERE tieuDeBaiViet LIKE ? "
    return new Promise((res,rej) => {
        connection.query(query,[`%${keyword}%`], (err,rows) => {
            if (err){
                rej(err);
            }
            else {
                const blogs = rows.map( row => ({
                    maBaiViet: row.maBaiViet,
                    tieuDeBaiViet: row.tieuDeBaiViet,
                    noiDungTomTat: row.noiDungTomTat,
                    hinhAnhDaiDien: row.hinhAnhDaiDien,
                    ngayDang: format(new Date(row.ngayDang), 'dd/MM/yyyy HH:mm:ss'),
                }))
                res(blogs);
            }
        })
    })
}

async function getBlogByMCD(maChuDe){
    const query = "SELECT maBaiViet ,tieuDeBaiViet , noiDungTomTat , hinhAnhDaiDien,  ngayDang FROM baiviet WHERE maChuDe = ?"
    return new Promise((res,rej) => {
        connection.query(query, [maChuDe], (err,rows) => {
            if (err){
                throw err;
            }
            else {
                const blogs = rows.map( row => ({
                    maBaiViet: row.maBaiViet,
                    tieuDeBaiViet: row.tieuDeBaiViet,
                    noiDungTomTat: row.noiDungTomTat,
                    hinhAnhDaiDien: row.hinhAnhDaiDien,
                    ngayDang: format(new Date(row.ngayDang), 'dd/MM/yyyy HH:mm:ss'),
                }))
                res(blogs);
            }
        })
    })
}

module.exports = { getBlog, getBlogDetail, getBlogs, findBlog, getBlogByMCD }