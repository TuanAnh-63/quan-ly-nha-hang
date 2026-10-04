/* =====================================================================
   i18n.js - Chuyển ngôn ngữ Việt (VI) / Anh (EN) cho toàn website
   ---------------------------------------------------------------------
   CÁCH DÙNG: nhúng file này ở cuối <body> của mỗi trang:
       <script src="i18n.js"></script>
   - Không cần gắn thuộc tính nào vào từng thẻ: file tự tìm chữ tiếng Việt
     trên trang (văn bản, placeholder, title, alt, aria-label) và đổi sang
     tiếng Anh theo bảng EN bên dưới. Chữ do JS tạo ra sau này cũng được dịch.
   - Muốn dịch thêm câu mới: thêm một dòng  'câu tiếng Việt': 'English'  vào EN
     (chép đúng từng chữ như trên trang).
   - Trang nào có nút <button data-lang="vi|en"> thì dùng nút đó; trang nào
     chưa có (login, quên mật khẩu, menu) thì file tự thêm nút nổi góc phải.
   - Trong JS, dùng t('câu tiếng Việt') cho alert()/confirm() để dịch theo ngôn ngữ đang chọn.
   ===================================================================== */
(function (root) {
  'use strict';

  var EN = {
  "Miễn Phí Ship Bán Kính 3km": "Free delivery within 3 km",
  "Mượn Nồi Bếp Bát Đĩa Nếu Khách Yêu Cầu": "Pots, stoves & dishes lent on request",
  "Được Hơn 10.000+ Khách Hàng Yêu Thích": "Loved by 10,000+ customers",
  "Mượn Nồi Bếp Bát Đĩa Nhanh Chóng": "Pots, stoves & dishes lent quickly",
  "Hơn 10.000+ Khách Hàng Tin Dùng": "Trusted by 10,000+ customers",
  "Trang Chủ": "Home",
  "Giới Thiệu": "About Us",
  "Menu Lẩu": "Hotpot Menu",
  "Đặt Bàn Lẩu": "Book a Table",
  "Liên Hệ": "Contact",
  "Đặt Bàn Ngay": "Book Now",
  "Chọn ngôn ngữ / Language": "Select language",
  "Đăng nhập": "Log in",
  "Đăng xuất": "Log out",
  "Tên User": "User",
  "Tài khoản": "Account",
  "Quản trị viên": "Administrator",
  "Khách hàng": "Customer",
  "Trước": "Previous",
  "Tiếp": "Next",
  "Liên Kết": "Links",
  "Trang chủ": "Home",
  "Giới thiệu": "About",
  "Đặt bàn": "Book a Table",
  "Liên hệ": "Contact",
  "Giờ Phục Vụ": "Opening Hours",
  "Thứ 2 - Thứ 6:": "Monday - Friday:",
  "Thứ 7 - Chủ Nhật:": "Saturday - Sunday:",
  "Nhận ship & bàn lẩu cuối lúc 22:30": "Last delivery & table orders at 22:30",
  "Địa Chỉ Lẩu": "Our Address",
  "123 Đường Tràng Tiền, Hoàn Kiếm, Hà Nội": "123 Trang Tien Street, Hoan Kiem, Hanoi",
  "Hệ thống nhà hàng lẩu thượng hạng & dịch vụ ship lẩu tận nhà với hương vị nước lẩu độc quyền, nguyên liệu đồ nhúng tươi sạch chuẩn kiểm định.": "A premium hotpot restaurant and home delivery service with exclusive broth recipes and fresh, quality-inspected dipping ingredients.",
  "© 2026 Lẩu 4 Mùa - Thiên Đường Lẩu Ngon. All rights reserved.": "© 2026 Lẩu 4 Mùa - Hotpot Paradise. All rights reserved.",
  "Lẩu 4 Mùa - Lẩu Ngon Tại Nhà & Ship Tận Nơi": "Lẩu 4 Mùa - Delicious Hotpot at Home & Delivered to Your Door",
  "Lẩu 4 Mùa - Ship Tận Nơi": "Lẩu 4 Mùa - Delivered to Your Door",
  "LẨU NGON TẠI NHÀ": "DELICIOUS HOTPOT AT HOME",
  "LẨU 4 MÙA - TƯƠI NGON CHUẨN VỊ": "LẨU 4 MÙA - FRESH, AUTHENTIC FLAVOR",
  "Ship tận nơi nhanh chóng • Mượn nồi bếp bát đĩa trọn gói miễn phí": "Fast delivery to your door • Free loan of pots, stoves and dishes",
  "GỌI SHIP NGAY: 0898 879 669": "CALL FOR DELIVERY: 0898 879 669",
  "Combo Lẩu Thái Tomyum": "Thai Tom Yum hotpot combo",
  "COMBO LẨU THÁI TOMYUM & TỨ XUYÊN": "THAI TOM YUM & SICHUAN HOTPOT COMBOS",
  "Đầy đủ Bò Mỹ, Hải Sản tươi sống và Nước chấm pha sẵn đặc trưng": "Complete with US beef, fresh seafood and our signature ready-made dipping sauce",
  "Trải nghiệm Nồi lẩu 4 ngăn": "Four-compartment hotpot experience",
  "TRẢI NGHIỆM TẠI QUÁN": "DINE-IN EXPERIENCE",
  "KHÔNG GIAN BẾP ÂM KHÔNG ÁM MÙI": "BUILT-IN STOVES, NO LINGERING SMELLS",
  "Thỏa thích chọn 4 vị nước lẩu cùng lúc trong không gian sang trọng": "Choose from 4 broth flavors at once in an elegant setting",
  "ĐẶT BÀN GIỮ NỒI LẨU": "RESERVE YOUR HOTPOT TABLE",
  "Ưu đãi đặt bàn": "Booking offer",
  "Đặt bàn trước giảm 10% tổng hóa đơn": "Book ahead and get 10% off your total bill",
  "Đặt bàn trước giảm 10% tổng hóa đơn!": "Book ahead and get 10% off your total bill!",
  "Đặt bàn ngay": "Book now",
  "SHIP TẬN NHÀ": "HOME DELIVERY",
  "Nhanh chóng trong 30-45 phút": "Fast, within 30-45 minutes",
  "NGUYÊN LIỆU TƯƠI": "FRESH INGREDIENTS",
  "Chuẩn vị nhà hàng 5 sao": "5-star restaurant quality",
  "ĐÓNG HỘP CẨN THẬN": "CAREFULLY PACKED",
  "Sạch sẽ & An toàn thực phẩm": "Clean & food-safe",
  "ƯU ĐÃI HẤP DẪN": "GREAT OFFERS",
  "Quà tặng kèm hấp dẫn mỗi combo": "A free gift with every combo",
  "Không gian nhà hàng lẩu hiện đại": "Modern hotpot restaurant interior",
  "Hệ Thống Bếp Âm": "Built-in Stove System",
  "Hút Mùi Không Ám Khói": "Odor Extraction, No Smoky Smell",
  "Về Lẩu 4 Mùa": "About Lẩu 4 Mùa",
  "Lẩu Ngon Tại Nhà & Trải Nghiệm Thượng Hạng Tại Quán": "Delicious Hotpot at Home & a Premium Dine-in Experience",
  "Không chỉ mang lại hương vị lẩu đậm đà từ Thái Lan, Tứ Xuyên cho đến Hồng Kông tại nhà hàng, Lẩu 4 Mùa còn phục vụ dịch vụ": "Beyond serving rich hotpot flavors from Thailand, Sichuan and Hong Kong at our restaurant, Lẩu 4 Mùa also offers a",
  "Lẩu Ship Tận Nhà": "Home Hotpot Delivery",
  "trọn gói – cho mượn nồi, bếp, bát đĩa tận nơi hoàn toàn miễn phí.": "service – a complete package where pots, stoves and dishes are lent to you free of charge.",
  "Nồi Lẩu Multi-Flavor": "Multi-Flavor Hotpot",
  "Tùy chọn 2 hoặc 4 vị lẩu": "Choose 2 or 4 broth flavors",
  "Thịt Bò Nhập Khẩu": "Imported Beef",
  "Bò Mỹ, Wagyu cắt lát chuẩn": "US beef and Wagyu, perfectly sliced",
  "Tìm Hiểu Trải Nghiệm Lẩu": "Discover the Hotpot Experience",
  "Gợi Ý Nổi Bật": "Featured Picks",
  "Nước Lẩu & Đồ Nhúng Đáng Thử Nhất": "Must-Try Broths & Dipping Ingredients",
  "Lựa chọn hàng đầu của thực khách khi gọi ship hoặc ghé ăn tại quán": "Top choices for guests, whether ordering delivery or dining in",
  "Nước Lẩu Thái Tomyum": "Thai Tom Yum Broth",
  "Nước Lẩu Signature": "Signature Broth",
  "Lẩu Thái Tomyum Chuẩn Cốt": "Authentic Thai Tom Yum Hotpot",
  "189.000đ": "189,000 VND",
  "459.000đ": "459,000 VND",
  "199.000đ": "199,000 VND",
  "Vị chua cay bùng nổ từ sả, lá chanh kiên, ớt tươi và cốt dừa béo ngậy. Rất hợp nhúng hải sản.": "A burst of sour and spicy from lemongrass, makrut lime leaves, fresh chili and rich coconut cream. Perfect for dipping seafood.",
  "4.9 (230 đánh giá)": "4.9 (230 reviews)",
  "5.0 (310 đánh giá)": "5.0 (310 reviews)",
  "4.8 (180 đánh giá)": "4.8 (180 reviews)",
  "Chọn Vị Lẩu này": "Choose This Broth",
  "Combo Bò Nhúng Lẩu": "Beef hotpot combo",
  "Best Seller Nhúng": "Best Seller",
  "Combo Bò Mỹ Nhúng 3 Cấp Độ": "3-Level US Beef Dipping Combo",
  "Gồm Ba chỉ bò, Thăn ngoại Wagyu và Gù bò cuộn hoa hồng. Cắt mỏng chuẩn độ dày nhúng 15 giây.": "Includes beef belly, Wagyu striploin and rose-rolled beef hump. Sliced thin for a 15-second dip.",
  "Xem Chi Tiết": "View Details",
  "Nước lẩu Tứ Xuyên": "Sichuan hotpot broth",
  "Lẩu Tứ Xuyên Tê Cay": "Numbing & Spicy Sichuan Hotpot",
  "Nấu từ hoa tiêu Tứ Xuyên và thảo mộc Đông Y, thơm đậm đà, vị cay tê quyến rũ cho tín đồ ăn cay.": "Made with Sichuan peppercorns and traditional herbs. Aromatic, with an alluring numbing heat for spice lovers.",
  "Xem Toàn Bộ Menu Lẩu & Buffet": "View the Full Hotpot & Buffet Menu",
  "HOTLINE GỌI SHIP & ĐẶT BÀN: 0898 879 669": "DELIVERY & BOOKING HOTLINE: 0898 879 669",
  "Miễn phí mượn nồi - bếp - bát - đĩa (Chi mượn nếu khách yêu cầu). Ship tận nơi trong 30-45 phút!": "Free loan of pots, stoves and dishes (only if requested). Delivered to your door in 30-45 minutes!",
  "Gọi Ngay Hotline": "Call the Hotline Now",
  "Đặt Bàn Giữ Nồi Lẩu": "Reserve Your Hotpot Table",
  "Giới Thiệu - Lẩu 4 Mùa": "About Us - Lẩu 4 Mùa",
  "Hành trình mang hương vị lẩu ấm cúng, tròn vị đến từng bữa ăn gia đình và bàn tiệc của bạn.": "Our journey of bringing warm, full-flavored hotpot to your family meals and banquet tables.",
  "Câu Chuyện Của Chúng Tôi": "Our Story",
  "Lẩu Ngon Chuẩn Vị – Trải Nghiệm Trọn Vẹn Dù Ở Bất Kỳ Đâu": "Authentic Hotpot – A Complete Experience Wherever You Are",
  "Ra đời với sứ mệnh kết nối tình thân qua từng nồi lẩu nghi ngút khói,": "Founded with a mission to bring people closer through every steaming pot of hotpot,",
  "không chỉ là điểm đến thưởng thức ẩm thực lý tưởng tại nhà hàng mà còn là đơn vị tiên phong mang dịch vụ": "is not only an ideal dining destination but also a pioneer of the",
  "\"Lẩu Ngon Tại Nhà\"": "\"Delicious Hotpot at Home\"",
  "phục vụ tận nơi.": "service, delivered right to your door.",
  "Chúng tôi hiểu rằng một bữa lẩu ngon không chỉ nằm ở vị nước dùng đậm đà hay đĩa thịt bò tươi ngon, mà còn ở sự tiện lợi, thảnh thơi của thực khách. Đó là lý do Lẩu 4 Mùa chuẩn bị sẵn sàng trọn gói từ nước lẩu, đồ nhúng, rau nấm, nước chấm cho đến": "We understand that a great hotpot meal is not only about rich broth or fresh beef, but also about convenience and ease for our guests. That is why Lẩu 4 Mùa prepares everything in one package, from broth, dipping ingredients, vegetables and mushrooms to dipping sauces, and even",
  "cho mượn bếp, nồi và bát đĩa miễn phí": "free loan of stoves, pots and dishes",
  "Khám Phá Thực Đơn": "Explore the Menu",
  "Món lẩu tươi ngon": "Fresh, delicious hotpot",
  "Thịt bò nhúng lẩu": "Beef for hotpot",
  "Nồi lẩu thơm ngon": "A fragrant pot of hotpot",
  "Cam Kết Chất Lượng": "Quality Promise",
  "4 Điểm Khác Biệt Tại Lẩu 4 Mùa": "4 Things That Set Lẩu 4 Mùa Apart",
  "Nguyên Liệu Tươi Sạch": "Fresh, Clean Ingredients",
  "100% thịt bò Mỹ, hải sản và rau củ được nhập mới mỗi ngày, đảm bảo an toàn vệ sinh thực phẩm.": "100% US beef, with seafood and vegetables delivered fresh every day to ensure food safety and hygiene.",
  "Nước Dùng Độc Quyền": "Exclusive Broths",
  "Nước lẩu Thái Tomyum, Tứ Xuyên, Riêu Cua, Lẩu Nấm được ninh từ xương ống trong 12 tiếng chuẩn vị.": "Our Thai Tom Yum, Sichuan, Crab Paste and Mushroom broths are simmered from marrow bones for 12 hours for authentic flavor.",
  "Ship Nhanh 30-45 Phút": "Fast Delivery in 30-45 Minutes",
  "Đóng gói cẩn thận trong hộp chuyên dụng giữ nhiệt, giao tới tay khách hàng luôn nóng hổi.": "Carefully packed in insulated boxes and delivered piping hot.",
  "Mượn Nồi Bếp Miễn Phí": "Free Pot & Stove Loan",
  "Khách gọi lẩu tận nhà không cần lo thiếu đồ, quán hỗ trợ mượn trọn bộ bếp từ, nồi lẩu & bát đĩa.": "Home delivery guests never need to worry about missing equipment – we lend a full set of induction stove, hotpot and dishes.",
  "Khách Hàng Phục Vụ": "Customers Served",
  "Vị Nước Lẩu Đa Dạng": "Broth Flavors",
  "Đánh Giá Hài Lòng": "Satisfaction Rating",
  "Thời Gian Giao Hàng Trung Bình": "Average Delivery Time",
  "BẠN ĐANG THÈM MỘT NỒI LẨU NÓNG HOỔI?": "CRAVING A STEAMING HOT POT OF HOTPOT?",
  "Liên hệ ngay hotline để nhận tư vấn combo lẩu phù hợp nhất cho gia đình & bạn bè!": "Call our hotline now for advice on the best hotpot combo for your family & friends!",
  "Gọi Ship: 0898 879 669": "Call for Delivery: 0898 879 669",
  "Xem Menu Chi Tiết": "View Full Menu",
  "Đặt bàn - Nhà hàng": "Book a Table - Restaurant",
  "Vui lòng điền đầy đủ thông tin bên dưới. Các trường có dấu": "Please fill in all the information below. Fields marked with",
  "là bắt buộc.": "are required.",
  "Thông tin khách hàng": "Customer information",
  "Họ và tên": "Full name",
  "Nhập họ và tên": "Enter your full name",
  "Số điện thoại": "Phone number",
  "Ví dụ: 0912345678": "Example: 0912345678",
  "Số điện thoại gồm đúng 10 chữ số và bắt đầu bằng 0": "Phone number must be exactly 10 digits and start with 0",
  "Email (để nhận xác nhận đặt bàn)": "Email (to receive booking confirmation)",
  "Nhập email": "Enter your email",
  "Thông tin đặt bàn": "Booking details",
  "Ngày đặt": "Date",
  "Giờ đặt": "Time",
  "Nhà hàng nhận đặt bàn từ 10:00 đến 21:00": "Bookings are accepted from 10:00 to 21:00",
  "Số người": "Guests",
  "Số người từ 1 đến 20 (trên 20 người vui lòng gọi hotline)": "1 to 20 guests (for more than 20, please call the hotline)",
  "Khu vực": "Area",
  "-- Chọn khu vực --": "-- Select an area --",
  "Trong nhà": "Indoor",
  "Ngoài trời": "Outdoor",
  "Phòng riêng": "Private room",
  "Ghi chú": "Notes",
  "Ví dụ: Cần bàn gần cửa sổ...": "Example: A table by the window, please...",
  "Không điền ô này": "Leave this field empty",
  "Giờ đặt phải sau thời điểm hiện tại": "The time must be later than the current time",
  "Đang gửi...": "Sending...",
  "Liên hệ - Lẩu 4 Mùa - Thiên Đường Lẩu Ngon": "Contact - Lẩu 4 Mùa - Hotpot Paradise",
  "Liên hệ với chúng tôi": "Contact us",
  "Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào, hãy liên hệ với nhà hàng qua các thông tin dưới đây.": "If you have any questions or requests, please contact the restaurant using the details below.",
  "Thông tin nhà hàng": "Restaurant information",
  "Địa chỉ:": "Address:",
  "123 Đường ABC, Hà Nội": "123 ABC Street, Hanoi",
  "Số điện thoại:": "Phone:",
  "Giờ mở cửa:": "Opening hours:",
  "Gửi tin nhắn cho chúng tôi": "Send us a message",
  "Các trường có dấu": "Fields marked with",
  "Nhập email của bạn": "Enter your email",
  "Chủ đề": "Subject",
  "Vui lòng chọn một chủ đề": "Please choose a subject",
  "-- Chọn chủ đề --": "-- Select a subject --",
  "Góp ý": "Feedback",
  "Khiếu nại": "Complaint",
  "Khác": "Other",
  "Nội dung": "Message",
  "Nhập nội dung tin nhắn (ít nhất 10 ký tự)...": "Enter your message (at least 10 characters)...",
  "Gửi tin nhắn": "Send message",
  "Vị trí nhà hàng": "Restaurant location",
  "Lẩu 4 Mùa - Thiên Đường Lẩu Ngon": "Lẩu 4 Mùa - Hotpot Paradise",
  "Cảm ơn bạn! Nhà hàng đã nhận được tin nhắn và sẽ phản hồi sớm nhất có thể.": "Thank you! We have received your message and will reply as soon as possible.",
  "Đăng Nhập & Đăng Ký - Nhà Hàng": "Log in & Sign up - Restaurant",
  "Đăng Nhập": "Log in",
  "Đăng Ký": "Sign up",
  "Đăng Nhập Tài Khoản": "Log in to Your Account",
  "Tài khoản hoặc mật khẩu không chính xác!": "Incorrect account or password!",
  "Email hoặc Số điện thoại": "Email or phone number",
  "Nhập email hoặc SĐT...": "Enter email or phone number...",
  "Mật khẩu": "Password",
  "Nhập mật khẩu...": "Enter password...",
  "Ghi nhớ đăng nhập": "Remember me",
  "Quên mật khẩu?": "Forgot password?",
  "ĐĂNG NHẬP": "LOG IN",
  "Tạo Tài Khoản Mới": "Create a New Account",
  "Họ và Tên": "Full Name",
  "Nhập họ và tên...": "Enter your full name...",
  "Nhập email...": "Enter your email...",
  "Tối thiểu 8 ký tự gồm chữ và số...": "At least 8 characters, with letters and numbers...",
  "Xác nhận Mật khẩu": "Confirm Password",
  "Nhập lại mật khẩu...": "Re-enter password...",
  "TẠO TÀI KHOẢN": "CREATE ACCOUNT",
  "Vui lòng nhập Email hoặc Số điện thoại!": "Please enter your email or phone number!",
  "Vui lòng nhập Mật khẩu!": "Please enter your password!",
  "Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại!": "Incorrect account or password. Please try again!",
  "Họ và tên không được để trống!": "Full name cannot be empty!",
  "Email không được để trống!": "Email cannot be empty!",
  "Định dạng Email không hợp lệ!": "Invalid email format!",
  "Mật khẩu không được để trống!": "Password cannot be empty!",
  "Mật khẩu phải từ 8 ký tự trở lên, bao gồm cả chữ và số!": "Password must be at least 8 characters, including letters and numbers!",
  "Vui lòng xác nhận mật khẩu!": "Please confirm your password!",
  "Mật khẩu xác nhận không khớp!": "Passwords do not match!",
  "Đăng nhập thành công với quyền Admin!": "Logged in successfully as Admin!",
  "Đăng nhập thành công!": "Logged in successfully!",
  "Tạo tài khoản thành công! Bạn có thể đăng nhập ngay bây giờ.": "Account created successfully! You can log in now.",
  "Quên Mật Khẩu - Nhà Hàng": "Forgot Password - Restaurant",
  "Khôi Phục Mật Khẩu": "Reset Your Password",
  "Nhập email đăng ký của bạn. Hệ thống sẽ gửi liên kết đặt lại mật khẩu qua email.": "Enter the email you registered with. We will email you a link to reset your password.",
  "Email khôi phục": "Recovery email",
  "Nhập email của bạn...": "Enter your email...",
  "GỬI YÊU CẦU": "SEND REQUEST",
  "Quay lại Đăng nhập": "Back to Log in",
  "Yêu cầu đã được gửi! Vui lòng kiểm tra hộp thư email của bạn.": "Request sent! Please check your email inbox.",
  "Thực Đơn Lẩu & Nướng": "Hotpot & Grill Menu",
  "Giỏ Hàng Của Bạn": "Your Cart",
  "Tổng tiền:": "Total:",
  "XÁC NHẬN ĐẶT HÀNG": "CONFIRM ORDER",
  "THÊM VÀO GIỎ HÀNG": "ADD TO CART",
  "Vui lòng chọn:": "Please choose:",
  "Giỏ hàng của bạn đang trống": "Your cart is empty",
  "Giỏ hàng của bạn đang trống. Vui lòng chọn món trước khi đặt hàng!": "Your cart is empty. Please choose some dishes before ordering!",
  "Đã gửi đơn hàng thành công!": "Your order has been sent successfully!",
  "Lẩu Thái": "Thai Hotpot",
  "Lẩu Riêu Cua": "Crab Paste Hotpot",
  "Lẩu Kim Chi": "Kimchi Hotpot",
  "Lẩu Nấm": "Mushroom Hotpot",
  "Combo Nướng": "Grill Combos",
  "Thịt nhúng lẩu": "Hotpot Meats",
  "Đồ uống": "Drinks",
  "Lẩu Thái Bò": "Thai Beef Hotpot",
  "Lẩu Thái Thập Cẩm": "Thai Mixed Hotpot",
  "Lẩu Riêu Cua Bắp Bò Sườn Sụn": "Crab Paste Hotpot with Beef Shank & Rib Cartilage",
  "Lẩu Riêu Cua Bò": "Crab Paste Beef Hotpot",
  "Lẩu Kim Chi Bò": "Kimchi Beef Hotpot",
  "Lẩu Kim Chi Thập Cẩm": "Kimchi Mixed Hotpot",
  "Lẩu Nấm Bò": "Mushroom Beef Hotpot",
  "Lẩu Nấm Thập Cẩm": "Mushroom Mixed Hotpot",
  "Combo Bò Nướng": "Beef Grill Combo",
  "Combo Thịt Nướng Mê Ly": "Ultimate Grilled Meat Combo",
  "Ba chỉ bò": "Beef Belly",
  "Sụn Heo tươi": "Fresh Pork Cartilage",
  "Bắp bò tươi": "Fresh Beef Shank",
  "Coca Cola - lon 320ml": "Coca-Cola - 320ml can",
  "Combo Lẩu Cho 2-3 Người": "Hotpot combo for 2-3 people",
  "Combo Lẩu Cho 4-6 Người": "Hotpot combo for 4-6 people",
  "Nước lẩu thái chua cay": "Spicy and sour Thai broth",
  "Nước lẩu thái Tomyum": "Thai Tom Yum broth",
  "Nước lẩu kim chi chua cay": "Spicy and sour kimchi broth",
  "Nước lẩu nấm thanh ngọt": "Light and sweet mushroom broth",
  "Combo Nướng Bao Gồm:": "The grill combo includes:",
  "1 Đĩa Rau Ăn Nướng Tổng Hợp, Sốt Chấm Nướng Các Loại": "1 plate of assorted vegetables for grilling, assorted dipping sauces",
  "Nấm, Cà Tím, Đậu Bắp": "Mushrooms, eggplant, okra",
  "Set nướng đã được ướp sẵn.": "The grill set comes pre-marinated.",
  "Chế biến: Ngon nhất cho món nướng than hoa, hoặc nướng chảo, bếp điện,…": "Cooking: Best grilled over charcoal, or on a pan or electric stove,…",
  "Lưu ý: Trường hợp khách không muốn ướp sẵn và để sốt ướp riêng vui lòng báo trước giúp quán.": "Note: If you prefer the meat un-marinated, with the marinade served separately, please let us know in advance.",
  "Ba chỉ bò thái lát nhúng lẩu tươi ngon.": "Fresh, thinly sliced beef belly for hotpot dipping.",
  "Sụn heo tươi xắt miếng vừa ăn, giòn sần sật.": "Fresh pork cartilage cut into bite-size pieces, crunchy.",
  "Bắp bò hoa tươi ngon cắt lát nhúng lẩu.": "Fresh, sliced beef shank (flower cut) for hotpot dipping.",
  "Coca Cola lon 320ml mát lạnh giải khát.": "Chilled 320ml can of Coca-Cola for refreshment.",
  "Vui lòng điền vào ô này": "Please fill out this field",
  "Vui lòng nhập địa chỉ email hợp lệ": "Please enter a valid email address",
  "Vui lòng nhập đúng định dạng": "Please enter a valid format",
  "Nội dung chưa đủ độ dài tối thiểu": "This is shorter than the minimum length",
  "Giá trị không hợp lệ": "Invalid value"
};
  var ING = {
  "nước lẩu thái tomyum": "Thai tom yum broth",
  "bắp bò": "beef shank",
  "ba chỉ bò": "beef belly",
  "gầu hoa bò": "marbled beef brisket",
  "đậu hũ phomai": "cheese tofu",
  "viên tôm hùm": "lobster balls",
  "nấm kim": "enoki mushrooms",
  "nấm đùi gà": "king oyster mushrooms",
  "mỳ tôm": "instant noodles",
  "rau muống": "water spinach",
  "cải ngọt": "choy sum",
  "rau cần": "celery",
  "cải thảo": "napa cabbage",
  "ngô ngọt": "sweet corn",
  "đậu phụ": "tofu",
  "váng đậu": "tofu skin",
  "gia vị lẩu": "hotpot seasoning",
  "nước lẩu": "broth",
  "bò mỹ": "US beef",
  "sườn sụn": "rib cartilage",
  "tôm": "shrimp",
  "mực": "squid",
  "cá tầm": "sturgeon",
  "đĩa rau hỗn hợp": "mixed vegetable platter",
  "nước lẩu riêu cua": "crab paste broth",
  "giò tai": "pork ear terrine",
  "nấm đùi": "king oyster mushrooms",
  "bún( hoặc mỳ tôm)": "rice vermicelli (or instant noodles)",
  "rau hỗn hợp": "mixed vegetables",
  "đậu phụ chiên": "fried tofu",
  "riêu cua": "crab paste",
  "ba chỉ bò mỹ": "US beef belly",
  "gầu bò": "beef brisket",
  "nước lẩu kim chi": "kimchi broth",
  "đậu hũ pm": "cheese tofu",
  "tôm sú": "tiger prawns",
  "nấm hải sản": "beech mushrooms",
  "nấm hương": "shiitake mushrooms",
  "bún hoặc mỳ tôm": "rice vermicelli or instant noodles",
  "sụn": "cartilage",
  "gà ta": "free-range chicken"
};
  var GRILL = {
  "Ba Chỉ Bò": "Beef belly",
  "Dẻ Sườn Bò": "Beef short ribs",
  "Thăn Bò": "Beef tenderloin",
  "Lõi Vai Bò": "Beef chuck tender",
  "Kim Chi": "Kimchi",
  "Bò Aukobe": "Aukobe beef",
  "Ba Chỉ Heo": "Pork belly",
  "Má Đào Heo": "Pork jowl",
  "Nầm Heo": "Pork skirt"
};

  var lang = 'vi';

  function norm(s) { return String(s).replace(/[\s\u00a0]+/g, ' ').trim(); }

  // Các câu có phần thay đổi (số, mã đặt bàn, danh sách nguyên liệu...)
  var RULES = [
    [/^Set lẩu bao gồm:\s*(.+)$/, function (m) {
      var items = m[1].split(/\s+–\s+/).map(function (x) {
        x = x.trim();
        return ING[x.toLowerCase()] || x;
      });
      return 'The hotpot set includes: ' + items.join(' – ');
    }],
    [/^Thời gian chuẩn bị:\s*(.+?)\s*phút$/, function (m) { return 'Preparation time: ' + m[1] + ' minutes'; }],
    [/^Thời gian vận chuyển:\s*(.+?)\s*phút$/, function (m) { return 'Delivery time: ' + m[1] + ' minutes'; }],
    [/^(.+?):\s*(\d+\s*g)$/, function (m) { return GRILL[m[1]] ? GRILL[m[1]] + ': ' + m[2] : null; }],
    [/^Đặt bàn thành công! Mã đặt bàn của bạn là (\S+)\. Nhà hàng sẽ gọi xác nhận qua số điện thoại bạn đã cung cấp\.$/,
      function (m) {
        return 'Booking successful! Your booking code is ' + m[1] +
          '. The restaurant will call you to confirm using the phone number you provided.';
      }]
  ];

  // Dịch một đoạn chữ (đã bỏ khoảng trắng đầu/cuối). Trả về null nếu không có bản dịch.
  function translateCore(core) {
    var k = norm(core);
    if (!k) return null;
    if (Object.prototype.hasOwnProperty.call(EN, k)) return EN[k];

    // Bỏ biểu tượng/emoji ở đầu dòng rồi dịch phần chữ phía sau
    var p = /^([^A-Za-zÀ-ỹ0-9"“(]+)([\s\S]+)$/.exec(k);
    if (p) {
      var rp = translateCore(p[2]);
      if (rp !== null) return p[1] + rp;
    }
    for (var i = 0; i < RULES.length; i++) {
      var m = RULES[i][0].exec(k);
      if (m) {
        var r = RULES[i][1](m);
        if (r !== null) return r;
      }
    }
    // Chữ nằm trong ngoặc đơn, ví dụ "(Combo Lẩu Cho 2-3 Người)"
    var par = /^\((.+)\)$/.exec(k);
    if (par) {
      var rq = translateCore(par[1]);
      if (rq !== null) return '(' + rq + ')';
    }
    return null;
  }

  function translateText(raw) {
    var m = /^(\s*)([\s\S]*?)(\s*)$/.exec(raw);
    if (!m[2]) return null;
    var r = translateCore(m[2]);
    return r === null ? null : m[1] + r + m[3];
  }

  // Hàm dùng trong JS của trang: alert(t('Câu tiếng Việt'))
  function t(vi) {
    if (lang !== 'en') return vi;
    var r = translateCore(String(vi));
    return r === null ? vi : r;
  }

  root.t = t;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translateCore: translateCore, translateText: translateText, EN: EN };
  }
  if (typeof document === 'undefined') return;

  // ===================== Phần chạy trên trình duyệt =====================
  var ATTRS = ['placeholder', 'title', 'alt', 'aria-label'];
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1 };
  var textOrig = new WeakMap(), textLast = new WeakMap();
  var attrOrig = new WeakMap();
  var titleOrig = null;
  var observer = null;

  function applyText(n) {
    var cur = n.nodeValue;
    var o = textOrig.get(n);
    if (o === undefined || (textLast.has(n) && cur !== textLast.get(n))) {
      if (!/\S/.test(cur)) return;
      o = cur; textOrig.set(n, o);        // chữ gốc (tiếng Việt) do trang/JS tạo ra
    }
    var out = lang === 'en' ? translateText(o) : null;
    var next = out === null ? o : out;
    if (next !== cur) n.nodeValue = next;
    textLast.set(n, next);
  }

  function applyAttrs(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i];
      if (!el.hasAttribute(a)) continue;
      var rec = attrOrig.get(el);
      if (!rec) { rec = {}; attrOrig.set(el, rec); }
      var cur = el.getAttribute(a);
      var r = rec[a];
      if (!r || cur !== r.last) { r = rec[a] = { orig: cur, last: cur }; }
      var out = lang === 'en' ? translateText(r.orig) : null;
      var next = out === null ? r.orig : out;
      if (next !== cur) el.setAttribute(a, next);
      r.last = next;
    }
  }

  function walk(node) {
    if (node.nodeType === 3) { applyText(node); return; }
    if (node.nodeType !== 1 || node.hasAttribute('data-no-i18n')) return;
    applyAttrs(node);                      // placeholder/title/alt/aria-label (kể cả của <textarea>)
    if (SKIP[node.tagName]) return;        // không dịch chữ bên trong script/style/textarea
    for (var c = node.firstChild; c; c = c.nextSibling) walk(c);
  }

  function applyAll() {
    if (observer) observer.disconnect();
    walk(document.body);
    if (titleOrig === null) titleOrig = document.title;
    var tt = lang === 'en' ? translateText(titleOrig) : null;
    document.title = tt === null ? titleOrig : tt;
    document.documentElement.lang = lang;
    var btns = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute('data-lang') === lang;
      btns[i].classList.toggle('active', on);
      btns[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
    startObserver();
  }

  function startObserver() {
    if (!observer) {
      observer = new MutationObserver(function (records) {
        observer.disconnect();
        records.forEach(function (r) {
          if (r.type === 'childList') {
            for (var i = 0; i < r.addedNodes.length; i++) walk(r.addedNodes[i]);
          } else if (r.type === 'characterData') {
            applyText(r.target);
          } else if (r.type === 'attributes') {
            applyAttrs(r.target);
          }
        });
        observer.observe(document.body, OPTS);
      });
    }
    observer.observe(document.body, OPTS);
  }
  var OPTS = { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS };

  function setLang(l) {
    lang = l === 'en' ? 'en' : 'vi';
    try { localStorage.setItem('lang', lang); } catch (e) {}
    applyAll();
  }
  root.setLang = setLang;
  root.getLang = function () { return lang; };

  function injectStyle() {
    var s = document.createElement('style');
    s.textContent =
      '.lang-switch [data-lang].active{background:#ffc107!important;border-color:#ffc107!important;color:#000!important}' +
      '.lang-float{position:fixed;top:10px;right:10px;z-index:99999;display:flex;border-radius:6px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.25)}' +
      '.lang-float button{border:0;background:#fff;color:#333;padding:6px 12px;font:600 13px Arial,sans-serif;cursor:pointer}' +
      '.lang-float button+button{border-left:1px solid #ddd}';
    document.head.appendChild(s);
  }

  function ensureSwitch() {
    if (document.querySelector('[data-lang]')) return;
    var box = document.createElement('div');
    box.className = 'lang-switch lang-float';
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Chọn ngôn ngữ / Language');
    box.innerHTML = '<button type="button" data-lang="vi">VI</button><button type="button" data-lang="en">EN</button>';
    document.body.appendChild(box);
  }

  function init() {
    injectStyle();
    ensureSwitch();
    document.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-lang]') : null;
      if (b) setLang(b.getAttribute('data-lang'));
    });
    var saved = 'vi';
    try { saved = localStorage.getItem('lang') || 'vi'; } catch (e) {}
    lang = saved === 'en' ? 'en' : 'vi';
    applyAll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})(typeof window !== 'undefined' ? window : this);
