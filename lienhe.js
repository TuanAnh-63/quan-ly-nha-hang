// ============================================
// CẤU HÌNH
// ============================================
// Điền đường dẫn backend vào đây, ví dụ: "/api/lien-he"
// Để trống "" => chạy chế độ demo (giả lập gửi thành công sau 1,2 giây)
const API_URL = "";
const REQUEST_TIMEOUT = 10000; // 10 giây

// ============================================
// LẤY PHẦN TỬ
// ============================================
const form = document.getElementById("contact-form");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const charCount = document.getElementById("char-count");
const statusBox = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");
const btnText = submitBtn.querySelector(".btn-text");
const honeypot = document.getElementById("website");

const BTN_DEFAULT_TEXT = btnText.textContent;

// ============================================
// 1. LỌC KÝ TỰ Ô SỐ ĐIỆN THOẠI (chỉ cho nhập số, tối đa 10)
// ============================================
phoneInput.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
});

// ============================================
// 2. ĐẾM KÝ TỰ Ô NỘI DUNG
// ============================================
function updateCharCount() {
    const max = messageInput.maxLength;
    charCount.textContent = `${messageInput.value.length}/${max}`;
}
messageInput.addEventListener("input", updateCharCount);
updateCharCount();

// ============================================
// HÀM HIỂN THỊ THÔNG BÁO
// ============================================
function showStatus(type, message) {
    statusBox.className = `form-status ${type}`;
    statusBox.textContent = message;
    statusBox.hidden = false;
}

function hideStatus() {
    statusBox.hidden = true;
    statusBox.textContent = "";
}

// ============================================
// 3. TRẠNG THÁI ĐANG GỬI (khóa nút + spinner)
// ============================================
function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    submitBtn.classList.toggle("loading", isLoading);
    btnText.textContent = isLoading ? "Đang gửi..." : BTN_DEFAULT_TEXT;
    form.setAttribute("aria-busy", String(isLoading));
}

// ============================================
// 4. GỬI DỮ LIỆU
// ============================================
async function sendData(data) {
    // Chế độ demo khi chưa có backend
    if (!API_URL) {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        return;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
    } finally {
        clearTimeout(timer);
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideStatus();

    // Chống gửi trùng khi đang xử lý
    if (submitBtn.disabled) return;

    // Cắt khoảng trắng thừa rồi kiểm tra hợp lệ
    ["name", "email", "message"].forEach((id) => {
        const el = document.getElementById(id);
        el.value = el.value.trim();
    });

    if (!form.checkValidity()) {
        // Hiện thông báo lỗi tùy chỉnh (.invalid-feedback) và focus vào ô lỗi đầu tiên
        form.classList.add("was-validated");
        form.querySelector(":invalid")?.focus();
        return;
    }

    // Chống bot: ô honeypot bị điền => giả vờ thành công, không gửi đi
    if (honeypot.value !== "") {
        form.reset();
        form.classList.remove("was-validated");
        updateCharCount();
        showStatus("success", "Cảm ơn bạn! Chúng tôi đã nhận được tin nhắn.");
        return;
    }

    const data = Object.fromEntries(new FormData(form));
    delete data.website; // bỏ trường honeypot

    setLoading(true);

    try {
        await sendData(data);
        form.reset();
        form.classList.remove("was-validated");
        updateCharCount();
        showStatus("success", "Cảm ơn bạn! Chúng tôi đã nhận được tin nhắn và sẽ phản hồi sớm nhất.");
    } catch (error) {
        const timedOut = error.name === "AbortError";
        showStatus(
            "error",
            timedOut
                ? "Quá thời gian chờ. Vui lòng thử lại sau."
                : "Gửi tin nhắn thất bại. Vui lòng thử lại hoặc gọi trực tiếp cho nhà hàng."
        );
    } finally {
        setLoading(false);
    }
});
