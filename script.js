$(document).ready(function() {
    // Xác định phần giỏ hàng
    var cart = $('#cart');
    var cartList = $('#cartList');
    var checkout = $('#checkout');
    var searchInput = $('#searchProduct');
    var searchButton = $('#searchButton');

    var productListData = [
        { name: "Chocolate Oreo", category: "Chocolate", image: /code/image/chocolate-duong-den.png},
        { name: "Matcha Oreo", category: "Matcha" },
        // ... (thêm các sản phẩm khác)
    ];

    // Hàm tìm kiếm sản phẩm
    function searchProducts(keyword) {
        keyword = keyword.toLowerCase();
        var filteredProducts = productListData.filter(function(product) {
            return product.name.toLowerCase().includes(keyword) || product.category.toLowerCase().includes(keyword);
        });
        displayProducts(filteredProducts);
    }

    // Hàm hiển thị danh sách sản phẩm
    function displayProducts(products) {
        var productList = $('#productList');
        productList.empty(); // Xóa nội dung hiện tại

        products.forEach(function(product) {
            // Tạo phần tử HTML cho sản phẩm và thêm vào productList
            var productItem = $('<div class="product">');
            productItem.append('<img src="' + product.image + '" alt="' + product.name + '">'); // Thêm ảnh
            productItem.append('<h2>' + product.name + '</h2>');
            // ... (thêm các thông tin khác của sản phẩm)

            productList.append(productItem);
        });
    }

    // Xử lý sự kiện khi nhấn nút tìm kiếm
    $('#searchButton').click(function() {
        var searchTerm = $('#searchProduct').val();
        searchProducts(searchTerm);
    });

    searchButton.on('click', function() {
        var searchTerm = searchInput.val().toLowerCase();

        // Thực hiện tìm kiếm sản phẩm dựa trên từ khóa (searchTerm)
        // Có thể hiển thị kết quả tìm kiếm hoặc thực hiện các hành động khác tùy thuộc vào yêu cầu của bạn
        console.log('Đã tìm kiếm sản phẩm:', searchTerm);
    });

    // Lắng nghe sự kiện nhấn nút thanh toán
    document.getElementById("paymentButton").addEventListener("click", function() {
        // Chuyển hướng sang trang payment.html
        window.location.href = "payment.html";
    });

    // Hiển thị phần giỏ hàng khi click
    $('#paymentButton').on('click', function() {
        cart.toggleClass('showCart');
        var cartItems = [];
        $('#cartList li').each(function() {
            cartItems.push($(this).text());
        });
        // Chuyển hướng sang trang thanh toán và truyền thông tin giỏ hàng qua URL
        window.location.href = 'payment.html?items=' + encodeURIComponent(JSON.stringify(cartItems));
    });


    function showPaymentPage(cartItems) {
        // Truyền thông tin giỏ hàng vào trang thanh toán
        $.ajax({
            url: 'payment.html',  // Đổi đường dẫn này thành đúng đường dẫn của trang thanh toán
            type: 'GET',
            success: function(response) {
                // Hiển thị nội dung trang thanh toán trong một cửa sổ modal hoặc div
                var paymentPage = $(response);
    
                // Hiển thị thông tin đơn hàng trong trang thanh toán
                var orderInfo = paymentPage.find('#orderInfo');
                for (var i = 0; i < cartItems.length; i++) {
                    orderInfo.append($('<li>').text(cartItems[i]));
                }
    
                // Hiển thị trang thanh toán
                $('#paymentModal .modal-body').html(paymentPage);
                $('#paymentModal').modal('show');
            },
            error: function(error) {
                console.error('Error loading payment page:', error);
                // Xử lý lỗi nếu cần thiết
            }
        });
    }

    // Hàm hiển thị trang cảm ơn
    function showThankYouPage() {
        // Tải trang cảm ơn hoặc hiển thị thông báo thanh toán thành công
        // Ví dụ: Hiển thị thông báo trong một cửa sổ modal
        $('#thankYouModal').modal('show');
    }

    // Thêm sản phẩm vào giỏ hàng (ví dụ)
    $('.order-btn').on('click', function() {
        var productContainer = $(this).closest('.product-item');
        var productName = productContainer.find('h2').text();
        var quantity = parseInt(productContainer.find('.quantity').val(), 10);
        var sizePriceText = productContainer.find('.size option:selected').text();
        var price = parseFloat(sizePriceText.match(/\d+/)); // Lấy số từ chuỗi giá

        // Thêm sản phẩm vào danh sách giỏ hàng
        var newItem = $('<li>').text(productName + ' x' + quantity + ' - ' + price * quantity + ' đ');
        cartList.append(newItem);

        // Cập nhật tổng số sản phẩm và tổng cần thanh toán
        updateCartSummary();
    });

    // Xóa tất cả sản phẩm khỏi giỏ hàng (ví dụ)
    $('.review-btn').on('click', function() {
        cartList.empty();
        updateCartSummary();
    });

    // Cập nhật tổng số sản phẩm và tổng cần thanh toán
    function calculateTotalAmount() {
        var total = 0;
        cartList.children().each(function() {
            var itemText = $(this).text();
            var itemTotal = parseFloat(itemText.match(/\d+/)); // Lấy số từ chuỗi tổng giá
            total += itemTotal;
        });
        return total;
    }

    // Ẩn ban đầu tất cả các phần đánh giá
    $(".rating").hide();
    $(".review-textarea").hide();
    $(".submit-review-btn").hide();

// Xử lý khi người dùng gửi đánh giá
$(".submit-review-btn").on("click", function() {
    var productContainer = $(this).closest('.product');
    console.log(productContainer); // Kiểm tra xem có đúng không
    var reviewText = productContainer.find('.review-textarea').val();
    // Thực hiện xử lý đánh giá (gửi lên máy chủ, lưu vào cơ sở dữ liệu, vv.)
    // Ở đây bạn có thể thêm mã để xử lý đánh giá theo ý của mình.

    // Sau khi xử lý, có thể ẩn phần đánh giá đi
    productContainer.find('.review-thank-you').show();
    productContainer.find('.rating').hide();
    productContainer.find('.review-textarea').hide();
    productContainer.find('.submit-review-btn').hide();
});


    // Xử lý khi người dùng gửi đánh giá
    $(".submit-review-btn").on("click", function() {
        var productContainer = $(this).closest('.product');
        console.log(productContainer); // Kiểm tra xem có đúng không
        var reviewText = productContainer.find('.review-textarea').val();
        // Thực hiện xử lý đánh giá (gửi lên máy chủ, lưu vào cơ sở dữ liệu, vv.)
        // Ở đây bạn có thể thêm mã để xử lý đánh giá theo ý của mình.

        // Sau khi xử lý, có thể ẩn phần đánh giá đi
        productContainer.find('.review-thank-you').show();
        productContainer.find('.rating').hide();
        productContainer.find('.review-textarea').hide();
        productContainer.find('.submit-review-btn').hide();
    });
});


