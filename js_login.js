// 1. Hàm chuyển đổi giữa Tab Đăng nhập & Đăng ký
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

// 2. Hàm Ẩn / Hiện Mật khẩu
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

// 3. Xử lý ĐĂNG NHẬP
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = document.getElementById('loginEmail').value.trim();
    const passInput = document.getElementById('loginPassword').value.trim();

    const emailError = document.getElementById('loginEmailError');
    const passError = document.getElementById('loginPasswordError');
    const globalError = document.getElementById('loginGlobalError');
    const globalErrorText = document.getElementById('loginGlobalErrorText');

    emailError.innerText = '';
    passError.innerText = '';
    globalError.classList.add('hidden');

    let isValid = true;

    if (emailInput === '') {
        emailError.innerText = 'Vui lòng nhập Email hoặc Số điện thoại!';
        isValid = false;
    }

    if (passInput === '') {
        passError.innerText = 'Vui lòng nhập Mật khẩu!';
        isValid = false;
    }

    if (!isValid) return;

    // Giả lập kiểm tra tài khoản
    if (emailInput === 'admin@restaurant.com' && passInput === 'Admin123') {
        alert('Đăng nhập thành công với quyền Admin!');
        window.location.href = 'admin.html';
    } else if (emailInput === 'user@gmail.com' && passInput === 'User1234') {
        alert('Đăng nhập thành công!');
        window.location.href = 'index.html';
    } else {
        globalErrorText.innerText = 'Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại!';
        globalError.classList.remove('hidden');
    }
});

// 4. Xử lý ĐĂNG KÝ
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

    // Validate Email
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

    // Validate Mật khẩu (Quy định: Ít nhất 8 ký tự, gồm cả chữ và số)
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (password === '') {
        document.getElementById('regPasswordError').innerText = 'Mật khẩu không được để trống!';
        isValid = false;
    } else if (!passRegex.test(password)) {
        document.getElementById('regPasswordError').innerText = 'Mật khẩu phải từ 8 ký tự trở lên, bao gồm cả chữ và số!';
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

    // Đăng ký thành công -> Chuyển sang trang Đăng nhập
    if (isValid) {
        alert('Tạo tài khoản thành công! Bạn có thể đăng nhập ngay bây giờ.');
        document.getElementById('registerForm').reset();
        switchTab('login'); // Chuyển sang tab đăng nhập
    }
});
