const wartegInfo = {
  name: "Warteg Pakde Jason",
  slogan: "Masakan rumahan, harga bersahabat",
  whatsapp: "6281234567890",
  address: "Jl. Contoh No. 12, Jakarta",
  openHour: 7,
  closeHour: 21,
  deliveryRadius: "Radius 3 km",
  shippingFee: 5000,
  paymentMethods: ["Tunai", "QRIS", "Transfer"]
};

const menuItems = [
  {
    id: 1,
    name: "Nasi Putih",
    category: "Nasi",
    price: 3000,
    description: "Nasi hangat pulen untuk pelengkap hidangan Anda.",
    image: "assets/nasi_putih.jpg",
    available: true
  },
  {
    id: 2,
    name: "Orek Tempe",
    category: "Lauk",
    price: 12000,
    description: "Tempe orek manis gurih dengan bumbu khas warteg.",
    image: "assets/orek.jpg",
    available: true
  },
  {
    id: 3,
    name: "Sayur Lodeh",
    category: "Sayur",
    price: 15000,
    description: "Sayur santan dengan sayur dan tahu yang lezat.",
    image: "assets/sayurlodeh.jpg",
    available: true
  },
  {
    id: 4,
    name: "Sayur Asem",
    category: "Sayur",
    price: 14000,
    description: "Segar, asam, dan ringan cocok untuk menu harian.",
    image: "assets/sayurasem.jpg",
    available: true
  },
  {
    id: 5,
    name: "Ayam Goreng",
    category: "Lauk",
    price: 18000,
    description: "Ayam goreng renyah dengan bumbu sederhana yang gurih.",
    image: "assets/ayamgoreng.jpg",
    available: true
  },
  {
    id: 6,
    name: "Ikan Lele Goreng",
    category: "Lauk",
    price: 22000,
    description: "Lele goreng crispy dengan sambal dan lalapan.",
    image: "assets/ikanlelegoreng.jpg",
    available: true
  },
  {
    id: 7,
    name: "Telur Balado",
    category: "Lauk",
    price: 10000,
    description: "Telur ceplok dengan sambal balado pedas menggoda.",
    image: "assets/telurbalado.jpg",
    available: true
  },
  {
    id: 8,
    name: "Tahu Tempe Bacem",
    category: "Lauk",
    price: 11000,
    description: "Tahu dan tempe bacem manis gurih yang lembut.",
    image: "assets/tempebacem.jpeg",
    available: true
  },
  {
    id: 9,
    name: "Perkedel Kentang",
    category: "Lauk",
    price: 9000,
    description: "Perkedel kentang lembut dengan rasa gurih khas.",
    image: "assets/perkedel.jpeg",
    available: true
  },
  {
    id: 10,
    name: "Sambal Terasi",
    category: "Lauk",
    price: 3000,
    description: "Sambal terasi pedas siap menemani lauk favorit Anda.",
    image: "assets/sambalterasi.jpeg",
    available: true
  },
  {
    id: 11,
    name: "Es Teh Manis",
    category: "Minuman",
    price: 6000,
    description: "Teh manis dingin yang menyegarkan di siang hari.",
    image: "assets/esteh.jpeg",
    available: true
  },
  {
    id: 12,
    name: "Teh Hangat",
    category: "Minuman",
    price: 4000,
    description: "Teh hangat sederhana untuk menemani santapan Anda.",
    image: "assets/teh.jpeg",
    available: true
  },
  {
    id: 13,
    name: "Tempe Goreng",
    category: "Lauk",
    price: 5000,
    description: "Tempe goreng kriuk, cocok untuk lauk sederhana.",
    image: "assets/tempegoreng.jpg",
    available: true
  },
  {
    id: 14,
    name: "Kangkung Cah Bawang",
    category: "Sayur",
    price: 12000,
    description: "Kangkung yang dimasak dengan bawang dan sedikit kecap.",
    image: "assets/kangkung.jpeg",
    available: true
  },
  {
    id: 15,
    name: "Capcay Sayur",
    category: "Sayur",
    price: 16000,
    description: "Campuran sayur segar dengan saus gurih ringan.",
    image: "assets/capcay.jpg",
    available: true
  },
  {
    id: 16,
    name: "Es Jeruk Segar",
    category: "Minuman",
    price: 8000,
    description: "Minuman segar dengan rasa jeruk yang santai dan menyegarkan.",
    image: "assets/esjeruk.jpg",
    available: true
  },
  {
    id: 17,
    name: "Ayam Bakar",
    category: "Lauk",
    price: 20000,
    description: "Ayam bakar dengan bumbu rempah yang harum.",
    image: "assets/ayambakar.jpg",
    available: false
  }
];

