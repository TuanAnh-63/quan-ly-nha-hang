const adminUser = (function checkAdminAuth() {
    function readUser(storage) {
        try { return JSON.parse(storage.getItem('currentUser')); } catch (e) { return null; }
    }
    const user = readUser(sessionStorage) || readUser(localStorage);

    if (!user || user.role !== 'admin') {
        document.documentElement.style.display = 'none';
        alert(!user
            ? 'Vui lòng đăng nhập trước khi truy cập trang Quản trị!'
            : 'Tài khoản của bạn không có quyền truy cập trang Quản trị!');
        window.location.href = 'html_login.html';
        return null;
    }
    return user;
})();

function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

document.addEventListener('DOMContentLoaded', function () {

    if (!adminUser) return;

    const currentUser = adminUser;
    if (currentUser) {
        const adminNameElem = document.getElementById('adminName');
        if (adminNameElem) {
            adminNameElem.textContent = currentUser.fullName || currentUser.email || 'Quản Trị Viên';
        }
    }

    // CHUYỂN TAB SIDEBAR ADMIN
    window.switchAdminTab = function (tabId, element) {
        const allTabs = document.querySelectorAll('.tab-content');
        allTabs.forEach(tab => {
            tab.style.display = 'none';
            tab.classList.remove('active');
        });

        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => item.classList.remove('active'));

        const selectedTab = document.getElementById('tab-' + tabId);
        if (selectedTab) {
            selectedTab.style.display = 'block';
            selectedTab.classList.add('active');
        }

        if (element) {
            element.classList.add('active');
        }

        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            switch (tabId) {
                case 'dashboard':
                    pageTitle.textContent = 'Tổng Quan Hệ Thống';
                    updateDashboardStats();
                    break;
                case 'dishes':
                    pageTitle.textContent = 'Quản Lý Món Ăn';
                    renderDishList();
                    break;
                case 'tables':
                    pageTitle.textContent = 'Quản Lý Đặt Bàn';
                    renderTableList();
                    break;
                case 'users':
                    pageTitle.textContent = 'Quản Lý Tài Khoản';
                    renderUserList();
                    break;
            }
        }
    };

    // QUẢN LÝ MÓN ĂN
    let initialDishes = [
        { id: 1, name: 'Lẩu Thái Bò', category: 'Lẩu Thái', price: 299000, status: 'Còn hàng' },
        { id: 2, name: 'Lẩu Thái Thập Cẩm', category: 'Lẩu Thái', price: 299000, status: 'Còn hàng' },
        { id: 3, name: 'Lẩu Riêu Cua Bắp Bò Sườn Sụn', category: 'Lẩu Riêu Cua', price: 299000, status: 'Còn hàng' },
        { id: 4, name: 'Lẩu Riêu Cua Bò', category: 'Lẩu Riêu Cua', price: 299000, status: 'Còn hàng' },
        { id: 5, name: 'Lẩu Kim Chi Bò', category: 'Lẩu Kim Chi', price: 299000, status: 'Còn hàng' },
        { id: 6, name: 'Lẩu Kim Chi Thập Cẩm', category: 'Lẩu Kim Chi', price: 299000, status: 'Còn hàng' },
        { id: 7, name: 'Lẩu Nấm Bò', category: 'Lẩu Nấm', price: 299000, status: 'Còn hàng' },
        { id: 8, name: 'Lẩu Nấm Thập Cẩm', category: 'Lẩu Nấm', price: 299000, status: 'Còn hàng' },
        { id: 9, name: 'Combo Bò Nướng', category: 'Combo Nướng', price: 359000, status: 'Còn hàng' },
        { id: 10, name: 'Combo Thịt Nướng Mê Ly', category: 'Combo Nướng', price: 399000, status: 'Còn hàng' },
        { id: 11, name: 'Ba chỉ bò', category: 'Thịt nhúng lẩu', price: 80000, status: 'Còn hàng' },
        { id: 12, name: 'Sụn Heo tươi', category: 'Thịt nhúng lẩu', price: 70000, status: 'Còn hàng' },
        { id: 13, name: 'Bắp bò tươi', category: 'Thịt nhúng lẩu', price: 90000, status: 'Còn hàng' },
        { id: 14, name: 'Coca Cola - lon 320ml', category: 'Đồ uống', price: 15000, status: 'Còn hàng' }
    ];

    const legacySeedNames = ['Lẩu Thái Tomyum', 'Lẩu Nấm Thượng Hạng', 'Bò Mỹ Thượng Hạng', 'Nấm Kim Châm'];
    (function seedDishes() {
        let list = null;
        try {
            const parsed = JSON.parse(localStorage.getItem('dishesList'));
            if (Array.isArray(parsed)) list = parsed;
        } catch (e) {}
        const isLegacy = list && list.length === legacySeedNames.length &&
            list.every((d, i) => d && d.name === legacySeedNames[i]);
        if (!list || isLegacy) {
            localStorage.setItem('dishesList', JSON.stringify(initialDishes));
        }
    })();

    function renderDishList() {
        const tbody = document.getElementById('dishTableBody');
        if (!tbody) return;

        let dishes = [];
        try { dishes = JSON.parse(localStorage.getItem('dishesList')) || []; } catch(e){}
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
                <td><strong>${escapeHTML(dish.name)}</strong></td>
                <td>${escapeHTML(dish.category)}</td>
                <td>${Number(dish.price).toLocaleString('vi-VN')} VNĐ</td>
                <td><span class="badge ${badgeClass}">${escapeHTML(dish.status)}</span></td>
                <td>
                    <button class="btn-edit btn-edit-dish" data-id="${dish.id}"><i class="fa-solid fa-pen-to-square"></i> Sửa</button>
                    <button class="btn-delete btn-delete-dish" data-id="${dish.id}"><i class="fa-solid fa-trash"></i> Xóa</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        document.querySelectorAll('.btn-edit-dish').forEach(btn => {
            btn.addEventListener('click', function() { editDish(Number(this.getAttribute('data-id'))); });
        });

        document.querySelectorAll('.btn-delete-dish').forEach(btn => {
            btn.addEventListener('click', function() { deleteDish(Number(this.getAttribute('data-id'))); });
        });
    }

    const addDishForm = document.getElementById('addDishForm');
    if (addDishForm) {
        addDishForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const editId = document.getElementById('editDishId').value;
            const dishName = document.getElementById('dishName')?.value.trim();
            const dishCategory = document.getElementById('dishCategory')?.value;
            const dishPrice = Number(document.getElementById('dishPrice')?.value);
            const dishStatus = document.getElementById('dishStatus')?.value || 'Còn hàng';

            if (!dishName || isNaN(dishPrice) || dishPrice <= 0) {
                alert('Vui lòng nhập tên món ăn và giá bán phải lớn hơn 0!');
                return;
            }

            let dishes = JSON.parse(localStorage.getItem('dishesList')) || [];

            if (editId) {
                const index = dishes.findIndex(d => d.id === Number(editId));
                if (index !== -1) {
                    dishes[index] = { id: Number(editId), name: dishName, category: dishCategory, price: dishPrice, status: dishStatus };
                    alert('Cập nhật món ăn thành công!');
                }
            } else {
                const isDuplicate = dishes.some(d => d.name.toLowerCase() === dishName.toLowerCase());
                if (isDuplicate) {
                    alert('Tên món ăn này đã tồn tại trong menu!');
                    return;
                }

                dishes.push({ id: Date.now(), name: dishName, category: dishCategory, price: dishPrice, status: dishStatus });
                alert('Thêm món ăn mới thành công!');
            }

            localStorage.setItem('dishesList', JSON.stringify(dishes));
            resetDishForm();
            renderDishList();
            updateDashboardStats();
        });
    }

    function editDish(dishId) {
        let dishes = JSON.parse(localStorage.getItem('dishesList')) || [];
        let dish = dishes.find(d => d.id === dishId);
        if (dish) {
            document.getElementById('editDishId').value = dish.id;
            document.getElementById('dishName').value = dish.name;
            const categorySelect = document.getElementById('dishCategory');
            if (!Array.from(categorySelect.options).some(o => o.value === dish.category)) {
                categorySelect.add(new Option(dish.category, dish.category));
            }
            categorySelect.value = dish.category;
            document.getElementById('dishPrice').value = dish.price;
            document.getElementById('dishStatus').value = dish.status;

            document.getElementById('formDishTitle').innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Cập Nhật Món Ăn';
            document.getElementById('btnDishSubmit').innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Lưu Cập Nhật';
            document.getElementById('btnCancelEdit').style.display = 'block';
        }
    }

    document.getElementById('btnCancelEdit')?.addEventListener('click', resetDishForm);

    function resetDishForm() {
        document.getElementById('addDishForm').reset();
        document.getElementById('editDishId').value = '';
        document.getElementById('formDishTitle').innerHTML = '<i class="fa-solid fa-plus-circle"></i> Thêm Món Ăn Mới';
        document.getElementById('btnDishSubmit').innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Lưu Món Ăn';
        document.getElementById('btnCancelEdit').style.display = 'none';
    }

    function deleteDish(dishId) {
        if (confirm('Bạn có chắc chắn muốn xóa món ăn này khỏi menu?')) {
            let dishes = JSON.parse(localStorage.getItem('dishesList')) || [];
            dishes = dishes.filter(d => d.id !== dishId);
            localStorage.setItem('dishesList', JSON.stringify(dishes));
            renderDishList();
            updateDashboardStats();
        }
    }

    // QUẢN LÝ ĐẶT BÀN
    let initialBookings = [
        { id: 'DB001', name: 'Nguyễn Văn A', phone: '0912345678', datetime: '19:00 - 07/10/2026', guests: '4 Khách', status: 'Chờ xác nhận' },
        { id: 'DB002', name: 'Trần Thị B', phone: '0987654321', datetime: '20:00 - 07/10/2026', guests: '2 Khách', status: 'Đã xác nhận' }
    ];

    if (!localStorage.getItem('bookings')) {
        localStorage.setItem('bookings', JSON.stringify(initialBookings));
    }

    function renderTableList() {
        const tbody = document.getElementById('bookingTableBody');
        if (!tbody) return;

        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        tbody.innerHTML = '';

        if (bookings.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">Chưa có đơn đặt bàn nào.</td></tr>';
            return;
        }

        bookings.forEach((item, index) => {
            const tr = document.createElement('tr');
            const isConfirmed = item.status === 'Đã xác nhận';
            const badgeStyle = isConfirmed ? 'background:#d4edda; color:#155724;' : 'background:#fff3cd; color:#856404;';

            tr.innerHTML = `
                <td>#${index + 1}</td>
                <td><strong>${escapeHTML(item.name)}</strong></td>
                <td>${escapeHTML(item.phone)}</td>
                <td>${escapeHTML(item.datetime)}</td>
                <td>${escapeHTML(item.guests)}</td>
                <td><span class="badge" style="${badgeStyle} padding:4px 8px; border-radius:4px;">${escapeHTML(item.status)}</span></td>
                <td>
                    ${!isConfirmed ? `<button class="btn-confirm-booking" data-id="${item.id}" style="background:#28a745; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Xác nhận</button>` : ''}
                    <button class="btn-cancel-booking" data-id="${item.id}" style="background:#dc3545; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Hủy</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        document.querySelectorAll('.btn-confirm-booking').forEach(btn => {
            btn.addEventListener('click', function() { updateBookingStatus(this.getAttribute('data-id'), 'Đã xác nhận'); });
        });

        document.querySelectorAll('.btn-cancel-booking').forEach(btn => {
            btn.addEventListener('click', function() { deleteBooking(this.getAttribute('data-id')); });
        });
    }

    function updateBookingStatus(id, newStatus) {
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        let item = bookings.find(b => b.id === id);
        if (item) {
            item.status = newStatus;
            localStorage.setItem('bookings', JSON.stringify(bookings));
            renderTableList();
            updateDashboardStats();
        }
    }

    function deleteBooking(id) {
        if (confirm('Bạn có chắc muốn xóa đơn đặt bàn này?')) {
            let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
            bookings = bookings.filter(b => b.id !== id);
            localStorage.setItem('bookings', JSON.stringify(bookings));
            renderTableList();
            updateDashboardStats();
        }
    }

    // QUẢN LÝ TÀI KHOẢN
    function renderUserList() {
        const tbody = document.getElementById('adminUserTableBody');
        if (!tbody) return;

        let users = [];
        try { users = JSON.parse(localStorage.getItem('users')) || []; } catch(e){}
        tbody.innerHTML = '';

        if (users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#888;">Chưa có tài khoản nào được đăng ký.</td></tr>';
            return;
        }

        users.forEach((user, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${index + 1}</td>
                <td><strong>${escapeHTML(user.fullName || 'Chưa cập nhật')}</strong></td>
                <td>${escapeHTML(user.email)}</td>
                <td><span class="badge badge-success" style="background:#d4edda; color:#155724; padding:3px 8px; border-radius:4px;">${escapeHTML(user.role || 'admin')}</span></td>
                <td>
                    <button class="btn-delete-account" data-email="${escapeHTML(user.email)}" style="background:#dc3545; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">
                        <i class="fa-solid fa-trash"></i> Xóa
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        document.querySelectorAll('.btn-delete-account').forEach(btn => {
            btn.addEventListener('click', function() {
                const userEmail = this.getAttribute('data-email');
                removeAccount(userEmail);
            });
        });
    }

    function removeAccount(email) {
        if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
            alert('Bạn không thể tự xóa tài khoản Quản trị đang đăng nhập!');
            return;
        }

        if (confirm(`Bạn có chắc chắn muốn xóa tài khoản: ${email}?`)) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users = users.filter(u => u.email.toLowerCase() !== email.toLowerCase());
            localStorage.setItem('users', JSON.stringify(users));
            renderUserList();
            updateDashboardStats();
        }
    }

    // DASHBOARD THỐNG KÊ
    function updateDashboardStats() {
        let dishes = [], users = [], bookings = [];
        try {
            dishes = JSON.parse(localStorage.getItem('dishesList')) || [];
            users = JSON.parse(localStorage.getItem('users')) || [];
            bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        } catch(e){}

        const dishesCountEl = document.getElementById('statDishesCount');
        const usersCountEl = document.getElementById('statUsersCount');
        const bookingsCountEl = document.getElementById('statBookingsCount');
        const activityTextEl = document.getElementById('statActivityText');

        if (dishesCountEl) dishesCountEl.textContent = dishes.length;
        if (usersCountEl) usersCountEl.textContent = users.length;
        if (bookingsCountEl) bookingsCountEl.textContent = bookings.length;
        if (activityTextEl) {
            activityTextEl.textContent = `Hệ thống hiện ghi nhận ${bookings.length} lượt đặt bàn, ${dishes.length} món ăn trong thực đơn và ${users.length} tài khoản thành viên.`;
        }
    }

    // ĐĂNG XUẤT
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                localStorage.removeItem('currentUser');
                sessionStorage.removeItem('currentUser');
                window.location.href = 'html_login.html';
            }
        });
    }

    // Khởi tạo mặc định
    renderDishList();
    renderUserList();
    renderTableList();
    updateDashboardStats();
});
