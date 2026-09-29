// 1. Chuyển đổi giữa các Section trong Sidebar
function showSection(sectionId, element) {
    // Ẩn tất cả section
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.classList.remove('active'));

    // Bỏ active ở tất cả menu
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => item.classList.remove('active'));

    // Hiển thị section chọn
    document.getElementById(sectionId).classList.add('active');
    element.classList.add('active');

    // Cập nhật tiêu đề trang
    const titleMap = {
        'dashboard': 'Tổng Quan Hệ Thống',
        'menu-mgmt': 'Quản Lý Món Ăn',
        'order-mgmt': 'Quản Lý Đặt Bàn',
        'user-mgmt': 'Quản Lý Tài Khoản'
    };
    document.getElementById('pageTitle').innerText = titleMap[sectionId];
}

// 2. Mở / Đóng Modal Thêm món
function openAddModal() {
    document.getElementById('addFoodModal').style.display = 'flex';
}

function closeAddModal() {
    document.getElementById('addFoodModal').style.display = 'none';
}

// 3. Xử lý Thêm món mới vào Bảng bằng JS DOM
document.getElementById('addFoodForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('foodName').value.trim();
    const category = document.getElementById('foodCategory').value;
    const price = document.getElementById('foodPrice').value.trim();

    const tableBody = document.getElementById('foodTableBody');
    const newIndex = tableBody.children.length + 1;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${newIndex}</td>
        <td>${name}</td>
        <td>${category}</td>
        <td>${price} VNĐ</td>
        <td><span class="badge success">Đang bán</span></td>
        <td>
            <button class="btn-action edit" onclick="editFood(this)"><i class="fa-solid fa-pen"></i></button>
            <button class="btn-action delete" onclick="deleteFood(this)"><i class="fa-solid fa-trash"></i></button>
        </td>
    `;

    tableBody.appendChild(newRow);

    // Reset Form & Đóng Modal
    document.getElementById('addFoodForm').reset();
    closeAddModal();
    alert('Thêm món mới thành công!');
});

// 4. Xóa món ăn
function deleteFood(button) {
    if (confirm('Bạn có chắc chắn muốn xóa món này?')) {
        const row = button.closest('tr');
        row.remove();
    }
}

// 5. Giả lập Sửa món ăn
function editFood(button) {
    alert('Chức năng sửa thông tin món ăn!');
}