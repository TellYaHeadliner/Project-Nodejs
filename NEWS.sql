CREATE DATABASE NEWS
USE NEWS 

CREATE TABLE LIENHE(
	diaChiLienHe varchar (200),
	email varchar (100),
	facebook varchar (100),
	youtube varchar (100),
	thongTinBanQuyen (200)
)

CREATE TABLE BAIVIET(
	hinhAnhDaiDien blob,
	tieuDeBaiViet varchar (50),
	ngayDang DEFAULT date(),
	noiDungTomTat varchar (100),
	maChuDe char (3)
)

CREATE TABLE CHUDE(
	maChuDe char (3),
	chuDe varchar (15)
)

