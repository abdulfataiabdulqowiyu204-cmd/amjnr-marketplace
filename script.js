const products = [
  {
    name: "iPhone 13",
    category: "Phones & Tablets",
    price: "₦650,000",
    oldPrice: "₦720,000",
    icon: "📱",
    seller: "Amjnr Store"
  },
  {
    name: "Samsung Galaxy A15",
    category: "Phones & Tablets",
    price: "₦210,000",
    oldPrice: "₦240,000",
    icon: "📱",
    seller: "Tech Hub NG"
  },
  {
    name: "Women's Fashion Dress",
    category: "Fashion",
    price: "₦35,000",
    oldPrice: "₦45,000",
    icon: "👗",
    seller: "Fashion House"
  },
  {
    name: "HP Laptop",
    category: "Electronics",
    price: "₦450,000",
    oldPrice: "₦500,000",
    icon: "💻",
    seller: "Computer World"
  },
  {
    name: "Kitchen Blender",
    category: "Home & Kitchen",
    price: "₦38,000",
    oldPrice: "₦45,000",
    icon: "🏠",
    seller: "Home Store"
  },
  {
    name: "Beauty Makeup Set",
    category: "Beauty",
    price: "₦25,000",
    oldPrice: "₦32,000",
    icon: "💄",
    seller: "Beauty Shop"
  },
  {
    name: "Grocery Food Basket",
    category: "Groceries",
    price: "₦30,000",
    oldPrice: "₦35,000",
    icon: "🛒",
    seller: "Fresh Market"
  }
];

let cartCount = 0;

function displayProducts(list) {
  const container = document.getElementById("products");
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  container.innerHTML = list.map(product => `
    <article class="product-card">
      <div class="product-image">${product.icon}</div>
      <div class="product-info">
        <small>${product.category}</small>
        <h3>${product.name}</h3>
        <p class="price">${product.price}</p>
        <del>${product.oldPrice}</del>
        <p>⭐ 4.8 · ${product.seller}</p>
        <button class="add-cart"
          data-product="${product.name}">
          Add to Cart
        </button>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", () => {
      cartCount++;
      updateCart();
      button.textContent = "Added ✓";
    });
  });
}

function updateCart() {
  const cart = document.querySelector(".nav-actions");
  if (!cart) return;

  const buttons = cart.querySelectorAll("button");
  if (buttons.length > 1) {
    buttons[buttons.length - 1].textContent = `🛒 ${cartCount}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayProducts(products);

  document.querySelectorAll("[data-cat]").forEach(button => {
    button.addEventListener("click", () => {
      const category = button.dataset.cat;
      displayProducts(
        products.filter(product => product.category === category)
      );

      const productSection = document.getElementById("products");
      if (productSection) {
        productSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  const searchButton = document.getElementById("searchBtn");

  if (searchButton) {
    searchButton.addEventListener("click", () => {
      const query = prompt("What product are you looking for?");

      if (!query) return;

      const results = products.filter(product =>
        `${product.name} ${product.category} ${product.seller}`
          .toLowerCase()
          .includes(query.toLowerCase())
      );

      displayProducts(results);

      document.getElementById("products")?.scrollIntoView({
        behavior: "smooth"
      });
    });
  }

  const sellerButton = document.getElementById("sellerBtn");

  if (sellerButton) {
    sellerButton.addEventListener("click", () => {
      alert(
        "Seller registration will be available in the next Amjnr marketplace update."
      );
    });
  }
});
