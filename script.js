
$(document).ready(function () {
  $("#searchButton").on("click", function () {
    var searchTerm = $("#searchProduct").val().toLowerCase();

    // Ẩn tất cả sản phẩm
    $(".product-item").hide();

    // Lặp qua từng sản phẩm và kiểm tra xem nó có chứa từ khóa tìm kiếm không
    $(".product-item").each(function () {
        var productName = $(this).find("h2").text().toLowerCase();
        if (productName.includes(searchTerm)) {
            // Nếu sản phẩm chứa từ khóa tìm kiếm, hiển thị nó
            $(this).show();
        }
    });
  });
  // Danh sách sản phẩm đề xuất
  var suggestedProducts = [
      "Chocolate Oreo",
      "Matcha Oreo",
      "Trà Ổi Hồng",
      // ... (thêm các sản phẩm khác)
      "Yogurt xoài",
      "Yogurt dâu"
  ];
  
    // Sự kiện khi người dùng nhập từ khóa tìm kiếm
  $("#searchProduct").on("input", function () {
      var searchTerm = $(this).val().toLowerCase();
      var suggestions = [];
  
      // Lọc sản phẩm dựa trên từ khóa tìm kiếm
      for (var i = 0; i < suggestedProducts.length; i++) {
        if (suggestedProducts[i].toLowerCase().includes(searchTerm)) {
          suggestions.push(suggestedProducts[i]);
        }
      }
  
      // Hiển thị gợi ý
      showSuggestions(suggestions);
  });
  
    // Hàm hiển thị gợi ý
  function showSuggestions(suggestions) {
      var searchResults = $("#searchResults");
      searchResults.empty();
  
      // Hiển thị gợi ý trong một danh sách
      for (var i = 0; i < suggestions.length; i++) {
        var listItem = $("<li>").text(suggestions[i]);
        searchResults.append(listItem);
      }
  
      // Hiển thị danh sách gợi ý
      if (suggestions.length > 0) {
        searchResults.show();
      } else {
        searchResults.hide();
      }
  }
  
    // Sự kiện khi người dùng chọn một gợi ý
  $("#searchResults").on("click", "li", function () {
      var selectedProduct = $(this).text();
      $("#searchProduct").val(selectedProduct);
      $("#searchResults").hide();
  });

  function addToCart(productId, productName, size, price, quantity) {
    // Lấy danh sách sản phẩm hiện tại từ localStorage hoặc tạo một mảng trống nếu chưa có
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa dựa trên productId và size
    const existingItemIndex = cartItems.findIndex(item => item.productId === productId && item.size === size);

    if (existingItemIndex !== -1) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
        cartItems[existingItemIndex].quantity += quantity;
    } else {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm vào
        cartItems.push({
            productId,
            productName,
            size,
            price,
            quantity
        });
    }

    // Lưu danh sách sản phẩm đã cập nhật vào localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

// Bộ lắng nghe sự kiện cho nút "Thêm vào giỏ hàng"
  document.querySelectorAll('.order-btn').forEach((button, index) => {
      button.addEventListener('click', () => {
          const product = document.querySelectorAll('.product')[index];
          const productId = product.id;
          const productName = product.querySelector('h2').innerText;
          const size = product.querySelector('.size').value;
          const price = parseFloat(product.querySelector('.size').options[product.querySelector('.size').selectedIndex].innerText.replace(/\D/g, ''));
          const quantity = parseInt(product.querySelector('.quantity').value);

          // Thêm sản phẩm vào giỏ hàng
          addToCart(productId, productName, size, price, quantity);
      });
  });

  // Thêm hàm showNotification vào mã JavaScript của bạn
function showNotification(message) {
  // Tìm phần tử thông báo theo ID
  var notification = $("#notification");

  // Đặt nội dung thông báo
  notification.text(message);

  // Hiển thị thông báo
  notification.fadeIn().delay(2000).fadeOut(); // Hiển thị trong 2 giây, sau đó ẩn đi
}

// Bộ lắng nghe sự kiện cho nút "Thêm vào giỏ hàng"
  $(".order-btn").on("click", function () {
    const product = $(this).closest(".product-item");
    const productName = product.find("h2").text();

    // Gọi hàm showNotification với nội dung thông báo
    showNotification(productName + " đã được thêm vào giỏ hàng!");
  });

  // Hàm để hiển thị phần viết đánh giá khi nhấn nút
  $(".review-btn").on("click", function () {
    var product = $(this).closest(".product-item");
    var reviewTextarea = product.find(".review-textarea");
    var submitReviewBtn = product.find(".submit-review-btn");
    var thankYouMessage = product.find(".review-thank-you");

    reviewTextarea.show();
    submitReviewBtn.show();
    thankYouMessage.hide();
  });

  // Hàm để gửi đánh giá và hiển thị thông báo cảm ơn
  $(".submit-review-btn").on("click", function () {
    var product = $(this).closest(".product-item");
    var reviewTextarea = product.find(".review-textarea");
    var submitReviewBtn = product.find(".submit-review-btn");
    var thankYouMessage = product.find(".review-thank-you");

    if (reviewTextarea.val().trim() !== "") {
      thankYouMessage.show();
      reviewTextarea.hide();
      submitReviewBtn.hide(); // Ẩn nút Gửi Đánh Giá
    } else {
      alert("Vui lòng viết đánh giá trước khi gửi.");
    }
  });

  function redirectToPayment() {
    window.location.href = 'payment.html';
  }
  
  function removeItem(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
  }
  
  // Gọi hàm để hiển thị sản phẩm ban đầu
  renderCart();

  document.addEventListener("DOMContentLoaded", function () {
    var logoContainer = document.getElementById("logo-container");
    var cartContainer = document.getElementById("cart");

    var fixedClass = "fixed"; // Tên lớp CSS cho vị trí cố định

  });
});