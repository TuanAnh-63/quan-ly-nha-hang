(function () {
  'use strict';

  /* ================= TIỆN ÍCH ================= */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function injectStyles(css) {
    var s = document.createElement('style');
    s.setAttribute('data-l4m', '');
    s.textContent = css;
    document.head.appendChild(s);
  }

  function readCurrentUser() {
    try { return JSON.parse(localStorage.getItem('currentUser')); } catch (e) { return null; }
  }

  /* ================= CSS DÙNG CHUNG ================= */
  var COMMON_CSS = [
    'html{scroll-behavior:smooth}',
    '@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}',
    '.header-navbar{transition:box-shadow .3s ease,padding .3s ease}',
    '.header-navbar.l4m-scrolled{box-shadow:0 6px 18px rgba(0,0,0,.18)}',
    /* hiệu ứng xuất hiện khi cuộn */
    '.l4m-reveal{opacity:0;transform:translateY(26px);transition:opacity .65s ease,transform .65s ease;transition-delay:var(--l4m-d,0s)}',
    '.l4m-reveal.l4m-in{opacity:1;transform:none}',
    '@media (prefers-reduced-motion:reduce){.l4m-reveal{opacity:1;transform:none;transition:none}}',
    /* nút nổi */
    '.l4m-fab{position:fixed;z-index:1030;border:0;border-radius:50%;width:48px;height:48px;display:flex;align-items:center;justify-content:center;',
    'color:#fff;font-size:18px;text-decoration:none;box-shadow:0 6px 16px rgba(0,0,0,.3);cursor:pointer;transition:transform .2s ease,opacity .3s ease,visibility .3s}',
    '.l4m-fab:hover{transform:translateY(-3px);color:#fff}',
    '.l4m-fab:focus-visible{outline:3px solid #ffc107;outline-offset:2px}',
    '#l4mTop{right:16px;bottom:18px;background:var(--dark,#212529);opacity:0;visibility:hidden}',
    '#l4mTop.l4m-show{opacity:1;visibility:visible}',
    '#l4mCall{left:16px;bottom:18px;background:var(--brand,#c0392b)}',
    '#l4mCall::after{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid var(--brand,#c0392b);animation:l4mPulse 2s infinite}',
    '@keyframes l4mPulse{0%{transform:scale(1);opacity:.8}100%{transform:scale(1.6);opacity:0}}',
    '@media (prefers-reduced-motion:reduce){#l4mCall::after{animation:none}}',
    /* biểu tượng tài khoản khi đã đăng nhập */
    'a.l4m-logged{position:relative}',
    'a.l4m-logged::after{content:"";position:absolute;top:-3px;right:-3px;width:10px;height:10px;border-radius:50%;background:#28a745;border:2px solid #fff}'
  ].join('');

  /* ================= TÀI KHOẢN (sửa link hỏng + trạng thái đăng nhập) ================= */
  function setupAccountLink() {
    var user = readCurrentUser();
    $$('a[href="login.html"], a[href="html_login.html"]').forEach(function (a) {
      a.setAttribute('href', 'html_login.html');
      if (user) {
        var name = user.fullName || user.email || 'bạn';
        a.setAttribute('title', 'Xin chào, ' + name);
        a.setAttribute('aria-label', 'Tài khoản: ' + name);
        a.classList.add('l4m-logged');
        if (user.role === 'admin') {
          a.setAttribute('href', 'html_admin.html');
          a.setAttribute('title', 'Xin chào, ' + name + ' – vào trang quản trị');
        }
      }
    });
  }

  /* ================= THANH ĐIỀU HƯỚNG ================= */
  function setupNavbar() {
    var nav = $('.header-navbar');
    var collapseEl = $('#mainNavbar');

    function onScroll() {
      if (nav) nav.classList.toggle('l4m-scrolled', window.scrollY > 10);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    function closeMenu() {
      if (!collapseEl || !collapseEl.classList.contains('show')) return;
      if (window.bootstrap && window.bootstrap.Collapse) {
        window.bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false }).hide();
      }
    }
    // bấm vào link trong menu mobile thì tự đóng
    if (collapseEl) {
      $$('a', collapseEl).forEach(function (a) { a.addEventListener('click', closeMenu); });
    }
    // bấm ra ngoài hoặc nhấn Esc thì đóng
    document.addEventListener('click', function (e) {
      if (collapseEl && collapseEl.classList.contains('show') && !e.target.closest('.header-navbar')) closeMenu();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* ================= NÚT LÊN ĐẦU TRANG + NÚT GỌI HOTLINE ================= */
  function setupFloatingButtons() {
    var top = document.createElement('button');
    top.id = 'l4mTop';
    top.type = 'button';
    top.className = 'l4m-fab';
    top.setAttribute('aria-label', 'Lên đầu trang');
    top.innerHTML = '<i class="fa-solid fa-arrow-up" aria-hidden="true"></i>';
    top.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    document.body.appendChild(top);

    function toggleTop() { top.classList.toggle('l4m-show', window.scrollY > 450); }
    toggleTop();
    window.addEventListener('scroll', toggleTop, { passive: true });

    // lấy hotline ngay trong trang, không gõ cứng
    var telLink = $('a[href^="tel:"]');
    var tel = telLink ? telLink.getAttribute('href') : null;
    if (tel) {
      var call = document.createElement('a');
      call.id = 'l4mCall';
      call.className = 'l4m-fab';
      call.href = tel;
      call.setAttribute('aria-label', 'Gọi hotline đặt bàn và ship');
      call.title = 'Gọi hotline';
      call.innerHTML = '<i class="fa-solid fa-phone" aria-hidden="true"></i>';
      document.body.appendChild(call);
    }
  }

  /* ================= LINK "#" VÀ ĐIỀU HƯỚNG TRONG TRANG ================= */
  function setupAnchors() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var href = a.getAttribute('href');
      if (href === '#') { e.preventDefault(); return; }   // icon mạng xã hội chưa có link: không nhảy lên đầu trang
      var target;
      try { target = $(href); } catch (err) { target = null; }
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
  }

  /* ================= ẢNH: lazy-load + ảnh dự phòng khi lỗi mạng ================= */
  var FALLBACK_IMG = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="560" viewBox="0 0 800 560">' +
    '<rect width="800" height="560" fill="#2b2b2b"/>' +
    '<text x="400" y="290" font-family="Arial,sans-serif" font-size="34" fill="#ffc107" text-anchor="middle">LẨU 4 MÙA</text>' +
    '</svg>');

  function setupImages() {
    $$('img').forEach(function (img) {
      var inFirstSlide = img.closest('.carousel-item.active');
      if (!inFirstSlide && !img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
      img.addEventListener('error', function onErr() {
        img.removeEventListener('error', onErr);
        img.src = FALLBACK_IMG;
      });
      // ảnh đã lỗi trước khi gắn listener
      if (img.complete && img.naturalWidth === 0 && img.src && img.src.indexOf('data:') !== 0) img.src = FALLBACK_IMG;
    });
  }

  /* ================= CHÂN TRANG: năm bản quyền tự cập nhật ================= */
  function setupFooterYear() {
    var p = $('.footer-bottom p');
    if (!p) return;
    p.textContent = p.textContent.replace(/(©|\u00a9)\s*\d{4}/, '$1 ' + new Date().getFullYear());
  }

  /* ================= HIỆU ỨNG XUẤT HIỆN KHI CUỘN ================= */
  function setupReveal(selectors) {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    var seen = [];
    var perParent = new Map();
    selectors.forEach(function (sel) {
      $$(sel).forEach(function (el) {
        if (seen.indexOf(el) !== -1) return;
        seen.push(el);
        var n = perParent.get(el.parentElement) || 0;
        perParent.set(el.parentElement, n + 1);
        el.style.setProperty('--l4m-d', (Math.min(n, 3) * 0.1) + 's');
        el.classList.add('l4m-reveal');
      });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('l4m-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    seen.forEach(function (el) { io.observe(el); });
  }

  /* =====================================================================
     TRANG CHỦ (index.html)
     ===================================================================== */

  /* ---- Giờ mở cửa: lấy đúng theo mục "Giờ Phục Vụ" ở chân trang ---- */
  var HOURS = {
    weekday: { open: 10 * 60 + 30, close: 23 * 60 },        // Thứ 2 – Thứ 6: 10:30 – 23:00
    weekend: { open: 10 * 60,      close: 24 * 60 }         // Thứ 7 – CN:   10:00 – 24:00
  };
  var LAST_ORDER = 22 * 60 + 30;                             // nhận ship & bàn cuối lúc 22:30

  function fmt(min) {
    var h = Math.floor(min / 60), m = min % 60;
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }
  function isWeekend(dayIdx) { return dayIdx === 0 || dayIdx === 6; }   // 0 = CN, 6 = T7

  // trả về { state: 'open' | 'last' | 'closed', text }
  function getStatus(dayIdx, minutes) {
    var today = isWeekend(dayIdx) ? HOURS.weekend : HOURS.weekday;
    if (minutes >= today.open && minutes < today.close) {
      if (minutes >= LAST_ORDER) return { state: 'last', text: 'Đã ngừng nhận đơn mới · đóng cửa ' + fmt(today.close) };
      return { state: 'open', text: 'Đang mở cửa · đến ' + fmt(today.close) };
    }
    if (minutes < today.open) return { state: 'closed', text: 'Đã đóng cửa · mở lúc ' + fmt(today.open) + ' hôm nay' };
    var next = isWeekend((dayIdx + 1) % 7) ? HOURS.weekend : HOURS.weekday;
    return { state: 'closed', text: 'Đã đóng cửa · mở lúc ' + fmt(next.open) + ' ngày mai' };
  }

  function nowInVietnam() {
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date());
    var o = {};
    parts.forEach(function (p) { o[p.type] = p.value; });
    var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { day: map[o.weekday], minutes: parseInt(o.hour, 10) * 60 + parseInt(o.minute, 10) };
  }

  function setupOpenStatus() {
    var host = $('.promo-strip .container');
    if (!host || !window.Intl || !Intl.DateTimeFormat.prototype.formatToParts) return;

    var badge = document.createElement('span');
    badge.id = 'l4mStatus';
    badge.className = 'badge rounded-pill fs-7 px-3 py-2';
    badge.setAttribute('role', 'status');
    var btn = $('a.btn', host);
    host.insertBefore(badge, btn || null);

    var COLORS = {
      open:   'bg-success text-white',
      last:   'bg-warning text-dark',
      closed: 'bg-secondary text-white'
    };
    function render() {
      var n = nowInVietnam();
      var st = getStatus(n.day, n.minutes);
      badge.className = 'badge rounded-pill fs-7 px-3 py-2 ' + COLORS[st.state];
      badge.innerHTML = '<i class="fa-regular fa-clock me-1" aria-hidden="true"></i>' + st.text;
    }
    render();
    setInterval(render, 60000);
  }

  /* ---- Banner: dừng khi cuộn khỏi màn hình / chuyển tab, tôn trọng "giảm chuyển động" ---- */
  function setupCarousel() {
    var el = $('#mainBanner');
    if (!el || !window.bootstrap || !window.bootstrap.Carousel) return;
    var carousel = window.bootstrap.Carousel.getOrCreateInstance(el);
    if (reduceMotion) { carousel.pause(); return; }

    var visible = true;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible && !document.hidden) carousel.cycle(); else carousel.pause();
      }, { threshold: 0.25 }).observe(el);
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) carousel.pause(); else if (visible) carousel.cycle();
    });
    // phím mũi tên trái/phải khi banner đang được focus
    el.setAttribute('tabindex', '0');
    el.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { carousel.prev(); }
      if (e.key === 'ArrowRight') { carousel.next(); }
    });
  }

  /* ---- KHỞI TẠO ---- */
  function init() {
    injectStyles(COMMON_CSS + '#mainBanner:focus-visible{outline:3px solid #ffc107;outline-offset:-3px}#l4mStatus{white-space:normal}');
    setupAccountLink();
    setupNavbar();
    setupAnchors();
    setupImages();
    setupFooterYear();
    setupFloatingButtons();
    setupOpenStatus();
    setupCarousel();
    setupReveal([
      '.promo-strip .container',
      'section.bg-dark.text-white .col-6',
      '#about-summary .col-lg-6',
      '#featured-dishes .text-center.mx-auto',
      '#featured-dishes .col-lg-4',
      '#featured-dishes .text-center.mt-5',
      'section.bg-warning .container > *'
    ]);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
