const express = require("express");
const connection = require("../connectDB");
const session = require("express-session");
const {format}=require("date-fns");

const routerGeneral = express.Router();
async function getFooter() {
  const query = "SELECT * FROM footerlienhe";
  return new Promise((resolve, reject) => {
    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const result = rows.map((row) => ({
          diaChiLienHe: row.diaChiLienHe,
          email: row.email,
          facebook: row.facebook,
          youtube: row.youtube,
          thongTinBanQuyen: row.thongTinBanQuyen,
        }));
        resolve(result);
      }
    });
  });
}

async function getHeader() {
  const query = "SELECT * FROM chude WHERE trangThai = true";
  return new Promise((resolve, reject) => {
    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const result = rows.map((row) => row.chuDe);
        resolve(result);
      }
    });
  });
}

async function checkSignup(email) {
  const query = "SELECT * FROM taiKhoan WHERE email = '" + email + "'";
  return new Promise((resolve, reject) => {
    connection.query(query, (err, row) => {
      if (err) {
        reject(err);
      } else {
        if (row.length == 0) resolve(true);
        else resolve(false);
      }
    });
  });
}

async function getHeader() {
  const query = "SELECT * FROM chude WHERE trangThai = true";
  return new Promise((resolve, reject) => {
    connection.query(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const result = rows.map((row) => row.chuDe);
        resolve(result);
      }
    });
  });
}
async function checkSignup(email) {
  const query = "SELECT * FROM taiKhoan WHERE email = '" + email + "'";
  return new Promise((resolve, reject) => {
    connection.query(query, (err, row) => {
      if (err) {
        reject(err);
      } else {
        if (row.length == 0) resolve(true);
        else resolve(false);
      }
    });
  });
}
async function checkLogin(email, pass) {
  const query =
    "SELECT * FROM taiKhoan WHERE email = '" +
    email +
    "' AND matKhau = '" +
    pass +
    "' and trangThai = 1";
  return new Promise((resolve, reject) => {
    connection.query(query, (err, row) => {
      if (err) {
        reject(err);
      } else {
        if (row.length == 0) resolve(0);
        else resolve(row);
      }
    });
  });
}

