// script.js

$(document).ready(function () {
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

    // Hàm để thêm sản phẩm vào giỏ hàng
    $(".order-btn").on("click", function () {
      var product = $(this).closest(".product-item");
      var productName = product.find("h2").text();
      var quantity = parseInt(product.find(".quantity").val());
      var size = product.find(".size").val();
      var price = (size === "M") ? 22000 : 27000;
      var total = quantity * price;
  
      addToCart(productName, quantity, total);
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
  
    // Hàm xử lý khi nhấn nút thanh toán
    $("#paymentButton").on("click", function () {
      // Chuyển hướng đến trang payment.html
      window.location.href = "payment.html";
    });
  
    // Hàm hỗ trợ để thêm sản phẩm vào giỏ hàng
    function addToCart(productName, quantity, total) {
      var cartList = $("#cartList");
      var cartItem = $("<li>").text(`${productName} - Số lượng: ${quantity} - Tổng cộng: ${total} đ`);
      cartList.append(cartItem);
  
      // Cập nhật tổng cộng giỏ hàng
      updateCartSummary();
    }
  
    // Hàm hỗ trợ để cập nhật tổng cộng giỏ hàng
    function updateCartSummary() {
      var cartList = $("#cartList");
      var cartSummary = $("#cartSummary");
      var totalAmount = 0;
  
      // Tính tổng cộng
      cartList.find("li").each(function () {
        var text = $(this).text();
        var total = parseInt(text.match(/Tổng cộng: (\d+)/)[1]);
        totalAmount += total;
      });
  
      // Cập nhật thông tin tổng cộng giỏ hàng
      cartSummary.text(`Tổng cộng: ${totalAmount} đ`);
    }
  });

document.addEventListener("DOMContentLoaded", function () {
    var logoContainer = document.getElementById("logo-container");
    var cartContainer = document.getElementById("cart");
  
    var fixedClass = "fixed"; // Tên lớp CSS cho vị trí cố định
  
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        // Thêm lớp cố định khi người dùng cuộn trang xuống
        logoContainer.classList.add(fixedClass);
        cartContainer.classList.add(fixedClass);
      } else {
        // Xóa lớp cố định khi người dùng cuộn trang lên đầu
        logoContainer.classList.remove(fixedClass);
        cartContainer.classList.remove(fixedClass);
      }
    });
  });