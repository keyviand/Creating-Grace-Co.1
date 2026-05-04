const productGrid = document.getElementById("productGrid");
const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");

let products = [];
let siteSettings = {};
let businessEmail = "creatinggrace@example.com";

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("menuButton").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});

async function loadSiteSettings() {
  try {
    const response = await fetch(`site-settings.json?cache=${Date.now()}`);
    siteSettings = await response.json();
    businessEmail = siteSettings.email || businessEmail;

    document.querySelectorAll("[data-setting]").forEach((element) => {
      const key = element.getAttribute("data-setting");
      if (siteSettings[key]) element.textContent = siteSettings[key];
    });

    document.title = `${siteSettings.businessName || "Creating Grace Co."} | Handmade Creations`;
  } catch (error) {
    console.warn("Could not load site settings.", error);
  }
}

async function loadProducts() {
  try {
    const response = await fetch(`products.json?cache=${Date.now()}`);
    const data = await response.json();
    products = data.products || [];
    setupCategories(products);
    renderProducts(products);
  } catch (error) {
    productGrid.innerHTML = "<p>Products could not be loaded.</p>";
    console.error(error);
  }
}

function setupCategories(productList) {
  const categories = [...new Set(productList.map((p) => p.category).filter(Boolean))];

  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function renderProducts(productList) {
  productGrid.innerHTML = "";

  if (productList.length === 0) {
    productGrid.innerHTML = "<p>No products found.</p>";
    return;
  }

  productList.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = product.image || "logo.svg";

    card.innerHTML = `
      <img class="product-image" src="${image}" alt="${product.name || "Product image"}" />
      <div class="product-content">
        <span class="badge">${product.status || "Available"}</span>
        <h3>${product.name || "Untitled Product"}</h3>
        <p>${product.description || ""}</p>
        <p class="price">${product.price || "Quote"}</p>
        <a class="button primary" href="#custom">Request Item</a>
      </div>
    `;

    productGrid.appendChild(card);
  });
}

function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filtered = products.filter((product) => {
    const matchesSearch =
      `${product.name} ${product.description} ${product.category}`
        .toLowerCase()
        .includes(searchTerm);

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  renderProducts(filtered);
}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

document.getElementById("orderForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const requestType = document.getElementById("requestType").value;
  const message = document.getElementById("message").value;

  const subject = encodeURIComponent(`Creating Grace Co. Request: ${requestType}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nRequest Type: ${requestType}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:${businessEmail}?subject=${subject}&body=${body}`;

  document.getElementById("formStatus").textContent =
    "Your email app should open with the request ready to send.";
});

Promise.all([loadSiteSettings(), loadProducts()]);
