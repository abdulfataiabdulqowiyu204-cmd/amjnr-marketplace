const products = [
  {
    name: "iPhone 13",
    category: "Phones & Tablets",
    price: "₦650,000",
    oldPrice: "₦720,000",
    discount: "10% OFF",
    image: "assets/products/iphone-13.png",
    rating: "4.8",
    seller: "Amjnr Store",
    stock: "In Stock"
  },
  {
    name: "Samsung Galaxy A15",
    category: "Phones & Tablets",
    price: "₦210,000",
    oldPrice: "₦240,000",
    discount: "13% OFF",
    image: "assets/products/samsung-a15.png",
    rating: "4.7",
    seller: "Tech Hub NG",
    stock: "In Stock"
  },
  {
    name: "Premium Women's Fashion Dress",
    category: "Fashion",
    price: "₦35,000",
    oldPrice: "₦45,000",
    discount: "22% OFF",
    image: "assets/products/fashion-dress.png",
    rating: "4.6",
    seller: "Fashion House",
    stock: "In Stock"
  },
  {
    name: "HP Core i5 Laptop",
    category: "Electronics",
    price: "₦450,000",
    oldPrice: "₦500,000",
    discount: "10% OFF",
    image: "assets/products/hp-laptop.png",
    rating: "4.8",
    seller: "Computer World",
    stock: "In Stock"
  },
  {
    name: "Professional Kitchen Blender",
    category: "Home & Kitchen",
    price: "₦38,000",
    oldPrice: "₦45,000",
    discount: "16% OFF",
    image: "assets/products/blender.png",
    rating: "4.5",
    seller: "Home Store",
    stock: "In Stock"
  },
  {
    name: "Complete Beauty Makeup Set",
    category: "Beauty",
    price: "₦25,000",
    oldPrice: "₦32,000",
    discount: "22% OFF",
    image: "assets/products/makeup-set.png",
    rating: "4.7",
    seller: "Beauty Shop",
    stock: "In Stock"
  },
  {
    name: "Premium Grocery Food Basket",
    category: "Groceries",
    price: "₦30,000",
    oldPrice: "₦35,000",
    discount: "14% OFF",
    image: "assets/products/grocery-basket.png",
    rating: "4.6",
    seller: "Fresh Market",
    stock: "In Stock"
  }
];
  
    

let cartCount = 0;
let cartItems = [];
function displayProducts(list) {
  const container = document.getElementById("products");

  if (!container) {
    console.error("Products container not found");
    return;
  }

  if (!Array.isArray(list) || list.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  container.innerHTML = list.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.name}"
        >
      </div>

      <div class="product-info">
        <small>${product.category || ""}</small>
        <h3>${product.name || "Product"}</h3>
        <p class="price">${product.price || ""}</p>
        <del>${product.oldPrice || ""}</del>

        <p>
          ⭐ ${product.rating || "4.8"} ·
          ${product.seller || "Amjnr Store"}
        </p>

        <button
          class="add-cart"
          data-product="${product.name}"
        >
          Add to Cart
        </button>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", () => {
      const product = products.find(
        item => item.name === button.dataset.product
      );

      if (product) {
        cartItems.push(product);
        cartCount = cartItems.length;
        button.textContent = "Added ✓";
        updateCart();
      }
    });
  });
}
function updateCart() {
    const cart = document.querySelector(".nav-actions");
    if (!cart) return;

    const buttons = cart.querySelectorAll("button");

    if (buttons.length > 1) {
        const cartButton = buttons[buttons.length - 1];

        cartButton.textContent = `🛒 ${cartCount}`;

        cartButton.onclick = () => {
            if (cartItems.length === 0) {
                alert("🛒 Your Cart is empty.");
                return;
            }

            const items = cartItems
                .map((item, index) => `${index + 1}. ${item.name} — ${item.price}`)
                .join("\n");

            alert(
                `🛒 YOUR CART\n\n${items}\n\nTotal items: ${cartItems.length}`
            );
        };
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
