/* =====================================================================
   auth.js - Trạng thái đăng nhập ở header (dùng chung các trang)
   Cần js_login.js lưu khi đăng nhập thành công:
       localStorage.setItem('currentUser', JSON.stringify({ name: 'Tên', role: 'user' | 'admin' }));
   Lưu ý: đây là đăng nhập GIẢ LẬP phía trình duyệt cho bài tập. Hệ thống thật phải
   xác thực và phân quyền ở backend (session/JWT), không tin dữ liệu trong localStorage.
   ===================================================================== */
function getUser() {
  try { return JSON.parse(localStorage.getItem('currentUser')); } catch (e) { return null; }
}

function logout() {
  try { localStorage.removeItem('currentUser'); } catch (e) {}
  window.location.href = 'login.html';
}

(function () {
  var u = getUser();
  var guest = document.getElementById('guestBlock');
  var box = document.getElementById('userBlock');
  var nameEl = document.getElementById('userFullName');
  if (u && u.name && guest && box && nameEl) {
    guest.style.display = 'none';
    box.style.display = 'block';
    nameEl.textContent = u.name;   // textContent (không dùng innerHTML) để chống XSS
  }
})();
