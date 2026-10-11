// DỮ LIỆU SẢN PHẨM CHUẨN
        const DEFAULT_PRODUCTS = [
            // LẨU THÁI
            { id: 1, category: "Lẩu Thái", name: "Lẩu Thái Bò", priceText: "299.000 ₫ – 499.000 ₫", prices: [299000, 499000], options: ["Combo Lẩu Cho 2-3 Người", "Combo Lẩu Cho 4-6 Người"], img: "https://i.ibb.co/5gwgnysr/Lau-Thai-bo.png", desc: "♨️ Nước lẩu thái chua cay\n👉 Set lẩu bao gồm: nước lẩu thái tomyum – bắp bò – ba chỉ bò – gầu hoa bò – đậu hũ phomai – viên tôm hùm – nấm kim – nấm đùi gà – mỳ tôm – rau muống – cải ngọt – rau cần – cải thảo – ngô ngọt – đậu phụ – váng đậu – gia vị lẩu\n⏱️ Thời gian chuẩn bị: 10-30 phút\n⏰ Thời gian vận chuyển: 10-30 phút" },
            { id: 2, category: "Lẩu Thái", name: "Lẩu Thái Thập Cẩm", priceText: "299.000 ₫ – 499.000 ₫", prices: [299000, 499000], options: ["Combo Lẩu Cho 2-3 Người", "Combo Lẩu Cho 4-6 Người"], img: "https://i.ibb.co/h1XcCFfW/lau-thai-thap-cam.png", desc: "♨️ Nước lẩu thái Tomyum\n👉 Set lẩu bao gồm: nước lẩu – bò mỹ – sườn sụn – tôm – mực – cá tầm – viên tôm hùm – đậu hũ phomai – nấm kim – nấm đùi gà – mỳ tôm – đĩa rau hỗn hợp – ngô ngọt – đậu phụ – gia vị lẩu\n⏱️ Thời gian chuẩn bị: 10-30 phút\n⏰ Thời gian vận chuyển: 10-30 phút" },
            
            // LẨU RIÊU CUA
            { id: 3, category: "Lẩu Riêu Cua", name: "Lẩu Riêu Cua Bắp Bò Sườn Sụn", priceText: "299.000 ₫ – 499.000 ₫", prices: [299000, 499000], options: ["Combo Lẩu Cho 2-3 Người", "Combo Lẩu Cho 4-6 Người"], img: "https://i.ibb.co/LzWJVpp1/Lau-Rieu-bb-ss-4-6-510x510.png", desc: "👉 Set lẩu bao gồm: nước lẩu riêu cua – bắp bò – sườn sụn – giò tai – nấm kim – nấm đùi – bún( hoặc mỳ tôm) – rau hỗn hợp – ngô ngọt – đậu phụ chiên – riêu cua – váng đậu – gia vị lẩu\n⏱️ Thời gian chuẩn bị: 10-20 phút\n⏰ Thời gian vận chuyển: 10-30 phút" },
            { id: 4, category: "Lẩu Riêu Cua", name: "Lẩu Riêu Cua Bò", priceText: "299.000 ₫ – 499.000 ₫", prices: [299000, 499000], options: ["Combo Lẩu Cho 2-3 Người", "Combo Lẩu Cho 4-6 Người"], img: "https://i.ibb.co/wZTvW1sL/Lau-Rieu-bo-4-6-510x510.png", desc: "👉 Set lẩu bao gồm: nước lẩu riêu cua – ba chỉ bò mỹ – bắp bò – gầu bò – giò tai – riêu cua – nấm kim – nấm đùi – bún( hoặc mỳ tôm) – rau hỗn hợp – ngô ngọt – đậu phụ chiên – váng đậu – gia vị lẩu\n⏱️ Thời gian chuẩn bị: 10-20 phút\n⏰ Thời gian vận chuyển: 10-30 phút" },

            // LẨU KIM CHI
            { id: 5, category: "Lẩu Kim Chi", name: "Lẩu Kim Chi Bò", priceText: "299.000 ₫ – 499.000 ₫", prices: [299000, 499000], options: ["Combo Lẩu Cho 2-3 Người", "Combo Lẩu Cho 4-6 Người"], img: "https://i.ibb.co/r2Zwfp0g/Lau-Kim-Chi-bo-4-6-510x510.png", desc: "♨️ Nước lẩu kim chi chua cay\n👉 Set lẩu bao gồm: nước lẩu kim chi – bắp bò – ba chỉ bò – gầu bò – đậu hũ pm – viên tôm hùm – nấm kim – nấm đùi gà – mỳ tôm – rau hỗn hợp – ngô ngọt – đậu phụ – gia vị lẩu\n⏱️ Thời gian chuẩn bị: 10-30 phút\n⏰ Thời gian vận chuyển: 10-30 phút" },
            { id: 6, category: "Lẩu Kim Chi", name: "Lẩu Kim Chi Thập Cẩm", priceText: "299.000 ₫ – 499.000 ₫", prices: [299000, 499000], options: ["Combo Lẩu Cho 2-3 Người", "Combo Lẩu Cho 4-6 Người"], img: "https://i.ibb.co/7xqq9W7m/lau-kim-chi-thap-cam-4-6-510x510.png", desc: "♨️ Nước lẩu kim chi chua cay\n👉 Set lẩu bao gồm: nước lẩu – bò mỹ – sườn sụn – tôm sú – mực – cá tầm – đậu hũ pm – viên tôm hùm – nấm kim – nấm đùi gà – mỳ tôm – rau hỗn hợp – ngô ngọt – đậu phụ – gia vị lẩu\n⏱️ Thời gian chuẩn bị: 10-30 phút\n⏰ Thời gian vận chuyển: 10-30 phút" },

            // LẨU NẤM
            { id: 7, category: "Lẩu Nấm", name: "Lẩu Nấm Bò", priceText: "299.000 ₫ – 499.000 ₫", prices: [299000, 499000], options: ["Combo Lẩu Cho 2-3 Người", "Combo Lẩu Cho 4-6 Người"], img: "https://i.ibb.co/s9MFp9S1/Lau-Nam-bo-4-6-510x510.png", desc: "♨️ Nước lẩu nấm thanh ngọt\n👉 Set lẩu bao gồm: nước lẩu – ba chỉ bò – bắp bò – gầu hoa bò – nấm hải sản – nấm hương – nấm kim – nấm đùi gà – Bún hoặc mỳ tôm – rau hỗn hợp – ngô ngọt – đậu phụ – gia vị lẩu\n⏱️ Thời gian chuẩn bị: 10-30 phút\n⏰ Thời gian vận chuyển: 10-30 phút" },
            { id: 8, category: "Lẩu Nấm", name: "Lẩu Nấm Thập Cẩm", priceText: "299.000 ₫ – 499.000 ₫", prices: [299000, 499000], options: ["Combo Lẩu Cho 2-3 Người", "Combo Lẩu Cho 4-6 Người"], img: "https://i.ibb.co/WNjQvLBS/Lau-Nam-tc-4-6-510x510.png", desc: "♨️ Nước lẩu nấm thanh ngọt\n👉 Set lẩu bao gồm: nước lẩu – ba chỉ bò – bắp bò – gầu hoa bò – sụn – gà ta – nấm hải sản – nấm hương – nấm kim – nấm đùi gà – Bún hoặc mỳ tôm – rau hỗn hợp – ngô ngọt – đậu phụ – gia vị lẩu\n⏱️ Thời gian chuẩn bị: 10-30 phút\n⏰ Thời gian vận chuyển: 10-30 phút" },

            // COMBO NƯỚNG (1 Giá)
            { id: 9, category: "Combo Nướng", name: "Combo Bò Nướng", priceText: "359.000 ₫", prices: [359000], options: [], img: "https://i.ibb.co/tMhvMD4Q/bo-nuong-510x510.jpg", desc: "Combo Nướng Bao Gồm:\nBa Chỉ Bò: 200g\nDẻ Sườn Bò: 200g\nThăn Bò: 200g\nLõi Vai Bò: 200g\n1 Đĩa Rau Ăn Nướng Tổng Hợp, Sốt Chấm Nướng Các Loại\nNấm, Cà Tím, Đậu Bắp\nKim Chi: 350g\n\nSet nướng đã được ướp sẵn.\nChế biến: Ngon nhất cho món nướng than hoa, hoặc nướng chảo, bếp điện,…\nLưu ý: Trường hợp khách không muốn ướp sẵn và để sốt ướp riêng vui lòng báo trước giúp quán." },
            { id: 10, category: "Combo Nướng", name: "Combo Thịt Nướng Mê Ly", priceText: "399.000 ₫", prices: [399000], options: [], img: "https://i.ibb.co/Ndhxh24b/thit-nuong-me-ly-510x510.jpg", desc: "Combo Nướng Bao Gồm:\nLõi Vai Bò: 200g\nBò Aukobe: 200g\nBa Chỉ Heo: 200g\nMá Đào Heo: 200g\nNầm Heo: 200g\n1 Đĩa Rau Ăn Nướng Tổng Hợp, Sốt Chấm Nướng Các Loại\nNấm, Cà Tím, Đậu Bắp\nKim Chi: 350g\n\nSet nướng đã được ướp sẵn.\nChế biến: Ngon nhất cho món nướng than hoa, hoặc nướng chảo, bếp điện,…\nLưu ý: Trường hợp khách không muốn ướp sẵn và để sốt ướp riêng vui lòng báo trước giúp quán." },

            // THỊT NHÚNG LẨU
            { id: 11, category: "Thịt nhúng lẩu", name: "Ba chỉ bò", priceText: "80.000 ₫ – 120.000 ₫", prices: [80000, 120000], options: ["Size M (200g)", "Size L (300g)"], img: "https://i.ibb.co/yn0jqMJ3/Ba-chi-bo-L-510x510.jpg", desc: "Ba chỉ bò thái lát nhúng lẩu tươi ngon." },
            { id: 12, category: "Thịt nhúng lẩu", name: "Sụn Heo tươi", priceText: "70.000 ₫ – 105.000 ₫", prices: [70000, 105000], options: ["Size M (200g)", "Size L (300g)"], img: "https://i.ibb.co/zVSQ6Hv0/Sun-heo-tuoi-L-510x510.jpg", desc: "Sụn heo tươi xắt miếng vừa ăn, giòn sần sật." },
            { id: 13, category: "Thịt nhúng lẩu", name: "Bắp bò tươi", priceText: "90.000 ₫ – 130.000 ₫", prices: [90000, 130000], options: ["Size M (200g)", "Size L (300g)"], img: "https://i.ibb.co/BVML4QbY/Bap-L-1-510x510.png", desc: "Bắp bò hoa tươi ngon cắt lát nhúng lẩu." },

            // ĐỒ UỐNG (1 Giá)
            { id: 14, category: "Đồ uống", name: "Coca Cola - lon 320ml", priceText: "15.000 ₫", prices: [15000], options: [], img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500", desc: "Coca Cola lon 320ml mát lạnh giải khát." }
        ];

        const PLACEHOLDER_IMG = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="300" height="200" fill="#eee"/>' +
            '<text x="150" y="108" font-family="Arial" font-size="18" fill="#999" text-anchor="middle">Lẩu 4 Mùa</text></svg>');
        const LEGACY_SEED_NAMES = ['Lẩu Thái Tomyum', 'Lẩu Nấm Thượng Hạng', 'Bò Mỹ Thượng Hạng', 'Nấm Kim Châm'];

        function escapeHTML(str) {
            return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
        }

        function readDishes() {
            try {
                const list = JSON.parse(localStorage.getItem('dishesList'));
                return Array.isArray(list) ? list : null;
            } catch (e) { return null; }
        }

        function seedDishesIfNeeded() {
            const list = readDishes();
            const isLegacy = list && list.length === LEGACY_SEED_NAMES.length &&
                list.every((d, i) => d && d.name === LEGACY_SEED_NAMES[i]);
            if (list && !isLegacy) return;
            const seed = DEFAULT_PRODUCTS.map(p => ({
                id: p.id, name: p.name, category: p.category, price: p.prices[0], status: 'Còn hàng'
            }));
            try { localStorage.setItem('dishesList', JSON.stringify(seed)); } catch (e) {}
        }

        function formatVND(n) { return Number(n).toLocaleString('vi-VN') + ' ₫'; }

        function buildProducts() {
            seedDishesIfNeeded();
            const dishes = readDishes();
            if (!dishes) return DEFAULT_PRODUCTS.slice();

            const norm = s => String(s).trim().toLowerCase();
            return dishes.filter(d => d && d.name).map(d => {
                const base = DEFAULT_PRODUCTS.find(p => p.id === d.id) ||
                             DEFAULT_PRODUCTS.find(p => norm(p.name) === norm(d.name));
                const price = Number(d.price) || (base ? base.prices[0] : 0);
                const category = d.category === 'Nước Uống' ? 'Đồ uống' : (d.category || 'Khác');

                let prices, options, img, desc;
                if (base) {
                    const ratio = price / base.prices[0];
                    prices = base.prices.map((x, i) => i === 0 ? price : Math.round(x * ratio / 1000) * 1000);
                    options = base.options; img = base.img; desc = base.desc;
                } else {
                    prices = [price]; options = []; img = PLACEHOLDER_IMG; desc = '';
                }

                const priceText = (base && price === base.prices[0])
                    ? base.priceText
                    : (prices.length > 1 ? `${formatVND(prices[0])} – ${formatVND(prices[prices.length - 1])}` : formatVND(prices[0]));

                return { id: d.id, category, name: d.name, priceText, prices, options, img, desc, soldOut: d.status === 'Hết hàng' };
            });
        }

        const products = buildProducts();

        let cart = []; // Mảng chứa các món trong giỏ hàng
        let currentProductId = null;

        const categories = [...new Set(products.map(p => p.category))];
        let currentCategory = categories[0];

        // 1. Render Menu Tab Ngang
        function renderNav() {
            const nav = document.getElementById('navbar');
            nav.innerHTML = '';
            categories.forEach(cat => {
                const div = document.createElement('div');
                div.className = `nav-item ${cat === currentCategory ? 'active' : ''}`;
                div.innerText = cat;
                div.onclick = () => { currentCategory = cat; renderNav(); renderProducts(); };
                nav.appendChild(div);
            });
        }

        // 2. Render Danh Sách Món Ăn
        function renderProducts() {
            const grid = document.getElementById('product-grid');
            grid.innerHTML = '';
            if (products.length === 0) {
                grid.innerHTML = '<p style="text-align:center; color:#888; padding:30px;">Thực đơn đang được cập nhật.</p>';
                return;
            }
            products.filter(p => p.category === currentCategory).forEach(p => {
                grid.innerHTML += `
                    <div class="product-card" ${p.soldOut ? 'style="opacity:.55;"' : ''} onclick="openModal(${p.id})">
                        <img src="${p.img}" class="product-img" onerror="this.src='https://via.placeholder.com/300x200?text=Mon+An'">
                        <div class="product-info">
                            <div class="product-title">${escapeHTML(p.name)}${p.soldOut ? ' <span style="color:#d9534f; font-size:12px;">(Hết hàng)</span>' : ''}</div>
                            <div class="product-price">${p.priceText}</div>
                        </div>
                    </div>
                `;
            });
        }

        // 3. Mở Modal Chi Tiết Món
        function openModal(id) {
            currentProductId = id;
            const p = products.find(item => item.id === id);
            if (p.soldOut) {
                alert('Món này hiện đã hết hàng. Vui lòng chọn món khác!');
                return;
            }
            
            document.getElementById('modal-img').src = p.img;
            document.getElementById('modal-title').innerText = p.name;
            document.getElementById('modal-priceText').innerText = p.priceText;
            document.getElementById('modal-desc').innerText = p.desc || '';
            document.getElementById('modal-qty').value = 1;

            const optionsDiv = document.getElementById('modal-options');
            optionsDiv.innerHTML = '';
            
            if (p.options && p.options.length > 0) {
                optionsDiv.innerHTML = `<p style="font-size:12px; font-weight:bold; color:#555; margin-bottom:6px;">Vui lòng chọn:</p>`;
                p.options.forEach((opt, idx) => {
                    optionsDiv.innerHTML += `
                        <label>
                            <input type="radio" name="modal-opt" value="${idx}" ${idx === 0 ? 'checked' : ''}> 
                            ${opt}
                        </label>
                    `;
                });
                optionsDiv.style.display = 'block';
            } else {
                optionsDiv.style.display = 'none';
            }

            document.getElementById('product-modal').style.display = 'block';
        }

        function changeModalQty(amt) {
            const input = document.getElementById('modal-qty');
            let val = (parseInt(input.value) || 1) + amt;
            if (val < 1) val = 1;
            input.value = val;
        }

        function closeModal() {
            document.getElementById('product-modal').style.display = 'none';
        }

        // 4. Thêm Món Vào Giỏ Hàng
        function addToCart() {
            const p = products.find(item => item.id === currentProductId);
            const qty = parseInt(document.getElementById('modal-qty').value) || 1;
            
            let selectedIdx = 0;
            let optName = "";

            if (p.options && p.options.length > 0) {
                const radios = document.getElementsByName('modal-opt');
                for (let r of radios) {
                    if (r.checked) {
                        selectedIdx = parseInt(r.value);
                        break;
                    }
                }
                optName = `(${p.options[selectedIdx]})`;
            }

            // Lấy chính xác giá theo Option (Giá 1 hoặc Giá 2)
            const exactPrice = p.prices[selectedIdx] || p.prices[0];
            const cartKey = `${p.id}_${selectedIdx}`;

            // Kiểm tra trùng món
            const existIndex = cart.findIndex(item => item.cartKey === cartKey);
            if (existIndex > -1) {
                cart[existIndex].qty += qty;
            } else {
                cart.push({
                    cartKey: cartKey,
                    name: p.name,
                    optName: optName,
                    price: exactPrice,
                    qty: qty
                });
            }

            closeModal();
            updateCartUI();
            toggleCartPanel(true); // Mở giỏ hàng để người dùng thấy món vừa thêm
        }

        // 5. Cập nhật Số Lượng Trực Tiếp Trong Bảng Giỏ Hàng
        function updateCartQty(cartKey, amt) {
            const idx = cart.findIndex(item => item.cartKey === cartKey);
            if (idx > -1) {
                cart[idx].qty += amt;
                if (cart[idx].qty <= 0) {
                    cart.splice(idx, 1); // Xoá nếu giảm về 0
                }
                updateCartUI();
            }
        }

        // 6. Cập Nhật Giao Diện Bảng Giỏ Hàng & Nút Hồng
        function updateCartUI() {
            const container = document.getElementById('cart-items-container');
            const totalEl = document.getElementById('cart-total-price');
            const badgeEl = document.getElementById('cart-badge');

            container.innerHTML = '';
            let grandTotal = 0;
            let totalCount = 0;

            if (cart.length === 0) {
                container.innerHTML = '<p style="text-align:center; color:#888; margin-top:30px;">Giỏ hàng của bạn đang trống</p>';
            } else {
                cart.forEach(item => {
                    const itemTotal = item.price * item.qty;
                    grandTotal += itemTotal;
                    totalCount += item.qty;

                    container.innerHTML += `
                        <div class="cart-item">
                            <div class="cart-item-info">
                                <div class="cart-item-name">${escapeHTML(item.name)}</div>
                                ${item.optName ? `<div class="cart-item-option">${item.optName}</div>` : ''}
                                <div class="cart-item-price">${item.price.toLocaleString('vi-VN')} ₫</div>
                            </div>
                            <div class="cart-item-controls">
                                <button onclick="updateCartQty('${item.cartKey}', -1)">-</button>
                                <span>${item.qty}</span>
                                <button onclick="updateCartQty('${item.cartKey}', 1)">+</button>
                            </div>
                        </div>
                    `;
                });
            }

            totalEl.innerText = grandTotal.toLocaleString('vi-VN') + ' ₫';
            badgeEl.innerText = totalCount;
        }

        
// 8. Xác nhận đặt hàng
function checkout() {
    // Không cho đặt hàng nếu giỏ hàng đang trống
    if (cart.length === 0) {
        alert("Chưa đặt món! Vui lòng thêm món vào giỏ hàng trước khi đặt hàng.");
        return;
    }

    // Giỏ hàng có món thì mới tiếp tục xác nhận
    alert("Đã gửi đơn hàng thành công!");
}

// 7. Bật / Tắt Bảng Giỏ Hàng
        function toggleCartPanel(isOpen) {
            const panel = document.getElementById('cart-panel');
            const overlay = document.getElementById('cart-overlay');
            if (isOpen) {
                panel.classList.add('open');
                overlay.style.display = 'block';
            } else {
                panel.classList.remove('open');
                overlay.style.display = 'none';
            }
        }

        // Click ngoài Modal để đóng
        window.onclick = function(e) {
            if (e.target == document.getElementById('product-modal')) closeModal();
        }

        // Khởi động
        renderNav();
        renderProducts();
        updateCartUI();
