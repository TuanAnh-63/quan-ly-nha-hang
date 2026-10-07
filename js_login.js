// JS LOGIN & REGISTER - XỬ LÝ LƯU LOCALSTORAGE & ADMIN

document.addEventListener('DOMContentLoaded', function () {

    // 1. Hàm chuyển Tab Đăng Nhập / Đăng Ký
    window.switchTab = function (tabName) {
        const loginFormContainer = document.getElementById('loginFormContainer');
        const registerFormContainer = document.getElementById('registerFormContainer');
        const tabLoginBtn = document.getElementById('tabLoginBtn');
        const tabRegisterBtn = document.getElementById('tabRegisterBtn');
        const loginError = document.getElementById('loginError');
        const registerMsg = document.getElementById('registerMsg');

        if (loginError) loginError.style.display = 'none';
        if (registerMsg) registerMsg.style.display = 'none';

        if (tabName === 'login') {
            loginFormContainer.style.display = 'block';
            registerFormContainer.style.display = 'none';
            if (tabLoginBtn) tabLoginBtn.classList.add('active');
            if (tabRegisterBtn) tabRegisterBtn.classList.remove('active');
        } else {
            loginFormContainer.style.display = 'none';
            registerFormContainer.style.display = 'block';
            if (tabLoginBtn) tabLoginBtn.classList.remove('active');
            if (tabRegisterBtn) tabRegisterBtn.classList.add('active');
        }
    };

    // 2. Xử lý nút ẩn/hiện mật khẩu (Con mắt)
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            const input = this.parentElement.querySelector('input');
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    // 3. Xử lý ĐĂNG KÝ
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const fullName = document.getElementById('regFullName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;
            const registerMsg = document.getElementById('registerMsg');

            if (password !== confirmPassword) {
                showMsg(registerMsg, 'Mật khẩu xác nhận không khớp!', 'error');
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];

            const isExist = users.some(u => u.email.toLowerCase() === email.toLowerCase());
            if (isExist) {
                showMsg(registerMsg, 'Email này đã được đăng ký!', 'error');
                return;
            }

            const newUser = {
                fullName: fullName,
                email: email,
                password: password,
                role: 'admin'
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            showMsg(registerMsg, 'Đăng ký thành công! Đang chuyển sang Đăng nhập...', 'success');
            registerForm.reset();

            setTimeout(() => {
                switchTab('login');
                document.getElementById('loginEmail').value = email;
            }, 1200);
        });
    }

    // 4. Xử lý ĐĂNG NHẬP
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = document.getElementById('loginEmail').value.trim();
            const passwordInput = document.getElementById('loginPassword').value;
            const loginError = document.getElementById('loginError');

            let users = JSON.parse(localStorage.getItem('users')) || [];

            const foundUser = users.find(u => 
                (u.email.toLowerCase() === emailInput.toLowerCase() || u.phone === emailInput) && 
                u.password === passwordInput
            );

            if (foundUser) {
                localStorage.setItem('currentUser', JSON.stringify(foundUser));

                showMsg(loginError, 'Đăng nhập thành công! Đang chuyển hướng...', 'success');

                setTimeout(() => {
                    window.location.href = 'html_admin.html';
                }, 800);
            } else {
                showMsg(loginError, 'Tài khoản hoặc mật khẩu không chính xác!', 'error');
            }
        });
    }

    // Hàm hiển thị thông báo
    function showMsg(element, text, type) {
        if (!element) return;
        element.style.display = 'block';
        element.textContent = text;
        if (type === 'error') {
            element.style.color = '#721c24';
            element.style.backgroundColor = '#f8d7da';
        } else {
            element.style.color = '#155724';
            element.style.backgroundColor = '#d4edda';
        }
    }
});
