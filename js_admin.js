// JS ADMIN - QUẢN LÝ TỔNG THỂ HỆ THỐNG F&B

document.addEventListener('DOMContentLoaded', function () {

    // 1. KIỂM TRA ĐĂNG NHẬP & HIỂN THỊ TÊN ADMIN
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        const adminNameElem = document.getElementById('adminName');
        if (adminNameElem) {
            adminNameElem.textContent = currentUser.fullName || currentUser.email || 'Quản Trị Viên';
        }
    }

    // 2. CHỨC NĂNG CHUYỂN TAB SIDEBAR (TỔNG QUAN, MÓN ĂN, ĐẶT BÀN, TÀI KHOẢN)
    window.switchAdminTab = function (tabId, element) {
        // Ẩn tất cả các Section tab-content
        const allTabs = document.querySelectorAll('.tab-content');
        allTabs.forEach(tab => {
            tab.style.display = 'none';
            tab.classList.remove('active');
        });

        // Bỏ class active ở tất cả thẻ menu-item
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.classList.remove('active');
        });

        // Hiển thị Tab được chọn
        const selectedTab = document.getElementById('tab-' + tabId);
        if (selectedTab) {
            selectedTab.style.display = 'block';
            selectedTab.classList.add('active');
        }

        // Active thẻ nút menu được bấm
        if (element) {
            element.classList.add('active');
        }

        // Cập nhật tiêu đề Header theo từng Tab
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            switch (tabId) {
                case 'dashboard':
                    pageTitle.textContent = 'Tổng Quan Hệ Thống';
                    break;
                case 'dishes':
                    pageTitle.textContent = 'Quản Lý Món Ăn';
                    renderDishList();
                    break;
                case 'tables':
                    pageTitle.textContent = 'Quản Lý ĐẶt Bàn';
                    renderTableList();
                    break;
                case 'users':
                    pageTitle.textContent = 'Quản Lý Tài Khoản';
                    renderUserList();
                    break;
            }
        }
    };


    // 3. QUẢN LÝ MÓN ĂN (DISHES MANAGEMENT)
    const addDishForm = document.getElementById('addDishForm');
    
    // Khởi tạo danh sách món ăn mặc định nếu LocalStorage chưa có
    let initialDishes = [
        { id: 1, name: 'Lẩu Thái Tomyum', category: 'Lẩu', price: 199000, status: 'Còn hàng' },
        { id: 2, name: 'Lẩu Nấm Thượng Hạng', category: 'Lẩu', price: 159000, status: 'Còn hàng' },
        { id: 3, name: 'Bò Mỹ Thượng Hạng', category: 'Món Ăn Kèm', price: 129000, status: 'Còn hàng' },
        { id: 4, name: 'Nấm Kim Tỉnh', category: 'Rau Rủ', price: 35000, status: 'Hết hàng' }
    ];

    if (!localStorage.getItem('dishesList')) {
        localStorage.setItem('dishesList', JSON.stringify(initialDishes));
    }

    // Hàm render danh sách món ăn ra bảng
    function renderDishList() {
        const tbody = document.getElementById('dishTableBody');
        if (!tbody) return;

        let dishes = JSON.parse(localStorage.getItem('dishesList')) || [];
        tbody.innerHTML = '';

        if (dishes.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Chưa có món ăn nào trong thực đơn.</td></tr>';
            return;
        }

        dishes.forEach((dish, index) => {
            const tr = document.createElement('tr');
            const badgeClass = dish.status === 'Còn hàng' ? 'badge-success' : 'badge-danger';
            
            tr.innerHTML = `
                <td>#${index + 1}</td>
                <td><strong>${dish.name}</strong></td>
                <td>${dish.category}</td>
                <td>${Number(dish.price).toLocaleString('vi-VN')} VNĐ</td>
                <td><span class="badge ${badgeClass}">${dish.status}</span></td>
                <td>
                    <button class="btn-edit" onclick="editDish(${dish.id})"><i class="fa-solid fa-pen-to-square"></i> Sửa</button>
                    <button class="btn-delete" onclick="deleteDish(${dish.id})"><i class="fa-solid fa-trash"></i> Xóa</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Xử lý Form Thêm Món Ăn Mới
    if (addDishForm) {
        addDishForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const dishName = document.getElementById('dishName')?.value.trim();
            const dishCategory = document.getElementById('dishCategory')?.value;
            const dishPrice = document.getElementById('dishPrice')?.value;
            const dishStatus = document.getElementById('dishStatus')?.value || 'Còn hàng';

            if (!dishName || !dishPrice) {
                alert('Vui lòng nhập đầy đủ thông tin món ăn!');
                return;
            }

            let dishes = JSON.parse(localStorage.getItem('dishesList')) || [];
            
            const newDish = {
                id: Date.now(),
                name: dishName,
                category: dishCategory,
                price: Number(dishPrice),
                status: dishStatus
            };

            dishes.push(newDish);
            localStorage.setItem('dishesList', JSON.stringify(dishes));
            
            alert('Thêm món ăn thành công!');
            addDishForm.reset();
            renderDishList();
        });
    }

    // Xóa món ăn
    window.deleteDish = function (dishId) {
        if (confirm('Bạn có chắc chắn muốn xóa món ăn này khỏi menu?')) {
            let dishes = JSON.parse(localStorage.getItem('dishesList')) || [];
            dishes = dishes.filter(d => d.id !== dishId);
            localStorage.setItem('dishesList', JSON.stringify(dishes));
            renderDishList();
        }
    };

    // Sửa món ăn (Demo cập nhật trạng thái nhanh)
    window.editDish = function (dishId) {
        let dishes = JSON.parse(localStorage.getItem('dishesList')) || [];
        let dish = dishes.find(d => d.id === dishId);
        if (dish) {
            let newPrice = prompt('Nhập giá bán mới cho món ' + dish.name + ':', dish.price);
            if (newPrice !== null && !isNaN(newPrice) && newPrice !== '') {
                dish.price = Number(newPrice);
                localStorage.setItem('dishesList', JSON.stringify(dishes));
                renderDishList();
            }
        }
    };

    // 4. QUẢN LÝ ĐẶT BÀN (TABLES MANAGEMENT)
    function renderTableList() {
        // Hàm load dữ liệu bảng đặt bàn nếu có trong LocalStorage
        console.log("Đã tải dữ liệu danh sách đặt bàn.");
    }

    // 5. QUẢN LÝ TÀI KHOẢN (USERS MANAGEMENT
    function renderUserList() {
        const tbody = document.getElementById('adminUserTableBody');
        if (!tbody) return;

        let users = JSON.parse(localStorage.getItem('users')) || [];
        tbody.innerHTML = '';

        if (users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#888;">Chưa có tài khoản nào được đăng ký.</td></tr>';
            return;
        }

        users.forEach((user, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${index + 1}</td>
                <td><strong>${user.fullName || 'Chưa cập nhật'}</strong></td>
                <td>${user.email}</td>
                <td><span class="badge badge-success" style="background:#d4edda; color:#155724; padding:3px 8px; border-radius:4px;">${user.role || 'NguoiDung'}</span></td>
                <td>
                    <button onclick="removeAccount('${user.email}')" style="background:#dc3545; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">
                        <i class="fa-solid fa-trash"></i> Xóa
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Hàm xóa tài khoản người dùng
    window.removeAccount = function (email) {
        if (confirm(`Bạn có chắc chắn muốn xóa tài khoản: ${email}?`)) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users = users.filter(u => u.email.toLowerCase() !== email.toLowerCase());
            localStorage.setItem('users', JSON.stringify(users));
            renderUserList();
        }
    };

    // 6. XỬ LÝ ĐĂNG XUẤT TÀI KHOẢN
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                localStorage.removeItem('currentUser');
                window.location.href = 'html_login.html';
            }
        });
    }

    // 7. KHỞI TẠO MẶC ĐỊNH
    renderDishList();
    renderUserList();
});
