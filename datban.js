// ============================================
// CẤU HÌNH
// ============================================
// Điền đường dẫn backend, ví dụ: "/api/dat-ban"
// Để trống "" => chạy chế độ demo (giả lập gửi thành công sau 1,2 giây)
const API_URL = "";
const REQUEST_TIMEOUT = 10000;   // 10 giây
const OPEN_TIME = "10:00";       // giờ mở cửa
const LAST_BOOKING_TIME = "21:00"; // giờ đặt muộn nhất
const MIN_LEAD_MINUTES = 30;     // đặt hôm nay phải cách hiện tại ít nhất 30 phút
const MAX_DAYS_AHEAD = 90;       // chỉ cho đặt trước tối đa 90 ngày
const DEFAULT_GUESTS = 2;

// ============================================
// LẤY PHẦN TỬ
// ============================================
const form = document.getElementById("booking-form");
const phoneInput = document.getElementById("phone");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const timeFeedback = document.getElementById("time-feedback");
const guestsInput = document.getElementById("guests");
const noteInput = document.getElementById("note");
const noteCount = document.getElementById("note-count");
const statusBox = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");
const btnText = submitBtn.querySelector(".btn-text");
const honeypot = document.getElementById("website");

const BTN_DEFAULT_TEXT = btnText.textContent;
const TIME_DEFAULT_MESSAGE = timeFeedback.textContent;

// ============================================
// TIỆN ÍCH NGÀY GIỜ
// ============================================
function pad(n) {
    return String(n).padStart(2, "0");
}

// Trả về chuỗi yyyy-mm-dd theo giờ địa phương
function toDateString(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function setDateLimits() {
    const today = new Date();
    const max = new Date();
    max.setDate(max.getDate() + MAX_DAYS_AHEAD);
    dateInput.min = toDateString(today);
    dateInput.max = toDateString(max);
}

// ============================================
// 1. LỌC KÝ TỰ Ô SỐ ĐIỆN THOẠI
// ============================================
phoneInput.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
});

// ============================================
// 2. SỐ NGƯỜI: chỉ nhận số nguyên từ 1 đến 20
// ============================================
guestsInput.addEventListener("input", () => {
    guestsInput.value = guestsInput.value.replace(/\D/g, "");
});

guestsInput.addEventListener("blur", () => {
    const min = Number(guestsInput.min);
    const max = Number(guestsInput.max);
    let value = parseInt(guestsInput.value, 10);

    if (Number.isNaN(value)) value = DEFAULT_GUESTS;
    guestsInput.value = Math.min(Math.max(value, min), max);
});

// ============================================
// 3. KIỂM TRA GIỜ ĐẶT
//    - Trong khung giờ mở cửa
//    - Nếu đặt hôm nay: phải sau giờ hiện tại một khoảng
// ============================================
function validateTime() {
    timeInput.setCustomValidity("");
    timeFeedback.textContent = TIME_DEFAULT_MESSAGE;

    if (!timeInput.value) return;

    if (timeInput.value < OPEN_TIME || timeInput.value > LAST_BOOKING_TIME) {
        const msg = `Giờ đặt từ ${OPEN_TIME} đến ${LAST_BOOKING_TIME}.`;
        timeInput.setCustomValidity(msg);
        timeFeedback.textContent = msg;
        return;
    }

    if (dateInput.value === toDateString(new Date())) {
        const now = new Date();
        now.setMinutes(now.getMinutes() + MIN_LEAD_MINUTES);
        const earliest = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

        if (timeInput.value < earliest) {
            const msg = `Đặt trong hôm nay vui lòng chọn giờ từ ${earliest} trở đi.`;
            timeInput.setCustomValidity(msg);
            timeFeedback.textContent = msg;
        }
    }
}

timeInput.addEventListener("input", validateTime);
dateInput.addEventListener("input", validateTime);

// ============================================
// 4. ĐẾM KÝ TỰ Ô GHI CHÚ
// ============================================
function updateNoteCount() {
    noteCount.textContent = `${noteInput.value.length}/${noteInput.maxLength}`;
}
noteInput.addEventListener("input", updateNoteCount);

// ============================================
// THÔNG BÁO VÀ TRẠNG THÁI NÚT
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

function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    submitBtn.classList.toggle("loading", isLoading);
    btnText.textContent = isLoading ? "Đang gửi..." : BTN_DEFAULT_TEXT;
    form.setAttribute("aria-busy", String(isLoading));
}

// ============================================
// 5. GỬI DỮ LIỆU
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

function formatDate(value) {
    const [y, m, d] = value.split("-");
    return `${d}/${m}/${y}`;
}

function resetForm() {
    form.reset();
    guestsInput.value = DEFAULT_GUESTS;
    timeInput.setCustomValidity("");
    timeFeedback.textContent = TIME_DEFAULT_MESSAGE;
    updateNoteCount();
    setDateLimits();
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideStatus();

    // Chống gửi trùng khi đang xử lý
    if (submitBtn.disabled) return;

    // Cắt khoảng trắng thừa
    ["fullname", "email", "note"].forEach((id) => {
        const el = document.getElementById(id);
        el.value = el.value.trim();
    });

    setDateLimits();
    validateTime();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Chống bot: ô honeypot bị điền => giả vờ thành công, không gửi đi
    if (honeypot.value !== "") {
        resetForm();
        showStatus("success", "Cảm ơn bạn! Chúng tôi đã nhận được yêu cầu đặt bàn.");
        return;
    }

    const data = {
        fullname: form.fullname.value,
        phone: form.phone.value,
        email: form.email.value,
        date: form.date.value,
        time: form.time.value,
        guests: Number(form.guests.value),
        area: form.area.value,
        note: form.note.value,
    };

    setLoading(true);

    try {
        await sendData(data);
        showStatus(
            "success",
            `Đặt bàn thành công! ${data.guests} người, lúc ${data.time} ngày ${formatDate(data.date)}. ` +
            "Nhà hàng sẽ liên hệ xác nhận qua số điện thoại của bạn."
        );
        resetForm();
    } catch (error) {
        const timedOut = error.name === "AbortError";
        showStatus(
            "error",
            timedOut
                ? "Quá thời gian chờ. Vui lòng thử lại sau."
                : "Đặt bàn thất bại. Vui lòng thử lại hoặc gọi trực tiếp cho nhà hàng."
        );
    } finally {
        setLoading(false);
    }
});

// ============================================
// 6. SLIDER ẢNH (tự động chuyển ảnh mỗi 4 giây)
// ============================================
const slides = document.querySelectorAll(".booking-image .slide");
const SLIDE_INTERVAL = 4000;
let currentSlide = 0;

function changeSlide() {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
}

// Chỉ chạy khi có từ 2 ảnh trở lên (tránh lỗi chia cho 0 khi chưa có .slide)
if (slides.length > 1) {
    setInterval(changeSlide, SLIDE_INTERVAL);
}

// ============================================
// KHỞI TẠO
// ============================================
setDateLimits();
updateNoteCount();
