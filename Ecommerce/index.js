$(document).ready(function () {
  const apiUrl = "https://fakestoreapi.com/products";
  let cart = [];

  // Load all products by default
  fetchProducts("all");

  // 🔹 Fetch products by category
  function fetchProducts(category) {
    let url = apiUrl;
    if (category !== "all") {
      url = `${apiUrl}/category/${category}`;
    }
    $.get(url, function (products) {
      renderProducts(products);
    });
  }

  // 🔹 Render products
  function renderProducts(products) {
    $("#product-list").empty();
    products.forEach(product => {
      const productHTML = `
        <div class="col-md-4 mb-4 product-card"
             data-title="${product.title.toLowerCase()}"
             data-category="${product.category}">
          <div class="card h-100 shadow-sm">
            <img src="${product.image}" class="card-img-top" style="height:200px; object-fit:cover;">
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.description}</p>
              <div class="d-flex justify-content-between align-items-center">
                <span class="fw-bold text-primary">$${product.price}</span>
                <button class="btn btn-success add-to-cart"
                  data-id="${product.id}"
                  data-title="${product.title}"
                  data-price="${product.price}"
                  data-image="${product.image}">
                  Add to Cart
                </button>
                <button class="btn btn-info view-product"
                  data-id="${product.id}"
                  data-title="${product.title}"
                  data-price="${product.price}"
                  data-image="${product.image}"
                  data-description="${product.description}">
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      $("#product-list").append(productHTML);
    });
  }

  // 🔹 Dropdown category change
  $("#category-dropdown").on("change", function () {
    const category = $(this).val();
    fetchProducts(category);
  });

  // 🛒 Add to cart
  $(document).on("click", ".add-to-cart", function () {
    const id = $(this).data("id");
    const title = $(this).data("title");
    const price = parseFloat($(this).data("price"));
    const image = $(this).data("image");

    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id, title, price, image, qty: 1 });
    }

    updateCart();
  });

  // 🛒 Update cart
  function updateCart() {
    $("#cart-items").empty();
    let total = 0;

    cart.forEach(item => {
      total += item.price * item.qty;
      $("#cart-items").append(`
        <div class="d-flex align-items-center mb-2 border p-2 rounded">
          <img src="${item.image}" width="50" height="50" class="me-2">
          <div class="me-auto">
            <p class="m-0 fw-bold">${item.title}</p>
            <small>Qty: ${item.qty} × $${item.price}</small>
          </div>
          <p class="m-0 fw-bold">$${(item.price * item.qty).toFixed(2)}</p>
        </div>
      `);
    });

    $("#cart-total").text(total.toFixed(2));
    $("#cart-count").text(cart.length);
  }

  // 🔍 Search
  $("#search-input").on("keyup", function () {
    const query = $(this).val().toLowerCase();
    $(".product-card").each(function () {
      const title = $(this).data("title");
      if (title.includes(query)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
  // 🔹 Navbar dropdown click
$(document).on("click", ".category-link", function (e) {
  e.preventDefault();
  const category = $(this).data("category");
  fetchProducts(category);
});


  // 🔹 View product details
  $(document).on("click", ".view-product", function () {
    const id = $(this).data("id");
    const title = $(this).data("title");
    const price = parseFloat($(this).data("price"));
    const image = $(this).data("image");
    const description = $(this).data("description");

    const productHTML = `
      <div class="card mb-4 mx-auto" style="max-width: 500px;">
        <img src="${image}" class="card-img-top" style="height:250px; object-fit:cover;">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
          <span class="fw-bold text-primary">$${price}</span>
          <div class="mt-3">
            <button class="btn btn-success add-to-cart"
              data-id="${id}"
              data-title="${title}"
              data-price="${price}"
              data-image="${image}">
              Add to Cart
            </button>
            <button class="btn btn-secondary" id="back-to-products">Back</button>
          </div>
        </div>
      </div>
    `;

    $("#product-details").html(productHTML);
    $("#product-list").hide();
    $("#product-details").show();
  });

  // 🔙 Back to products
  $(document).on("click", "#back-to-products", function () {
    $("#product-details").hide();
    $("#product-list").show();
  });
});