const STORAGE_KEY = "wartegKemuningCart";
let cart = loadCart();
let activeCategory = "Semua";
let searchTerm = "";
let toastTimer;

const elements = {
  menuGrid: document.getElementById("menuGrid"),
  cartCount: document.getElementById("cartCount"),
  cartDrawer: document.getElementById("cartDrawer"),
  cartOverlay: document.getElementById("cartOverlay"),
  cartToggle: document.getElementById("cartToggle"),
  closeCart: document.getElementById("closeCart"),
  menuToggle: document.getElementById("menuToggle"),
  navMenu: document.getElementById("navMenu"),
  cartEmpty: document.getElementById("cartEmpty"),
  cartItems: document.getElementById("cartItems"),
  subtotalValue: document.getElementById("subtotalValue"),
  shippingValue: document.getElementById("shippingValue"),
  totalValue: document.getElementById("totalValue"),
  checkoutForm: document.getElementById("checkoutForm"),
  orderType: document.getElementById("orderType"),
  deliveryAddress: document.getElementById("deliveryAddress"),
  addressFieldWrapper: document.getElementById("addressFieldWrapper"),
  toast: document.getElementById("toast"),
  statusDot: document.getElementById("statusDot"),
  storeStatus: document.getElementById("storeStatus"),
  menuSearch: document.getElementById("menuSearch"),
  customerName: document.getElementById("customerName"),
  customerPhone: document.getElementById("customerPhone"),
  paymentMethod: document.getElementById("paymentMethod"),
  customerNote: document.getElementById("customerNote")
};

document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  updateCart();
  updateStatusBadge();
  bindEvents();
  observeRevealSections();
});

function bindEvents() {
  elements.cartToggle.addEventListener("click", openCart);
  elements.closeCart.addEventListener("click", closeCart);
  elements.cartOverlay.addEventListener("click", closeCart);

  elements.menuToggle.addEventListener("click", () => {
    const isOpen = elements.navMenu.classList.toggle("open");
    elements.menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.classList.toggle("active", btn === button);
      });
      renderMenu();
    });
  });

  elements.menuSearch.addEventListener("input", (event) => {
    searchTerm = event.target.value.trim().toLowerCase();
    renderMenu();
  });

  elements.orderType.addEventListener("change", updateDeliveryGroup);
  elements.checkoutForm.addEventListener("submit", handleCheckout);

  [elements.customerName, elements.customerPhone, elements.deliveryAddress].forEach((input) => {
    if (!input) return;
    input.addEventListener("input", () => clearFieldError(input));
  });

  document.addEventListener("click", (event) => {
    const cartAction = event.target.closest("[data-action]");
    if (!cartAction) return;

    const { action, id } = cartAction.dataset;

    if (action === "add-item") addToCart(Number(id));
    if (action === "increase") changeQuantity(Number(id), 1);
    if (action === "decrease") changeQuantity(Number(id), -1);
    if (action === "remove-item") removeFromCart(Number(id));
  });
}

function observeRevealSections() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));
}

function loadCart() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn("Gagal membaca keranjang dari localStorage:", error);
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.warn("Gagal menyimpan keranjang ke localStorage:", error);
  }
}

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Number(value));
}

function getItemMap() {
  return menuItems.reduce((map, item) => {
    map[item.id] = item;
    return map;
  }, {});
}

