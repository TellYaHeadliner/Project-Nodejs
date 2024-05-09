function validateForm() {
    var email = document.getElementById('exampleInputEmail1').value;
    var username = document.getElementById('tenNguoiDung').value;
    var password = document.getElementById('exampleInputPassword1').value;
    
    if (!email || !username || !password) {
        alert("Vui lòng điền đầy đủ thông tin vào các trường.");
        return false;
    }
    // Kiểm tra xem email có đúng định dạng không
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Vui lòng nhập địa chỉ email hợp lệ.");
        return false;
    }
    return true;
}