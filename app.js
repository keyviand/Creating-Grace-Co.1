const products = [
  {
    name: "Custom Tote Bag",
    price: "$35",
    icon: "👜",
    description: "Handmade tote bag with custom fabric options."
  },
  {
    name: "Pillow Cover",
    price: "$25",
    icon: "🧵",
    description: "Decorative pillow covers made to match your style."
  },
  {
    name: "Custom Apron",
    price: "$30",
    icon: "✂️",
    description: "Personalized aprons for cooking, work, or gifts."
  },
  {
    name: "Alteration Service",
    price: "Quote",
    icon: "👕",
    description: "Basic repairs, hemming, and custom sewing requests."
  }
];

const productGrid = document.getElementById("productGrid");

products.forEach((product) => {
  const card = document.createElement("article");
  card.className = "product-card";
  card.innerHTML = `
    <div class="product-img">${product.icon}</div>
    <div class="product-info">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">${product.price}</p>
      <a class="btn primary" href="#custom-order">Request Item</a>
    </div>
  `;
  productGrid.appendChild(card);
});

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("show");
});

document.getElementById("orderForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const requestType = document.getElementById("requestType").value;
  const message = document.getElementById("message").value;

  const subject = encodeURIComponent(`New ${requestType} Request from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nRequest Type: ${requestType}\n\nMessage:\n${message}`
  );

  // Change yourname@example.com to your real business email.
  window.location.href = `mailto:yourname@example.com?subject=${subject}&body=${body}`;

  document.getElementById("formNote").textContent =
    "Your email app should open. Change the email address in app.js to your real business email.";
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
