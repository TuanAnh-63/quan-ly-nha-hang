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
        window.location.href = 'login.html';
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
                case 'floor':
                    pageTitle.textContent = 'Quản Lý Bàn';
                    renderFloorList();
                    break;
                case 'reports':
                    pageTitle.textContent = 'Báo Cáo Doanh Thu';
                    renderReport();
                    break;
                case 'orders':
                    pageTitle.textContent = 'Quản Lý Đơn Hàng';
                    renderOrderList();
                    break;
                case 'contacts':
                    pageTitle.textContent = 'Tin Nhắn Liên Hệ';
                    renderContactList();
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
    const EXTRA_DISHES = [
        { id: 15, name: "Nước lẩu Thái Tomyum", category: "Nước lẩu", price: 79000, status: 'Còn hàng' },
        { id: 16, name: "Nước lẩu Riêu Cua", category: "Nước lẩu", price: 79000, status: 'Còn hàng' },
        { id: 17, name: "Nước lẩu Kim Chi", category: "Nước lẩu", price: 79000, status: 'Còn hàng' },
        { id: 18, name: "Nước lẩu Nấm", category: "Nước lẩu", price: 69000, status: 'Còn hàng' },
        { id: 19, name: "Đĩa rau hỗn hợp", category: "Rau - Nấm - Viên - Mì", price: 35000, status: 'Còn hàng' },
        { id: 20, name: "Nấm kim châm", category: "Rau - Nấm - Viên - Mì", price: 30000, status: 'Còn hàng' },
        { id: 21, name: "Nấm đùi gà", category: "Rau - Nấm - Viên - Mì", price: 40000, status: 'Còn hàng' },
        { id: 22, name: "Nấm hải sản", category: "Rau - Nấm - Viên - Mì", price: 35000, status: 'Còn hàng' },
        { id: 23, name: "Viên tôm hùm", category: "Rau - Nấm - Viên - Mì", price: 55000, status: 'Còn hàng' },
        { id: 24, name: "Viên cá thác lác", category: "Rau - Nấm - Viên - Mì", price: 50000, status: 'Còn hàng' },
        { id: 25, name: "Đậu phụ chiên", category: "Rau - Nấm - Viên - Mì", price: 25000, status: 'Còn hàng' },
        { id: 26, name: "Váng đậu", category: "Rau - Nấm - Viên - Mì", price: 30000, status: 'Còn hàng' },
        { id: 27, name: "Mì tôm", category: "Rau - Nấm - Viên - Mì", price: 10000, status: 'Còn hàng' },
        { id: 28, name: "Bún tươi", category: "Rau - Nấm - Viên - Mì", price: 15000, status: 'Còn hàng' },
        { id: 29, name: "Chè khúc bạch", category: "Tráng miệng", price: 25000, status: 'Còn hàng' },
        { id: 30, name: "Sữa chua nếp cẩm", category: "Tráng miệng", price: 25000, status: 'Còn hàng' },
        { id: 31, name: "Hoa quả theo mùa", category: "Tráng miệng", price: 45000, status: 'Còn hàng' },
        { id: 32, name: "Pepsi - lon 320ml", category: "Đồ uống", price: 15000, status: 'Còn hàng' },
        { id: 33, name: "7Up - lon 320ml", category: "Đồ uống", price: 15000, status: 'Còn hàng' },
        { id: 34, name: "Nước suối - chai 500ml", category: "Đồ uống", price: 10000, status: 'Còn hàng' },
        { id: 35, name: "Trà đào cam sả", category: "Đồ uống", price: 35000, status: 'Còn hàng' },
        { id: 36, name: "Nước ép cam", category: "Đồ uống", price: 35000, status: 'Còn hàng' },
        { id: 37, name: "Bia Hà Nội - lon 330ml", category: "Đồ uống", price: 20000, status: 'Còn hàng' },
        { id: 38, name: "Bia Tiger - lon 330ml", category: "Đồ uống", price: 25000, status: 'Còn hàng' }
    ];
    (function seedDishes() {
        let list = null;
        try {
            const parsed = JSON.parse(localStorage.getItem('dishesList'));
            if (Array.isArray(parsed)) list = parsed;
        } catch (e) {}
        const isLegacy = list && list.length === legacySeedNames.length &&
            list.every((d, i) => d && d.name === legacySeedNames[i]);
        if (!list || isLegacy) {
            list = initialDishes.slice();
            localStorage.setItem('dishesList', JSON.stringify(list));
        }
        if (localStorage.getItem('menuSeedVersion') !== '2') {
            const names = new Set(list.map(d => String(d && d.name).trim().toLowerCase()));
            EXTRA_DISHES.forEach(d => {
                if (!names.has(d.name.trim().toLowerCase())) list.push(d);
            });
            try {
                localStorage.setItem('dishesList', JSON.stringify(list));
                localStorage.setItem('menuSeedVersion', '2');
            } catch (e) {}
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

    let pendingDishImg = null;
    let clearDishImg = false;

    function resizeImage(file, maxSize, cb) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const ratio = Math.min(1, maxSize / Math.max(img.width, img.height));
                const w = Math.round(img.width * ratio);
                const h = Math.round(img.height * ratio);
                const canvas = document.createElement('canvas');
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#fff';
                ctx.fillRect(0, 0, w, h);
                ctx.drawImage(img, 0, 0, w, h);
                cb(canvas.toDataURL('image/jpeg', 0.8));
            };
            img.onerror = function () { alert('Không đọc được file ảnh này!'); };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function showDishPreview(src) {
        const box = document.getElementById('dishImagePreview');
        const img = document.getElementById('dishImagePreviewImg');
        if (!box || !img) return;
        if (src) {
            img.src = src;
            box.style.display = 'block';
        } else {
            img.removeAttribute('src');
            box.style.display = 'none';
        }
    }

    document.getElementById('dishImage')?.addEventListener('change', function () {
        const file = this.files && this.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('Vui lòng chọn file ảnh!');
            this.value = '';
            return;
        }
        resizeImage(file, 600, function (dataUrl) {
            pendingDishImg = dataUrl;
            clearDishImg = false;
            showDishPreview(dataUrl);
        });
    });

    document.getElementById('btnClearImage')?.addEventListener('click', function () {
        pendingDishImg = null;
        clearDishImg = true;
        const fileInput = document.getElementById('dishImage');
        if (fileInput) fileInput.value = '';
        showDishPreview('');
    });

    function parseDishOptions(text) {
        const result = [];
        const lines = String(text || '').split('\n').map(l => l.trim()).filter(Boolean);
        for (const line of lines) {
            const idx = line.lastIndexOf('|');
            if (idx < 1) return { error: 'Mỗi dòng size phải có dạng: Tên | Giá (ví dụ: Size M | 80000)' };
            const name = line.slice(0, idx).trim();
            const price = Number(line.slice(idx + 1).replace(/[.,\s₫đ]/g, ''));
            if (!name || isNaN(price) || price <= 0) return { error: 'Size "' + line + '" không hợp lệ (tên không được trống, giá phải lớn hơn 0).' };
            result.push({ name: name, price: price });
        }
        return { options: result };
    }

    const addDishForm = document.getElementById('addDishForm');
    if (addDishForm) {
        addDishForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const editId = document.getElementById('editDishId').value;
            const dishName = document.getElementById('dishName')?.value.trim();
            const dishCategory = document.getElementById('dishCategory')?.value;
            let dishPrice = Number(document.getElementById('dishPrice')?.value);
            const dishStatus = document.getElementById('dishStatus')?.value || 'Còn hàng';
            const dishDesc = document.getElementById('dishDesc')?.value.trim() || '';

            const parsed = parseDishOptions(document.getElementById('dishOptions')?.value);
            if (parsed.error) { alert(parsed.error); return; }
            const options = parsed.options;
            if (options.length > 0) dishPrice = options[0].price;

            if (!dishName || isNaN(dishPrice) || dishPrice <= 0) {
                alert('Vui lòng nhập tên món ăn và giá bán phải lớn hơn 0!');
                return;
            }

            let dishes = JSON.parse(localStorage.getItem('dishesList')) || [];

            const isDuplicateName = dishes.some(d => d.name.toLowerCase() === dishName.toLowerCase() && String(d.id) !== String(editId));
            if (isDuplicateName) {
                alert('Tên món ăn này đã tồn tại trong menu!');
                return;
            }

            const old = editId ? dishes.find(d => d.id === Number(editId)) : null;
            const img = clearDishImg ? '' : (pendingDishImg || (old && old.img) || '');

            const record = Object.assign({}, old || {}, {
                id: editId ? Number(editId) : Date.now(),
                name: dishName,
                category: dishCategory,
                price: dishPrice,
                status: dishStatus,
                desc: dishDesc,
                img: img,
                options: options
            });

            let message;
            if (editId) {
                const index = dishes.findIndex(d => d.id === Number(editId));
                if (index !== -1) dishes[index] = record;
                message = 'Cập nhật món ăn thành công!';
            } else {
                dishes.push(record);
                message = 'Thêm món ăn mới thành công!';
            }

            try {
                localStorage.setItem('dishesList', JSON.stringify(dishes));
            } catch (err) {
                alert('Dung lượng lưu trữ đã đầy, không thể lưu (hãy dùng ảnh nhỏ hơn hoặc xóa bớt ảnh cũ)!');
                return;
            }

            alert(message);
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
            document.getElementById('dishDesc').value = dish.desc || '';
            document.getElementById('dishOptions').value = (dish.options || []).map(o => o.name + ' | ' + o.price).join('\n');

            pendingDishImg = null;
            clearDishImg = false;
            document.getElementById('dishImage').value = '';
            showDishPreview(dish.img || '');

            document.getElementById('formDishTitle').innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Cập Nhật Món Ăn';
            document.getElementById('btnDishSubmit').innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Lưu Cập Nhật';
            document.getElementById('btnCancelEdit').style.display = 'block';
        }
    }

    document.getElementById('btnCancelEdit')?.addEventListener('click', resetDishForm);

    function resetDishForm() {
        document.getElementById('addDishForm').reset();
        document.getElementById('editDishId').value = '';
        pendingDishImg = null;
        clearDishImg = false;
        showDishPreview('');
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

    // QUẢN LÝ BÀN (DỮ LIỆU)
    const DEFAULT_TABLES = (function () {
        const list = [];
        for (let i = 1; i <= 6; i++) list.push({ id: 'B' + i, name: 'Bàn ' + i, area: 'Tầng 1', capacity: 4, status: 'Trống' });
        for (let i = 7; i <= 8; i++) list.push({ id: 'B' + i, name: 'Bàn ' + i, area: 'Tầng 1', capacity: 6, status: 'Trống' });
        for (let i = 9; i <= 12; i++) list.push({ id: 'B' + i, name: 'Bàn ' + i, area: 'Tầng 2', capacity: 4, status: 'Trống' });
        list.push({ id: 'V1', name: 'Phòng VIP 1', area: 'Phòng VIP', capacity: 10, status: 'Trống' });
        list.push({ id: 'V2', name: 'Phòng VIP 2', area: 'Phòng VIP', capacity: 10, status: 'Trống' });
        return list;
    })();

    function readTables() {
        try {
            const list = JSON.parse(localStorage.getItem('tablesList'));
            return Array.isArray(list) ? list : [];
        } catch (e) { return []; }
    }

    function saveTables(list) {
        localStorage.setItem('tablesList', JSON.stringify(list));
    }

    if (localStorage.getItem('tablesList') === null) {
        saveTables(DEFAULT_TABLES);
    }

    function readBookings() {
        try {
            const list = JSON.parse(localStorage.getItem('bookings'));
            return Array.isArray(list) ? list : [];
        } catch (e) { return []; }
    }

    function releaseTable(tables, tableName) {
        if (!tableName) return;
        const t = tables.find(x => x.name === tableName);
        if (t && t.status === 'Đã đặt') t.status = 'Trống';
    }

    function renderTableList() {
        const tbody = document.getElementById('bookingTableBody');
        if (!tbody) return;

        const bookings = readBookings();
        const tables = readTables();
        tbody.innerHTML = '';

        if (bookings.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;">Chưa có đơn đặt bàn nào.</td></tr>';
            return;
        }

        bookings.forEach((item, index) => {
            const tr = document.createElement('tr');
            const status = item.status || 'Chờ xác nhận';
            let badgeStyle = 'background:#fff3cd; color:#856404;';
            if (status === 'Đã xác nhận') badgeStyle = 'background:#d4edda; color:#155724;';
            if (status === 'Đã hủy') badgeStyle = 'background:#f8d7da; color:#721c24;';

            const extra = [
                item.email ? 'Email: ' + escapeHTML(item.email) : '',
                item.area ? 'Khu vực: ' + escapeHTML(item.area) : '',
                item.note ? 'Ghi chú: ' + escapeHTML(item.note) : ''
            ].filter(Boolean).join('<br>') || '-';

            let tableCell = '-';
            if (status !== 'Đã hủy') {
                const opts = tables
                    .filter(t => t.status === 'Trống' || t.name === item.table)
                    .map(t => `<option value="${escapeHTML(t.name)}" ${t.name === item.table ? 'selected' : ''}>${escapeHTML(t.name)} (${Number(t.capacity)} chỗ)</option>`)
                    .join('');
                tableCell = `<select class="select-assign-table" data-id="${escapeHTML(item.id)}" style="padding:4px; border:1px solid #ddd; border-radius:4px;">
                    <option value="">-- Chưa gán --</option>${opts}</select>`;
            } else if (item.table) {
                tableCell = escapeHTML(item.table);
            }

            let actions = '';
            if (status === 'Chờ xác nhận') {
                actions += `<button class="btn-confirm-booking" data-id="${escapeHTML(item.id)}" style="background:#28a745; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Xác nhận</button> `;
            }
            if (status !== 'Đã hủy') {
                actions += `<button class="btn-cancel-booking" data-id="${escapeHTML(item.id)}" style="background:#ff9800; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Hủy</button> `;
            }
            actions += `<button class="btn-delete-booking" data-id="${escapeHTML(item.id)}" style="background:#dc3545; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Xóa</button>`;

            tr.innerHTML = `
                <td>#${index + 1}</td>
                <td><strong>${escapeHTML(item.name)}</strong></td>
                <td>${escapeHTML(item.phone)}</td>
                <td>${escapeHTML(item.datetime)}</td>
                <td>${escapeHTML(item.guests)}</td>
                <td style="font-size:13px;">${extra}</td>
                <td>${tableCell}</td>
                <td><span class="badge" style="${badgeStyle} padding:4px 8px; border-radius:4px;">${escapeHTML(status)}</span></td>
                <td>${actions}</td>
            `;
            tbody.appendChild(tr);
        });

        tbody.querySelectorAll('.btn-confirm-booking').forEach(btn => {
            btn.addEventListener('click', function() { updateBookingStatus(this.getAttribute('data-id'), 'Đã xác nhận'); });
        });
        tbody.querySelectorAll('.btn-cancel-booking').forEach(btn => {
            btn.addEventListener('click', function() {
                if (confirm('Bạn có chắc muốn hủy đơn đặt bàn này?')) updateBookingStatus(this.getAttribute('data-id'), 'Đã hủy');
            });
        });
        tbody.querySelectorAll('.btn-delete-booking').forEach(btn => {
            btn.addEventListener('click', function() { deleteBooking(this.getAttribute('data-id')); });
        });
        tbody.querySelectorAll('.select-assign-table').forEach(sel => {
            sel.addEventListener('change', function() { assignTable(this.getAttribute('data-id'), this.value); });
        });
    }

    function assignTable(bookingId, tableName) {
        const bookings = readBookings();
        const tables = readTables();
        const b = bookings.find(x => x.id === bookingId);
        if (!b) return;

        let target = null;
        if (tableName) {
            target = tables.find(t => t.name === tableName);
            const guestsNum = parseInt(b.guests, 10) || 0;
            if (target && guestsNum > Number(target.capacity)) {
                alert(`${target.name} chỉ có ${target.capacity} chỗ, không đủ cho ${guestsNum} khách!`);
                renderTableList();
                return;
            }
        }

        releaseTable(tables, b.table);
        b.table = tableName || '';
        if (target && target.status === 'Trống') target.status = 'Đã đặt';

        localStorage.setItem('bookings', JSON.stringify(bookings));
        saveTables(tables);
        renderTableList();
        renderFloorList();
    }

    function updateBookingStatus(id, newStatus) {
        const bookings = readBookings();
        const item = bookings.find(b => b.id === id);
        if (item) {
            item.status = newStatus;
            if (newStatus === 'Đã hủy' && item.table) {
                const tables = readTables();
                releaseTable(tables, item.table);
                saveTables(tables);
                item.table = '';
            }
            localStorage.setItem('bookings', JSON.stringify(bookings));
            renderTableList();
            renderFloorList();
            updateDashboardStats();
        }
    }

    function deleteBooking(id) {
        if (confirm('Bạn có chắc muốn xóa đơn đặt bàn này?')) {
            let bookings = readBookings();
            const item = bookings.find(b => b.id === id);
            if (item && item.table) {
                const tables = readTables();
                releaseTable(tables, item.table);
                saveTables(tables);
            }
            bookings = bookings.filter(b => b.id !== id);
            localStorage.setItem('bookings', JSON.stringify(bookings));
            renderTableList();
            renderFloorList();
            updateDashboardStats();
        }
    }

    // QUẢN LÝ BÀN (GIAO DIỆN)
    function floorBadgeStyle(status) {
        if (status === 'Đã đặt') return 'background:#fff3cd; color:#856404;';
        if (status === 'Đang dùng') return 'background:#f8d7da; color:#721c24;';
        return 'background:#d4edda; color:#155724;';
    }

    function renderFloorList() {
        const tbody = document.getElementById('floorTableBody');
        if (!tbody) return;

        const tables = readTables();
        tbody.innerHTML = '';

        const summary = document.getElementById('floorSummary');
        if (summary) {
            const c = s => tables.filter(t => t.status === s).length;
            summary.textContent = `Tổng ${tables.length} bàn — Trống: ${c('Trống')} | Đã đặt: ${c('Đã đặt')} | Đang dùng: ${c('Đang dùng')}`;
        }

        if (tables.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Chưa có bàn nào.</td></tr>';
            return;
        }

        tables.forEach(t => {
            const tr = document.createElement('tr');
            let quick = '';
            if (t.status !== 'Đang dùng') {
                quick += `<button class="btn-floor-status" data-id="${escapeHTML(t.id)}" data-status="Đang dùng" style="background:#17a2b8; color:#fff; border:none; padding:5px 8px; border-radius:4px; cursor:pointer;">Có khách</button> `;
            }
            if (t.status !== 'Trống') {
                quick += `<button class="btn-floor-status" data-id="${escapeHTML(t.id)}" data-status="Trống" style="background:#28a745; color:#fff; border:none; padding:5px 8px; border-radius:4px; cursor:pointer;">Trả bàn</button> `;
            }
            tr.innerHTML = `
                <td><strong>${escapeHTML(t.name)}</strong></td>
                <td>${escapeHTML(t.area)}</td>
                <td>${Number(t.capacity)} chỗ</td>
                <td><span class="badge" style="${floorBadgeStyle(t.status)} padding:4px 8px; border-radius:4px;">${escapeHTML(t.status)}</span></td>
                <td>
                    ${quick}
                    <button class="btn-edit btn-floor-edit" data-id="${escapeHTML(t.id)}"><i class="fa-solid fa-pen-to-square"></i> Sửa</button>
                    <button class="btn-delete btn-floor-delete" data-id="${escapeHTML(t.id)}"><i class="fa-solid fa-trash"></i> Xóa</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        tbody.querySelectorAll('.btn-floor-status').forEach(btn => {
            btn.addEventListener('click', function() {
                const list = readTables();
                const t = list.find(x => x.id === this.getAttribute('data-id'));
                if (t) {
                    t.status = this.getAttribute('data-status');
                    saveTables(list);
                    renderFloorList();
                    renderTableList();
                }
            });
        });
        tbody.querySelectorAll('.btn-floor-edit').forEach(btn => {
            btn.addEventListener('click', function() { editFloor(this.getAttribute('data-id')); });
        });
        tbody.querySelectorAll('.btn-floor-delete').forEach(btn => {
            btn.addEventListener('click', function() { deleteFloor(this.getAttribute('data-id')); });
        });
    }

    function editFloor(id) {
        const t = readTables().find(x => x.id === id);
        if (!t) return;
        document.getElementById('editFloorId').value = t.id;
        document.getElementById('floorName').value = t.name;
        const areaSelect = document.getElementById('floorArea');
        if (!Array.from(areaSelect.options).some(o => o.value === t.area)) areaSelect.add(new Option(t.area, t.area));
        areaSelect.value = t.area;
        document.getElementById('floorCapacity').value = t.capacity;
        document.getElementById('floorStatus').value = t.status;
        document.getElementById('formFloorTitle').innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Cập Nhật Bàn';
        document.getElementById('btnFloorSubmit').innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Lưu Cập Nhật';
        document.getElementById('btnCancelFloorEdit').style.display = 'block';
    }

    function resetFloorForm() {
        document.getElementById('floorForm').reset();
        document.getElementById('editFloorId').value = '';
        document.getElementById('floorCapacity').value = 4;
        document.getElementById('formFloorTitle').innerHTML = '<i class="fa-solid fa-plus-circle"></i> Thêm Bàn Mới';
        document.getElementById('btnFloorSubmit').innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Lưu Bàn';
        document.getElementById('btnCancelFloorEdit').style.display = 'none';
    }

    function deleteFloor(id) {
        const tables = readTables();
        const t = tables.find(x => x.id === id);
        if (!t) return;
        const warn = t.status !== 'Trống' ? ` (bàn đang ở trạng thái "${t.status}")` : '';
        if (!confirm(`Bạn có chắc muốn xóa ${t.name}${warn}?`)) return;
        saveTables(tables.filter(x => x.id !== id));
        const bookings = readBookings();
        let changed = false;
        bookings.forEach(b => { if (b.table === t.name) { b.table = ''; changed = true; } });
        if (changed) localStorage.setItem('bookings', JSON.stringify(bookings));
        renderFloorList();
        renderTableList();
    }

    document.getElementById('btnCancelFloorEdit')?.addEventListener('click', resetFloorForm);

    document.getElementById('floorForm')?.addEventListener('submit', function (e) {
        e.preventDefault();
        const editId = document.getElementById('editFloorId').value;
        const name = document.getElementById('floorName').value.trim();
        const area = document.getElementById('floorArea').value;
        const capacity = parseInt(document.getElementById('floorCapacity').value, 10);
        const status = document.getElementById('floorStatus').value;

        if (!name) { alert('Vui lòng nhập tên bàn!'); return; }
        if (isNaN(capacity) || capacity < 1 || capacity > 50) { alert('Sức chứa phải từ 1 đến 50 người!'); return; }

        const tables = readTables();
        if (tables.some(t => t.name.toLowerCase() === name.toLowerCase() && t.id !== editId)) {
            alert('Tên bàn này đã tồn tại!');
            return;
        }

        if (editId) {
            const t = tables.find(x => x.id === editId);
            if (t) {
                const oldName = t.name;
                t.name = name; t.area = area; t.capacity = capacity; t.status = status;
                if (oldName !== name) {
                    const bookings = readBookings();
                    bookings.forEach(b => { if (b.table === oldName) b.table = name; });
                    localStorage.setItem('bookings', JSON.stringify(bookings));
                }
            }
        } else {
            tables.push({ id: 'T' + Date.now(), name: name, area: area, capacity: capacity, status: status });
        }

        saveTables(tables);
        resetFloorForm();
        renderFloorList();
        renderTableList();
    });

    // QUẢN LÝ ĐƠN HÀNG
    const ORDER_FLOW = ['Mới', 'Đang chế biến', 'Hoàn thành', 'Đã thanh toán'];

    function readOrders() {
        try {
            const list = JSON.parse(localStorage.getItem('orders'));
            return Array.isArray(list) ? list : [];
        } catch (e) { return []; }
    }

    function formatVND(n) { return Number(n || 0).toLocaleString('vi-VN') + 'đ'; }

    function formatDateTime(iso) {
        const d = new Date(iso);
        if (isNaN(d.getTime())) return '';
        const p = n => String(n).padStart(2, '0');
        return `${p(d.getHours())}:${p(d.getMinutes())} - ${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
    }

    function orderBadgeStyle(status) {
        switch (status) {
            case 'Mới': return 'background:#cce5ff; color:#004085;';
            case 'Đang chế biến': return 'background:#fff3cd; color:#856404;';
            case 'Hoàn thành': return 'background:#e2d9f3; color:#4a2d7a;';
            case 'Đã thanh toán': return 'background:#d4edda; color:#155724;';
            case 'Đã hủy': return 'background:#f8d7da; color:#721c24;';
            default: return 'background:#eee; color:#333;';
        }
    }

    function renderOrderList() {
        const tbody = document.getElementById('orderTableBody');
        if (!tbody) return;

        const orders = readOrders().slice().reverse();
        tbody.innerHTML = '';

        if (orders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">Chưa có đơn hàng nào.</td></tr>';
            return;
        }

        orders.forEach(o => {
            const tr = document.createElement('tr');
            const itemsHtml = (o.items || []).map(i =>
                `${escapeHTML(i.name)} ${escapeHTML(i.optName || '')} x${Number(i.qty)}`
            ).join('<br>');
            const place = (o.type === 'Tại quán' ? 'Bàn: ' : 'Địa chỉ: ') + escapeHTML(o.place);
            const note = o.note ? `<br><em style="color:#888;">Ghi chú: ${escapeHTML(o.note)}</em>` : '';

            const idx = ORDER_FLOW.indexOf(o.status);
            let actions = '';
            if (idx > -1 && idx < ORDER_FLOW.length - 1) {
                actions += `<button class="btn-order-next" data-id="${escapeHTML(o.id)}" data-next="${ORDER_FLOW[idx + 1]}" style="background:#28a745; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">${ORDER_FLOW[idx + 1]}</button> `;
            }
            if (o.status !== 'Đã thanh toán' && o.status !== 'Đã hủy') {
                actions += `<button class="btn-order-cancel" data-id="${escapeHTML(o.id)}" style="background:#ff9800; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Hủy</button> `;
            }
            actions += `<button class="btn-order-delete" data-id="${escapeHTML(o.id)}" style="background:#dc3545; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Xóa</button>`;

            tr.innerHTML = `
                <td><strong>${escapeHTML(o.id)}</strong></td>
                <td>${escapeHTML(o.name)}<br>${escapeHTML(o.phone)}</td>
                <td>${escapeHTML(o.type)}<br>${place}${note}</td>
                <td style="font-size:13px;">${itemsHtml}</td>
                <td><strong>${formatVND(o.total)}</strong></td>
                <td>${escapeHTML(formatDateTime(o.createdAt))}</td>
                <td><span class="badge" style="${orderBadgeStyle(o.status)} padding:4px 8px; border-radius:4px;">${escapeHTML(o.status)}</span></td>
                <td>${actions}</td>
            `;
            tbody.appendChild(tr);
        });

        tbody.querySelectorAll('.btn-order-next').forEach(btn => {
            btn.addEventListener('click', function() { setOrderStatus(this.getAttribute('data-id'), this.getAttribute('data-next')); });
        });
        tbody.querySelectorAll('.btn-order-cancel').forEach(btn => {
            btn.addEventListener('click', function() {
                if (confirm('Bạn có chắc muốn hủy đơn hàng này?')) setOrderStatus(this.getAttribute('data-id'), 'Đã hủy');
            });
        });
        tbody.querySelectorAll('.btn-order-delete').forEach(btn => {
            btn.addEventListener('click', function() { deleteOrder(this.getAttribute('data-id')); });
        });
    }

    function setOrderStatus(id, status) {
        const orders = readOrders();
        const o = orders.find(x => x.id === id);
        if (o) {
            o.status = status;
            if (status === 'Đã thanh toán') o.paidAt = new Date().toISOString();
            localStorage.setItem('orders', JSON.stringify(orders));
            renderOrderList();
            renderReport();
            updateDashboardStats();
        }
    }

    function deleteOrder(id) {
        if (confirm('Bạn có chắc muốn xóa đơn hàng này?')) {
            const orders = readOrders().filter(x => x.id !== id);
            localStorage.setItem('orders', JSON.stringify(orders));
            renderOrderList();
            updateDashboardStats();
        }
    }

    // TIN NHẮN LIÊN HỆ
    function readContacts() {
        try {
            const list = JSON.parse(localStorage.getItem('contacts'));
            return Array.isArray(list) ? list : [];
        } catch (e) { return []; }
    }

    function renderContactList() {
        const tbody = document.getElementById('contactTableBody');
        if (!tbody) return;

        const contacts = readContacts().slice().reverse();
        tbody.innerHTML = '';

        if (contacts.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">Chưa có tin nhắn nào.</td></tr>';
            return;
        }

        contacts.forEach(c => {
            const tr = document.createElement('tr');
            const read = c.status === 'Đã đọc';
            const badgeStyle = read ? 'background:#d4edda; color:#155724;' : 'background:#fff3cd; color:#856404;';
            tr.innerHTML = `
                <td><strong>${escapeHTML(c.id)}</strong></td>
                <td>${escapeHTML(c.name)}</td>
                <td style="font-size:13px;">${escapeHTML(c.email)}<br>${escapeHTML(c.phone)}</td>
                <td>${escapeHTML(c.subject)}</td>
                <td style="max-width:260px; white-space:pre-wrap; word-break:break-word;">${escapeHTML(c.message)}</td>
                <td>${escapeHTML(formatDateTime(c.createdAt))}</td>
                <td><span class="badge" style="${badgeStyle} padding:4px 8px; border-radius:4px;">${escapeHTML(c.status || 'Chưa đọc')}</span></td>
                <td>
                    ${read ? '' : `<button class="btn-contact-read" data-id="${escapeHTML(c.id)}" style="background:#28a745; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Đã đọc</button> `}
                    <button class="btn-contact-delete" data-id="${escapeHTML(c.id)}" style="background:#dc3545; color:#fff; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Xóa</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        tbody.querySelectorAll('.btn-contact-read').forEach(btn => {
            btn.addEventListener('click', function() {
                const list = readContacts();
                const c = list.find(x => x.id === this.getAttribute('data-id'));
                if (c) {
                    c.status = 'Đã đọc';
                    localStorage.setItem('contacts', JSON.stringify(list));
                    renderContactList();
                    updateDashboardStats();
                }
            });
        });
        tbody.querySelectorAll('.btn-contact-delete').forEach(btn => {
            btn.addEventListener('click', function() {
                if (confirm('Bạn có chắc muốn xóa tin nhắn này?')) {
                    const list = readContacts().filter(x => x.id !== this.getAttribute('data-id'));
                    localStorage.setItem('contacts', JSON.stringify(list));
                    renderContactList();
                    updateDashboardStats();
                }
            });
        });
    }

    // BÁO CÁO DOANH THU
    function getReportFrom(mode) {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if (mode === 'today') return startOfToday;
        if (mode === '7days') return new Date(startOfToday.getTime() - 6 * 24 * 60 * 60 * 1000);
        if (mode === 'month') return new Date(now.getFullYear(), now.getMonth(), 1);
        return null;
    }

    function dayKey(d) {
        const p = n => String(n).padStart(2, '0');
        return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
    }

    function renderReport() {
        const rangeEl = document.getElementById('reportRange');
        if (!rangeEl) return;
        const from = getReportFrom(rangeEl.value);
        const inRange = iso => {
            const d = new Date(iso);
            if (isNaN(d.getTime())) return false;
            return !from || d >= from;
        };

        const orders = readOrders();
        const paid = orders.filter(o => o.status === 'Đã thanh toán' && inRange(o.paidAt || o.createdAt));
        const cancelled = orders.filter(o => o.status === 'Đã hủy' && inRange(o.createdAt));

        const revenue = paid.reduce((sum, o) => sum + Number(o.total || 0), 0);
        document.getElementById('reportRevenue').textContent = formatVND(revenue);
        document.getElementById('reportOrders').textContent = paid.length;
        document.getElementById('reportAvg').textContent = formatVND(paid.length ? Math.round(revenue / paid.length) : 0);
        document.getElementById('reportCancelled').textContent = cancelled.length;

        // Theo ngày
        const byDay = {};
        paid.forEach(o => {
            const d = new Date(o.paidAt || o.createdAt);
            const key = dayKey(d);
            if (!byDay[key]) byDay[key] = { date: d, rev: 0, count: 0 };
            byDay[key].rev += Number(o.total || 0);
            byDay[key].count += 1;
        });
        const days = Object.keys(byDay).sort().slice(-31).map(k => byDay[k]);
        const maxRev = days.reduce((m, x) => Math.max(m, x.rev), 0);

        const dayBody = document.getElementById('reportDayBody');
        dayBody.innerHTML = '';
        if (days.length === 0) {
            dayBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Chưa có doanh thu trong khoảng thời gian này.</td></tr>';
        } else {
            days.forEach(x => {
                const p = n => String(n).padStart(2, '0');
                const label = `${p(x.date.getDate())}/${p(x.date.getMonth() + 1)}/${x.date.getFullYear()}`;
                const width = maxRev ? Math.max(2, Math.round(x.rev / maxRev * 100)) : 0;
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${label}</td>
                    <td>${x.count}</td>
                    <td><strong>${formatVND(x.rev)}</strong></td>
                    <td><div class="report-bar-wrap"><div class="report-bar" style="width:${width}%;"></div></div></td>
                `;
                dayBody.appendChild(tr);
            });
        }

        // Món bán chạy
        const byDish = {};
        paid.forEach(o => {
            (o.items || []).forEach(i => {
                const key = String(i.name);
                if (!byDish[key]) byDish[key] = { name: key, qty: 0, rev: 0 };
                byDish[key].qty += Number(i.qty || 0);
                byDish[key].rev += Number(i.price || 0) * Number(i.qty || 0);
            });
        });
        const top = Object.values(byDish).sort((a, b) => b.qty - a.qty || b.rev - a.rev).slice(0, 10);

        const topBody = document.getElementById('reportTopBody');
        topBody.innerHTML = '';
        if (top.length === 0) {
            topBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Chưa có dữ liệu bán hàng.</td></tr>';
        } else {
            top.forEach((x, idx) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>#${idx + 1}</td>
                    <td><strong>${escapeHTML(x.name)}</strong></td>
                    <td>${x.qty}</td>
                    <td>${formatVND(x.rev)}</td>
                `;
                topBody.appendChild(tr);
            });
        }
    }

    document.getElementById('reportRange')?.addEventListener('change', renderReport);

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
                <td><span class="badge badge-success" style="background:#d4edda; color:#155724; padding:3px 8px; border-radius:4px;">${escapeHTML(user.role || 'user')}</span></td>
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
        if (currentUser && (currentUser.email || '').toLowerCase() === email.toLowerCase()) {
            alert('Bạn không thể tự xóa tài khoản Quản trị đang đăng nhập!');
            return;
        }

        if (confirm(`Bạn có chắc chắn muốn xóa tài khoản: ${email}?`)) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users = users.filter(u => (u.email || '').toLowerCase() !== email.toLowerCase());
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
        const t = new Date();
        const todayStr = String(t.getDate()).padStart(2, '0') + '/' + String(t.getMonth() + 1).padStart(2, '0') + '/' + t.getFullYear();
        const todayCount = bookings.filter(b => b && b.status !== 'Đã hủy' && String(b.datetime || '').includes(todayStr)).length;
        if (bookingsCountEl) bookingsCountEl.textContent = todayCount;
        const orders = readOrders();
        const contacts = readContacts();
        const isToday = iso => {
            const d = new Date(iso);
            return !isNaN(d.getTime()) && d.getDate() === t.getDate() && d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear();
        };
        const revenue = orders
            .filter(o => o.status === 'Đã thanh toán' && isToday(o.paidAt || o.createdAt))
            .reduce((sum, o) => sum + Number(o.total || 0), 0);
        const revenueEl = document.getElementById('statRevenue');
        if (revenueEl) revenueEl.textContent = formatVND(revenue);

        const unreadContacts = contacts.filter(c => c.status !== 'Đã đọc').length;
        const newOrders = orders.filter(o => o.status === 'Mới').length;
        if (activityTextEl) {
            activityTextEl.textContent = `Hệ thống hiện ghi nhận ${bookings.length} lượt đặt bàn, ${orders.length} đơn hàng (${newOrders} đơn mới), ${dishes.length} món ăn trong thực đơn, ${users.length} tài khoản thành viên và ${unreadContacts} tin nhắn liên hệ chưa đọc.`;
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
                window.location.href = 'login.html';
            }
        });
    }

    // Khởi tạo mặc định
    renderDishList();
    renderUserList();
    renderTableList();
    renderOrderList();
    renderContactList();
    renderFloorList();
    renderReport();
    updateDashboardStats();
});
