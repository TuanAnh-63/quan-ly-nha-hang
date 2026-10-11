// HÀM HASH MẬT KHẨU SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// HÀM ĐỌC USERS AN TOÀN TRÁNH CRASH
function getUsers() {
    try {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    } catch (e) {
        console.error("Lỗi đọc dữ liệu localStorage:", e);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', function () {

    // 1. Chuyển Tab Đăng nhập / Đăng ký
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

    // 2. Ẩn/Hiện Mật khẩu
    document.querySelectorAll('.toggle-password').forEach(icon => {
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

    // 3. XỬ LÝ ĐĂNG KÝ (Gán quyền admin để trực tiếp vào được trang quản trị)
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const fullName = document.getElementById('regFullName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const phone = document.getElementById('regPhone') ? document.getElementById('regPhone').value.trim() : '';
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;
            const registerMsg = document.getElementById('registerMsg');

            if (password.length < 6) {
                showMsg(registerMsg, 'Mật khẩu phải từ 6 ký tự trở lên!', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showMsg(registerMsg, 'Mật khẩu xác nhận không khớp!', 'error');
                return;
            }

            let usersList = getUsers();

            const isExist = usersList.some(u => u.email.toLowerCase() === email.toLowerCase() || (phone && u.phone === phone));
            if (isExist) {
                showMsg(registerMsg, 'Email hoặc Số điện thoại này đã được đăng ký!', 'error');
                return;
            }

            const hashedPassword = await hashPassword(password);

            // Gán role là 'admin' để truy cập vào trang admin
            const newUser = {
                fullName: fullName,
                email: email,
                phone: phone,
                password: hashedPassword,
                role: 'admin'
            };

            usersList.push(newUser);
            localStorage.setItem('users', JSON.stringify(usersList));

            showMsg(registerMsg, 'Đăng ký thành công! Đang chuyển sang Đăng nhập...', 'success');
            registerForm.reset();

            setTimeout(() => {
                switchTab('login');
                document.getElementById('loginEmail').value = email;
            }, 1200);
        });
    }

    // 4. XỬ LÝ ĐĂNG NHẬP & CHUYỂN HƯỚNG TỚI HTML_ADMIN.HTML
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const emailInput = document.getElementById('loginEmail').value.trim();
            const passwordInput = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe') ? document.getElementById('rememberMe').checked : true;
            const loginError = document.getElementById('loginError');

            let usersList = getUsers();
            const hashedPasswordInput = await hashPassword(passwordInput);

            const foundUser = usersList.find(u => 
                (u.email.toLowerCase() === emailInput.toLowerCase() || u.phone === emailInput) && 
                u.password === hashedPasswordInput
            );

            if (foundUser) {
                const { password, ...safeUser } = foundUser;

                // Lưu thông tin người dùng hiện tại
                if (rememberMe) {
                    localStorage.setItem('currentUser', JSON.stringify(safeUser));
                } else {
                    sessionStorage.setItem('currentUser', JSON.stringify(safeUser));
                }

                showMsg(loginError, 'Đăng nhập thành công! Đang chuyển hướng sang Admin...', 'success');

                // Chuyển hướng thẳng sang html_admin.html
                setTimeout(() => {
                    window.location.href = 'admin.html';
                }, 800);
            } else {
                showMsg(loginError, 'Tài khoản hoặc mật khẩu không chính xác!', 'error');
            }
        });
    }

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