function renderMenu() {
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === "Semua" || item.category === activeCategory;
    const matchesSearch =
      !searchTerm ||
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  if (!filteredItems.length) {
    elements.menuGrid.innerHTML = `
      <div class="empty-state">
        <p>Menu yang Anda cari tidak ditemukan.</p>
      </div>
    `;
    return;
  }

  elements.menuGrid.innerHTML = filteredItems
    .map((item) => {
      const unavailable = !item.available;
      const buttonText = unavailable ? "Habis" : "Tambah";

      return `
        <article class="menu-card ${unavailable ? "is-out" : ""}" aria-label="${item.name}">
          <div class="card-image">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
            ${unavailable ? '<span class="badge-habis">Habis</span>' : ""}
          </div>

          <div class="card-body">
            <div class="card-top">
              <h3>${item.name}</h3>
              <span class="card-price">${formatRupiah(item.price)}</span>
            </div>

            <p class="card-desc">${item.description}</p>

            <div class="card-footer">
              <span class="menu-tag">${item.category}</span>
              <button
                type="button"
                class="add-btn"
                data-action="add-item"
                data-id="${item.id}"
                ${unavailable ? "disabled" : ""}
                aria-label="Tambah ${item.name} ke keranjang"
              >
                ${buttonText}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function addToCart(itemId) {
  const item = menuItems.find((menuItem) => menuItem.id === itemId);
  if (!item || !item.available) return;

  const existingItem = cart.find((entry) => entry.id === itemId);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ id: itemId, qty: 1 });
  }

  saveCart();
  updateCart();
  openCart();
  showToast(`${item.name} ditambahkan ke keranjang.`);
}

function changeQuantity(itemId, amount) {
  const itemIndex = cart.findIndex((entry) => entry.id === itemId);
  if (itemIndex === -1) return;

  const updatedItem = cart[itemIndex];
  updatedItem.qty += amount;

  if (updatedItem.qty <= 0) {
    cart.splice(itemIndex, 1);
  }

  saveCart();
  updateCart();
}

function removeFromCart(itemId) {
  cart = cart.filter((entry) => entry.id !== itemId);
  saveCart();
  updateCart();
}

function openCart() {
  elements.cartDrawer.classList.add("open");
  elements.cartOverlay.classList.add("active");
}

function closeCart() {
  elements.cartDrawer.classList.remove("open");
  elements.cartOverlay.classList.remove("active");
}

function updateCart() {
  const itemMap = getItemMap();
  const subtotal = cart.reduce((sum, entry) => {
    const item = itemMap[entry.id];
    return sum + (item ? item.price * entry.qty : 0);
  }, 0);

  const shippingFee = getOrderType() === "Antar" && cart.length > 0 ? wartegInfo.shippingFee : 0;
  const total = subtotal + shippingFee;

  elements.cartCount.textContent = cart.reduce((sum, entry) => sum + entry.qty, 0);

  if (!cart.length) {
    elements.cartEmpty.classList.add("visible");
    elements.cartItems.innerHTML = "";
  } else {
    elements.cartEmpty.classList.remove("visible");
    elements.cartItems.innerHTML = cart
      .map((entry) => {
        const item = itemMap[entry.id];
        if (!item) return "";

        const itemTotal = item.price * entry.qty;

        return `
          <li class="cart-item">
            <div class="cart-item-image">${item.name.slice(0, 1)}</div>

            <div class="cart-item-info">
              <strong>${item.name}</strong>
              <small>${formatRupiah(item.price)} / pcs</small>

              <div class="item-controls">
                <button
                  class="qty-btn"
                  type="button"
                  data-action="decrease"
                  data-id="${item.id}"
                  aria-label="Kurangi jumlah ${item.name}"
                >
                  −
                </button>
                <span>${entry.qty}</span>
                <button
                  class="qty-btn"
                  type="button"
                  data-action="increase"
                  data-id="${item.id}"
                  aria-label="Tambah jumlah ${item.name}"
                >
                  +
                </button>
              </div>
            </div>

            <div class="item-total">
              <strong>${formatRupiah(itemTotal)}</strong>
              <button
                class="delete-item"
                type="button"
                data-action="remove-item"
                data-id="${item.id}"
                aria-label="Hapus ${item.name} dari keranjang"
              >
                Hapus
              </button>
            </div>
          </li>
        `;
      })
      .join("");
  }

  elements.subtotalValue.textContent = formatRupiah(subtotal);
  elements.shippingValue.textContent = formatRupiah(shippingFee);
  elements.totalValue.textContent = formatRupiah(total);

  updateDeliveryGroup();
}

function getOrderType() {
  return elements.orderType.value || "Ambil Sendiri";
}

function updateDeliveryGroup() {
  const isDelivery = getOrderType() === "Antar";
  elements.addressFieldWrapper.hidden = !isDelivery;
  elements.deliveryAddress.required = isDelivery;

  if (!isDelivery) {
    elements.deliveryAddress.value = "";
    clearFieldError(elements.deliveryAddress);
  }

  const subtotal = cart.reduce((sum, entry) => {
    const item = menuItems.find((menuItem) => menuItem.id === entry.id);
    return sum + (item ? item.price * entry.qty : 0);
  }, 0);

  const shippingFee = isDelivery && cart.length > 0 ? wartegInfo.shippingFee : 0;
  const total = subtotal + shippingFee;

  elements.subtotalValue.textContent = formatRupiah(subtotal);
  elements.shippingValue.textContent = formatRupiah(shippingFee);
  elements.totalValue.textContent = formatRupiah(total);
}

function handleCheckout(event) {
  event.preventDefault();

  const formData = {
    customerName: elements.customerName.value.trim(),
    customerPhone: elements.customerPhone.value.trim(),
    orderType: getOrderType(),
    deliveryAddress: elements.deliveryAddress.value.trim(),
    paymentMethod: elements.paymentMethod.value,
    customerNote: elements.customerNote.value.trim()
  };

  const errors = validateCheckout(formData);
  if (Object.keys(errors).length > 0) {
    Object.entries(errors).forEach(([fieldName, message]) => {
      const input = getFieldByName(fieldName);
      const messageNode = input?.parentElement?.querySelector(".error-message");
      if (messageNode) messageNode.textContent = message;
    });
    return;
  }

  if (!cart.length) {
    showToast("Keranjang masih kosong. Tambahkan menu dulu.");
    return;
  }

  const message = buildWhatsAppMessage(formData);
  const url = `https://wa.me/${wartegInfo.whatsapp}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");

  showToast(
    "Pesanan siap dikirim via WhatsApp.",
    "Kosongkan keranjang",
    () => {
      cart = [];
      saveCart();
      updateCart();
    }
  );
}

function validateCheckout(data) {
  const errors = {};

  if (!data.customerName) errors.customerName = "Nama wajib diisi.";

  if (!data.customerPhone) {
    errors.customerPhone = "Nomor HP wajib diisi.";
  } else if (!/^[0-9+()\-\s]{8,15}$/.test(data.customerPhone)) {
    errors.customerPhone = "Nomor HP tidak valid.";
  }

  if (data.orderType === "Antar" && !data.deliveryAddress) {
    errors.deliveryAddress = "Alamat wajib diisi untuk pesanan antar.";
  }

  return errors;
}

function getFieldByName(fieldName) {
  const map = {
    customerName: elements.customerName,
    customerPhone: elements.customerPhone,
    deliveryAddress: elements.deliveryAddress
  };

  return map[fieldName];
}

function clearFieldError(input) {
  if (!input) return;
  const errorNode = input.parentElement.querySelector(".error-message");
  if (errorNode) errorNode.textContent = "";
}

function buildWhatsAppMessage(formData) {
  const itemLines = cart
    .map((entry) => {
      const item = menuItems.find((menuItem) => menuItem.id === entry.id);
      if (!item) return "";
      return `- ${item.name} x ${entry.qty} = ${formatRupiah(item.price * entry.qty)}`;
    })
    .join("\n");

  const subtotal = cart.reduce((sum, entry) => {
    const item = menuItems.find((menuItem) => menuItem.id === entry.id);
    return sum + (item ? item.price * entry.qty : 0);
  }, 0);

  const deliveryFee = formData.orderType === "Antar" && subtotal > 0 ? wartegInfo.shippingFee : 0;
  const total = subtotal + deliveryFee;

  const addressText = formData.orderType === "Antar" ? `\nAlamat: ${formData.deliveryAddress}` : "\nAmbil sendiri";
  const noteText = formData.customerNote ? `\nCatatan: ${formData.customerNote}` : "\nCatatan: -";

  return [
    "Halo Warteg Pakde Jason, saya ingin memesan:",
    "",
    itemLines,
    "",
    `Subtotal: ${formatRupiah(subtotal)}`,
    `Ongkir: ${formatRupiah(deliveryFee)}`,
    `Total: ${formatRupiah(total)}`,
    `Nama: ${formData.customerName}`,
    `Nomor HP: ${formData.customerPhone}`,
    `Tipe pesanan: ${formData.orderType}`,
    addressText,
    `Metode bayar: ${formData.paymentMethod}`,
    noteText
  ].join("\n");
}

function showToast(message, actionText = "", actionHandler = null) {
  const textNode = document.createElement("div");
  textNode.textContent = message;

  elements.toast.innerHTML = "";
  elements.toast.appendChild(textNode);

  if (actionText && actionHandler) {
    const actionButton = document.createElement("button");
    actionButton.type = "button";
    actionButton.className = "toast-action";
    actionButton.textContent = actionText;
    actionButton.addEventListener("click", () => {
      actionHandler();
      elements.toast.classList.remove("show");
    });
    elements.toast.appendChild(actionButton);
  }

  clearTimeout(toastTimer);
  elements.toast.classList.add("show");

  toastTimer = setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 3500);
}

function updateStatusBadge() {
  const now = new Date();
  const currentHour = now.getHours();
  const isOpen = currentHour >= wartegInfo.openHour && currentHour < wartegInfo.closeHour;

  elements.storeStatus.textContent = isOpen ? "Buka" : "Tutup";
  elements.statusDot.style.background = isOpen ? "#2d8c67" : "#d44b4b";
  elements.statusDot.style.boxShadow = isOpen
    ? "0 0 0 4px rgba(45, 140, 103, 0.12)"
    : "0 0 0 4px rgba(212, 75, 75, 0.12)";
}
