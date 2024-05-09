const express = require('express');
const connection = require('../connectDB')
const getHeader = require('../getHeader')
const getFooter = require('../getFooter')
const { getBlog, getBlogDetail, getBlogs, findBlog, getBlogByMCD } = require('../getBlog')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();
const routerGeneral = express.Router();

routerGeneral.get('/', async (req,res) => {
    try {
        req.session.user = null;
        const user = req.session.user;
        const header = await getHeader()
        const blogs = await getBlog()
        const footer = await getFooter()
        res.render('general/general', {result: footer, chuDe: header, blogs : blogs ,user: user, header: '../general/header', footer: '../general/footer', content: '../general/content'});
    }
    catch (error) {
        console.error(error);
    }
})

// routerGeneral.get('/login', async (req,res) => {
//     res.render('general/content_login');
// })

// routerGeneral.post('/login', async (req,res) => {
//     const { email , password } = req.body;
//     try {
//     const query = "SELECT tenTaiKhoan, vaiTro FROM taiKhoan WHERE email = ? AND matKhau = ?"
//     connection.query(query, [email, password], (error, result) => {
//         if (result == 0){
//             return res.status(404).json({message : "Tài khoản của bạn đã sai email hoặc mật khẩu"});
//         }

//         const user = result[0];

//         const token = jwt.sign({ email: user.email, role: user.vaiTro }, "VLK99", { expiresIn: "1h" }); // Đôi lúc tôi cũng không nodejs của tôi nó bị gì :)))
//         res.cookie("token", token, {httpOnly: true});

//         // 1 là admin, 2 là client
//         switch (user.vaiTro){
//             case 1:
//                 // @ts-ignore
//                 req.session.user = user.tenTaiKhoan;
//                 return res.redirect('/client');
//             case 2:
//                 req.session.user = user.tenTaiKhoan;
//                 return res.redirect('/client')
//                 break;
//             default:
//                 return res.status(403).json({message: "Vai trò không hợp lệ"});
//         }
//     }) 
//     } catch (error) {
//         console.error(error)
//         return res.status(500).json({message: "Lỗi server"})
//     }
// })

// routerGeneral.get('/logout', async (req,res) => {
//     try {
//         if (req.session){
//             req.session.destroy((err) => {
//                 if (err){
//                     throw err;
//                 }
//                 else {
//                     res.redirect('/');
//                 }
//             })
//         }
//         else {
//             res.redirect('/');
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({message: "Lỗi server"})
//     }
// })

// routerGeneral.get('/signin', async (req,res) => {
//     res.render('general/content_signin')
// })

// routerGeneral.post('/signin', async (req,res) => {
//     const { email, tenNguoiDung, password } = req.body;
//     try {
//         const query = "INSERT TAIKHOAN VALUES (?,?,?,'2',1)";
//         connection.query(query, [email, tenNguoiDung, password], (error, result) => {
//             if (error){
//                 throw error;
//                 return res.status(500).json({message: "Đã xảy ra lỗi khi đăng ký tài khoản"})
//             }
//             else {
//                 res.redirect('/')
//             }
//         })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({message: "Lỗi server"})
//     }
// })

routerGeneral.get('/xembaiviet/:id', async(req,res) => {
    const { id } = req.params;
    try {
        const blog = await getBlogDetail(id);
        res.json(blog);
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Lỗi server"})
    }
})

routerGeneral.get('/pages/', async(req,res) => {
    let limit = parseInt(req.query.limit) || 10;
    try {
        const blog = await getBlogs(limit);
        req.session.user = null;
        const user = req.session.user;
        const header = await getHeader()
        const footer = await getFooter()
        res.render('general/general', {result: footer, chuDe: header, blogs : blog ,user: user, header: '../general/header', footer: '../general/footer', content: '../general/content'});
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Lỗi server"})
    }
})


routerGeneral.get('/search', async (req, res) => {
    let search = req.query.search;
    let maChuDe = req.query.maChuDe;
    if (!search && !maChuDe){
        var blog = await getBlog();
    }
    if (search){
        var blog = await findBlog(search); // var có khả năng chạy từ local sang global 
    }
    else if (maChuDe) {
        var blog = await getBlogByMCD(maChuDe)
    }

    req.session.user = null;
    const user = req.session.user;
    const header = await getHeader();
    const footer = await getFooter();
    res.render('general/general', { result: footer, chuDe: header, blogs: blog, user: user, header: '../general/header', footer: '../general/footer', content: '../general/content' });
});

module.exports = { routerGeneral };
