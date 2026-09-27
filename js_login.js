// 1. Hàm chuyển đổi qua lại giữa Tab Đăng nhập & Đăng ký
function switchTab(tabName) {
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (tabName === 'login') {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    } else {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    }
}

// 2. Hàm Ẩn / Hiện Mật khẩu khi bấm vào icon Con mắt
function togglePassword(inputId, iconElement) {
    const input = document.getElementById(inputId);
    
    if (input.type === 'password') {
        input.type = 'text';
        iconElement.classList.remove('fa-eye-slash');
        iconElement.classList.add('fa-eye');
    } else {
        input.type = 'password';
        iconElement.classList.remove('fa-eye');
        iconElement.classList.add('fa-eye-slash');
    }
}

// 3. Xử lý ĐĂNG NHẬP & Bắt lỗi / Kiểm tra tài khoản
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = document.getElementById('loginEmail').value.trim();
    const passInput = document.getElementById('loginPassword').value.trim();

    const emailError = document.getElementById('loginEmailError');
    const passError = document.getElementById('loginPasswordError');
    const globalError = document.getElementById('loginGlobalError');
    const globalErrorText = document.getElementById('loginGlobalErrorText');

    // Reset thông báo lỗi cũ
    emailError.innerText = '';
    passError.innerText = '';
    globalError.classList.add('hidden');

    let isValid = true;

    // Validate rỗng
    if (emailInput === '') {
        emailError.innerText = 'Vui lòng nhập Email hoặc Số điện thoại!';
        isValid = false;
    }

    if (passInput === '') {
        passError.innerText = 'Vui lòng nhập Mật khẩu!';
        isValid = false;
    }

    if (!isValid) return;

    // Giả lập kiểm tra Tài khoản & Mật khẩu đúng/sai
    if (emailInput === 'admin@restaurant.com' && passInput === 'Admin123@') {
        alert('Đăng nhập thành công với quyền Admin!');
        window.location.href = 'admin.html'; // Chuyển sang trang Admin
    } else if (emailInput === 'user@gmail.com' && passInput === 'User123@') {
        alert('Đăng nhập thành công với quyền Khách hàng!');
        window.location.href = 'index.html'; // Chuyển sang trang chủ
    } else {
        // Thông báo lỗi khi nhập SAI thông tin (giống Facebook / Game Liên Quân)
        globalErrorText.innerText = 'Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại!';
        globalError.classList.remove('hidden');
    }
});

// 4. Xử lý ĐĂNG KÝ & Bắt lỗi dữ liệu
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const confirmPassword = document.getElementById('regConfirmPassword').value.trim();

    let isValid = true;

    // Validate Tên
    if (name === '') {
        document.getElementById('regNameError').innerText = 'Họ và tên không được để trống!';
        isValid = false;
    } else {
        document.getElementById('regNameError').innerText = '';
    }

    // Validate Email bằng Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('regEmailError').innerText = 'Email không được để trống!';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('regEmailError').innerText = 'Định dạng Email không hợp lệ!';
        isValid = false;
    } else {
        document.getElementById('regEmailError').innerText = '';
    }

    // Validate Mật khẩu
    if (password === '') {
        document.getElementById('regPasswordError').innerText = 'Mật khẩu không được để trống!';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('regPasswordError').innerText = 'Mật khẩu phải có ít nhất 6 ký tự!';
        isValid = false;
    } else {
        document.getElementById('regPasswordError').innerText = '';
    }

    // Validate Mật khẩu xác nhận
    if (confirmPassword === '') {
        document.getElementById('regConfirmPasswordError').innerText = 'Vui lòng xác nhận mật khẩu!';
        isValid = false;
    } else if (confirmPassword !== password) {
        document.getElementById('regConfirmPasswordError').innerText = 'Mật khẩu xác nhận không khớp!';
        isValid = false;
    } else {
        document.getElementById('regConfirmPasswordError').innerText = '';
    }

    if (isValid) {
        alert('Tạo tài khoản thành công! Hãy đăng nhập ngay.');
        switchTab('login'); // Tự chuyển qua tab Đăng nhập
    }
});