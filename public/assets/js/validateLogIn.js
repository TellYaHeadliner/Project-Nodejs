function validateLoginForm() {
    var email = document.getElementById('exampleInputEmail1').value;
    var password = document.getElementById('exampleInputPassword1').value;
    
    if (!email || !password) {
        alert("Vui lòng điền đầy đủ thông tin vào các trường.");
        return false;
    }
    // Kiểm tra email có đúng định dạng không
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Vui lòng nhập địa chỉ email hợp lệ.");
        return false;
    }
    return true;
}