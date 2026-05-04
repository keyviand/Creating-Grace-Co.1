// ===============================
// Creating Grace Co.
// GitHub Pages + Google Sheet CMS
// ===============================

// STEP 1:
// Create a Google Sheet with columns:
// name | price | category | description | image | status
//
// STEP 2:
// In Google Sheets, go to File > Share > Publish to web.
// Publish the sheet as CSV.
//
// STEP 3:
// Paste the CSV link below between the quotes.
// Keep it blank to use the fallback products from products.js.
const GOOGLE_SHEET_CSV_URL = "";

// Change this to the real business email.
const BUSINESS_EMAIL = "creatinggrace@example.com";

const productGrid = document.getElementById("productGrid");
const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");
const sheetNote = document.getElementById("sheetNote");

let products = [];

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("menuButton").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});

function csvToObjects(csvText) {
  const rows = csvText.trim().split(/\r?\n/).map(parseCSVRow);
  const headers = rows.shift().map((header) => header.trim().toLowerCase());

  return rows
    .filter((row) => row.some((cell) => cell.trim() !== ""))
    .map((row) => {
      const product = {};
      headers.forEach((header, index) => {
        product[header] = row[index] ? row[index].trim() : "";
      });
      return product;
    });
}

function parseCSVRow(row) {
  const result = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    const nextChar = row[i + 1];

    if (char === '"' && insideQuotes && nextChar === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

async function loadProducts() {
  if (!GOOGLE_SHEET_CSV_URL) {
    products = window.FALLBACK_PRODUCTS;
    sheetNote.textContent =
      "Demo products are showing. Connect Google Sheets in app.js when you are ready.";
    setupCategories(products);
    renderProducts(products);
    return;
  }

  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL);
    const csvText = await response.text();
    products = csvToObjects(csvText);
    sheetNote.textContent = "Products loaded from the private owner-managed product sheet.";
    setupCategories(products);
    renderProducts(products);
  } catch (error) {
    products = window.FALLBACK_PRODUCTS;
    sheetNote.textContent =
      "Could not load Google Sheet, so demo products are showing. Check the CSV link in app.js.";
    setupCategories(products);
    renderProducts(products);
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

    card.innerHTML = `
      <img class="product-image" src="${product.image || "logo.svg"}" alt="${product.name || "Product image"}" />
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

  window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;

  document.getElementById("formStatus").textContent =
    "Your email app should open with the request ready to send.";
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

loadProducts();
