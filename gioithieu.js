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
     TRANG GIỚI THIỆU (gioithieu.html)
     ===================================================================== */

  /* ---- Số liệu thống kê: đếm từ 0 lên khi cuộn tới (chỉ áp cho số nguyên thuần, "10-30 P" giữ nguyên) ---- */
  function setupCounters() {
    var nodes = $$('section.bg-dark.text-white:not(.position-relative) h3').filter(function (h) {
      return /^\d+$/.test(h.textContent.trim());
    });
    if (!nodes.length || reduceMotion || !('IntersectionObserver' in window)) return;

    function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
    function run(el) {
      var target = parseInt(el.textContent.trim(), 10);
      var dur = 1200, start = null;
      el.setAttribute('aria-label', String(target));
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = String(Math.round(target * easeOut(p)));
        if (p < 1) requestAnimationFrame(step); else el.textContent = String(target);
      }
      el.textContent = '0';
      requestAnimationFrame(step);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ---- Xem ảnh phóng to (lightbox) cho các ảnh ở phần "Câu chuyện của chúng tôi" ---- */
  function setupLightbox() {
    var imgs = $$('#main-content section.bg-white img');
    if (!imgs.length) return;

    var overlay = document.createElement('div');
    overlay.id = 'l4mLightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Xem ảnh phóng to');
    overlay.innerHTML =
      '<button type="button" class="l4m-lb-btn l4m-lb-close" aria-label="Đóng">&times;</button>' +
      '<button type="button" class="l4m-lb-btn l4m-lb-prev" aria-label="Ảnh trước"><i class="fa-solid fa-chevron-left" aria-hidden="true"></i></button>' +
      '<figure><img alt=""><figcaption></figcaption></figure>' +
      '<button type="button" class="l4m-lb-btn l4m-lb-next" aria-label="Ảnh sau"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i></button>';
    document.body.appendChild(overlay);

    var big = $('img', overlay), cap = $('figcaption', overlay);
    var closeBtn = $('.l4m-lb-close', overlay);
    var cur = 0, lastFocus = null;

    function show(i) {
      cur = (i + imgs.length) % imgs.length;
      var src = imgs[cur].currentSrc || imgs[cur].src;
      big.src = src.replace(/w=\d+/, 'w=1400');          // ảnh nét hơn khi phóng to
      big.onerror = function () { big.onerror = null; big.src = src; };
      big.alt = imgs[cur].alt || '';
      cap.textContent = imgs[cur].alt || '';
    }
    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      overlay.classList.add('l4m-open');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }
    function close() {
      overlay.classList.remove('l4m-open');
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    imgs.forEach(function (img, i) {
      img.classList.add('l4m-zoomable');
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'Phóng to ảnh: ' + (img.alt || 'ảnh ' + (i + 1)));
      img.addEventListener('click', function () { open(i); });
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
      });
    });

    $('.l4m-lb-prev', overlay).addEventListener('click', function (e) { e.stopPropagation(); show(cur - 1); });
    $('.l4m-lb-next', overlay).addEventListener('click', function (e) { e.stopPropagation(); show(cur + 1); });
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });

    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('l4m-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(cur - 1);
      else if (e.key === 'ArrowRight') show(cur + 1);
      else if (e.key === 'Tab') {                         // giữ focus trong hộp thoại
        var f = $$('button', overlay);
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  var LIGHTBOX_CSS = [
    '.l4m-zoomable{cursor:zoom-in}',
    '.l4m-zoomable:focus-visible{outline:3px solid #ffc107;outline-offset:3px}',
    '#l4mLightbox{position:fixed;inset:0;z-index:2000;background:rgba(0,0,0,.88);display:none;align-items:center;justify-content:center;padding:24px}',
    '#l4mLightbox.l4m-open{display:flex;animation:l4mFade .25s ease}',
    '@keyframes l4mFade{from{opacity:0}to{opacity:1}}',
    '#l4mLightbox figure{margin:0;max-width:min(92vw,1100px);text-align:center}',
    '#l4mLightbox figure img{max-width:100%;max-height:78vh;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,.6);object-fit:contain}',
    '#l4mLightbox figcaption{color:#e9ecef;margin-top:12px;font-size:.95rem}',
    '.l4m-lb-btn{position:absolute;background:rgba(255,255,255,.12);color:#fff;border:0;width:46px;height:46px;border-radius:50%;font-size:22px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s}',
    '.l4m-lb-btn:hover{background:rgba(255,255,255,.3)}',
    '.l4m-lb-btn:focus-visible{outline:3px solid #ffc107}',
    '.l4m-lb-close{top:18px;right:18px;font-size:30px;line-height:1}',
    '.l4m-lb-prev{left:18px;top:50%;transform:translateY(-50%)}',
    '.l4m-lb-next{right:18px;top:50%;transform:translateY(-50%)}',
    '@media (max-width:576px){.l4m-lb-prev,.l4m-lb-next{top:auto;bottom:18px;transform:none}}',
    '@media (prefers-reduced-motion:reduce){#l4mLightbox.l4m-open{animation:none}}'
  ].join('');

  /* ---- KHỞI TẠO ---- */
  function init() {
    injectStyles(COMMON_CSS + LIGHTBOX_CSS);
    setupAccountLink();
    setupNavbar();
    setupAnchors();
    setupImages();
    setupFooterYear();
    setupFloatingButtons();
    setupLightbox();
    setupCounters();
    setupReveal([
      'section.bg-white .col-lg-6',
      'section.bg-light .text-center.mx-auto',
      'section.bg-light .col-lg-3',
      'section.bg-dark.text-white:not(.position-relative) .col-6',
      'section.bg-warning .container > *'
    ]);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
