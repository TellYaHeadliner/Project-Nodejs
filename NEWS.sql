
CREATE DATABASE NEWS;
USE NEWS; 

CREATE TABLE footerLIENHE(
	diaChiLienHe varchar (200),
	email varchar (100),
	facebook varchar (100),
	youtube varchar (100),
	thongTinBanQuyen varchar (200)
);

CREATE TABLE BAIVIET(
    maBaiViet int AUTO_INCREMENT PRIMARY KEY,
	tieuDeBaiViet varchar (50),
	noiDungTomTat varchar (100),
	noiDungBaiViet text,
	hinhAnhDaiDien blob,
	hinhAnhBaiViet blob,
	ngayDang datetime DEFAULT CURRENT_TIMESTAMP(),
	tacGia varchar (100),
	maChuDe char (3),
	trangThai bit
);

CREATE TABLE BINHLUAN(
	maBaiViet int,
	name varchar (100),
	noiDung text
);

CREATE TABLE formLienHe(
	hoTen varchar (200),
	email char (100),
	soDienThoai char (10),
	tieuDe varchar (100),
	ngayUpload datetime,
	status bit
);

CREATE TABLE CHUDE(
	maChuDe char (3),
	chuDe varchar (15),
	trangThai bit
);

CREATE TABLE TAIKHOAN(
    email char (100),
	tenTaiKhoan varchar(20),
	matKhau char(255),
	vaiTro int,
	trangThai bit
);

CREATE TABLE emailSubcribe(
	email char (100) PRIMARY KEY
);

INSERT INTO footerlienhe VALUES ('5 Đ. Huỳnh Thúc Kháng, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh', 'abc@gmail.com', 'https://www.facebook.com/caothang.edu.vn', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '0306221133-0306221136-0306221199');

INSERT INTO news.chude
(maChuDe, chuDe, trangThai)

CREATE DATABASE NEWS;
USE NEWS; 

CREATE TABLE footerLIENHE(
	diaChiLienHe varchar (200),
	email varchar (100),
	facebook varchar (100),
	youtube varchar (100),
	thongTinBanQuyen varchar (200)
);

CREATE TABLE BAIVIET(
    maBaiViet int AUTO_INCREMENT PRIMARY KEY,
	tieuDeBaiViet varchar (50),
	noiDungTomTat varchar (100),
	noiDungBaiViet text,
	hinhAnhDaiDien blob,
	hinhAnhBaiViet blob,
	ngayDang datetime DEFAULT CURRENT_TIMESTAMP(),
	tacGia varchar (100),
	maChuDe char (3),
	trangThai bit
);

CREATE TABLE BINHLUAN(
	maBaiViet int,
	name varchar (100),
	noiDung text
);

CREATE TABLE formLienHe(
	hoTen varchar (200),
	email char (100),
	soDienThoai char (10),
	tieuDe varchar (100),
	ngayUpload datetime,
	status bit
);

CREATE TABLE CHUDE(
	maChuDe char (3),
	chuDe varchar (15),
	trangThai bit
);

CREATE TABLE TAIKHOAN(
  email char (100),
	tenTaiKhoan varchar(20),
	matKhau char(255),
	vaiTro int,
	trangThai bit
);

CREATE TABLE emailSubcribe(
	email char (100) PRIMARY KEY
);

INSERT INTO footerlienhe VALUES ('5 Đ. Huỳnh Thúc Kháng, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh', 'abc@gmail.com', 'https://www.facebook.com/caothang.edu.vn', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '0306221133-0306221136-0306221199');

INSERT INTO news.chude
(maChuDe, chuDe, trangThai)