async function insertTaiKhoan(email, pass, uname) {
  const query =
    "INSERT INTO taiKhoan (email, tenTaiKhoan, matKhau, vaiTro, trangThai) VALUES ('" +
    email +
    "','" +
    uname +
    "','" +
    pass +
    "','2','1')";
  return new Promise((resolve, reject) => {
    connection.query(query, (err, row) => {
      if (err) {
        reject(err);
      } else {
        reject(true);
      }
    });
  }).catch((err) => {
    return false;
  });
}
async function selectByIDBaiViet(idBaiViet){
  const query ="select * from baiviet where maBaiViet='"+idBaiViet+"'";
  return new Promise((resolve, reject) => {
    connection.query(query, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}
async function selectByMaChuDe(maChuDe){
  const query ="select * from baiviet where maChuDe = '"+maChuDe+"'";
  return new Promise((resolve, reject) => {
    connection.query(query, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

async function insertFormLienHe(email, uname, tieuDe, noiDung, soDienThoai){
  const query = "INSERT INTO formLienHe (email, hoTen, tieuDe, noiDung, soDienThoai,status) VALUES ('" +
  email +
  "','" +
  uname +
  "','" +
  tieuDe +
  "','" +
  noiDung +
  "','" +
  soDienThoai +
  "',1)";
  return new Promise((resolve, reject) => {
    connection.query(query, (err, row) => {
      if (err) {
        reject(err);
      } else {
        reject(true);
      }
    });
  }).catch((err) => {
  return false;
});
};
routerGeneral.get("/", async (req, res) => {
  try {
    const header = await getHeader();
    const footer = await getFooter();
    if (req.session.user == undefined)
      res.render("general/main", {
        result: footer,
        chude: header,
        header: "../general/header",
        footer: "../general/footer",
      });
    else if (req.session.user.vaiTro == 1)
      res.render("general/main", {
        header: "../admin/header",
        footer: "../general/footer",
        chude: header,
        result: footer,
        uname: req.session.user.tenTaiKhoan,
      });
    else if (req.session.user.vaiTro == 2)
      res.render("general/main", {
        header: "../clients/header",
        footer: "../general/footer",
        chude: header,
        result: footer,
        uname: req.session.user.tenTaiKhoan,
      });
  } catch (error) {
    console.error(error);
  }
});

routerGeneral.get("/signup", async (req, res) => {
  const footer = await getFooter();
  res.render("general/main", {
    result: footer,
    content: "../general/content_signup",
    footer: "../general/footer",
    header: "../general/header_signup",
  });
});
routerGeneral.post("/signup", async (req, res) => {
  const footer = await getFooter();
  var errInput = false;
  var errSignup = "Chưa nhập: ";
  console.log(req.body.email);
  console.log(checkLogin(req.body.email, req.session.pass));
  if ((await checkSignup(req.body.email)) == false) {
    errSignup = "Email này đã được đăng ký trước đó!";
    errInput = true;
  } else {
    if (req.body.email.trim() == "") {
      errSignup += "email, ";
      errInput = true;
    }
    if (req.body.uname.trim() == "") {
      errSignup += "username, ";
      errInput = true;
    }
    if (req.body.pass.trim() == "") {
      errSignup += "password, ";
      errInput = true;
    }
    errSignup = errSignup.slice(0, -2);
    errSignup += ".";
  }
  while (true) {
    if (errInput) {
      res.render("general/main", {
        result: footer,
        content: "../general/content_signup",
        footer: "../general/footer",
        header: "../general/header_signup",
        errSignup: errSignup,
        email: req.body.email,
        uname: req.body.uname,
        pass: req.body.pass,
      });
      break;
    } else if (
      !(await insertTaiKhoan(req.body.email, req.body.pass, req.body.uname))
    ) {
      res.render("general/main", {
        result: footer,
        content: "../general/content_login",
        footer: "../general/footer",
        header: "../general/header_login",
        alertMessage: "Đăng ký tài khoản thành công",
        email: req.body.email,
        pass: req.body.pass,
      });
      break;
    } else {
      errInput = true;
      errSignup = "Đã có lỗi xảy ra vui lòng thử lại sau!";
    }
  }
});
routerGeneral.get("/login", async (req, res) => {
  const footer = await getFooter();
  res.render("general/main", {
    result: footer,
    content: "../general/content_login",
    footer: "../general/footer",
    header: "../general/header_login",
  });
});
routerGeneral.post("/login", async (req, res) => {
  const login = await checkLogin(req.body.email, req.body.pass);
  const footer = await getFooter();
  if (login == 0)
    res.render("general/main", {
      result: footer,
      content: "../general/content_login",
      footer: "../general/footer",
      header: "../general/header_login",
      errLogin: 1,
      email: req.body.email,
      pass: req.body.pass,
    });
  else {
    req.session.user = login[0];
    res.redirect("/");
  }
});
routerGeneral.get("/logout", async (req, res) => {
  req.session.user = null;
  req.session.destroy((err) => {
    if (err) {
      console.err(err);
      return;
    }
    res.redirect("/");
  });
});

routerGeneral.get("/lienhe", async (req, res) => {
  if(req.session.user===undefined) {
    res.render("general/popupLienHe");
  }
  else{
    res.render("general/popupLienHe",{
      email:req.session.user.email, 
      uname:req.session.user.tenTaiKhoan
    })
  }
});
routerGeneral.post("/lienhe", async (req, res) => {
  a = await insertFormLienHe(req.body.email,req.body.hoTen,req.body.tieuDe,req.body.noiDung,req.body.soDienThoai)
  res.render("general/popupLienHe",{
    close:true
  })
});
routerGeneral.get("/xembaiviet/:id",async function(req,res){
  const header = await getHeader();
  const footer = await getFooter();
  const id= req.params.id;
  const baiviet=await selectByIDBaiViet(id);
  const baiVietLienQuan= await selectByMaChuDe(baiviet[0].maChuDe);
  const ran =baiVietLienQuan.sort(function(){return 0.5 - Math.random()} );
  if(baiviet.length==0){
    res.redirect('/');
  }
  else if(req.session.user!=undefined ){
    res.render('general/main',{
      result: footer,
      chude: header,
      header:"../clients/header.ejs",
      content:"../general/xembaiviet.ejs",
      footer: "../general/footer",
      uname: req.session.user.tenTaiKhoan,
      nonTimKiem:true,
      baiviet:baiviet[0],
      ngayDang: format(new Date(baiviet[0].ngayDang), 'dd/MM/yyyy'),
      lienquan: ran,
      ngayDang1: format(new Date(ran[0].ngayDang), 'dd/MM/yyyy'),
      ngayDang2: format(new Date(ran[1].ngayDang), 'dd/MM/yyyy'),
      ngayDang3: format(new Date(ran[2].ngayDang), 'dd/MM/yyyy'),
      
    });
  }
  else {
    console.log(baiviet[0]);
    res.render('general/main',{
      result: footer,
      chude: header,
      header:"../general/header_signup.ejs",
      content:"../general/xembaiviet.ejs",
      footer: "../general/footer",
      nonTimKiem:true,
      baiviet:baiviet[0],
      ngayDang: format(new Date(baiviet[0].ngayDang), 'dd/MM/yyyy'),
      lienquan: ran,
      ngayDang1: format(new Date(ran[0].ngayDang), 'dd/MM/yyyy'),
      ngayDang2: format(new Date(ran[1].ngayDang), 'dd/MM/yyyy'),
      ngayDang3: format(new Date(ran[2].ngayDang), 'dd/MM/yyyy'),
      ran:ran

    });
  }
});
const postHandlerByGeneral = (req, res) => {};
const putHandlerByGeneral = (req, res) => {};
const deleteHandlerByGeneral = (req, res) => {};

module.exports = { routerGeneral };
