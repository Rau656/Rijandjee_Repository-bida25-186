(function () {
  var STORAGE_KEY = "marketBridge_userListings";
  var PLACEHOLDER_IMAGE =
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80";

  var DEFAULT_LISTINGS = [
    {
      id: "default-1",
      name: "Laptop",
      price: "12800",
      description: "Thin, fast, ready for work or school.",
      image:
        "https://i.pinimg.com/736x/c0/f8/6b/c0f86b1e98cd7411349892c9e71f2512.jpg",
    },
    {
      id: "default-2",
      name: "Wireless headphones",
      price: "3200",
      description: "Comfortable over-ear sound with long battery life.",
      image:
        "https://i.pinimg.com/1200x/11/98/23/119823ecfd800eb12771ad598cab4fc7.jpg",
    },
    {
      id: "default-3",
      name: "Classic watch",
      price: "2150",
      description: "Minimal dial, everyday wear.",
      image:
        "https://i.pinimg.com/736x/b4/09/31/b40931f3f4d8859564935c2eb9c31b92.jpg",
    },
    {
      id: "default-4",
      name: "Running sneakers",
      price: "2350",
      description: "Lightweight cushioning for daily miles.",
      image:
        "https://i.pinimg.com/1200x/d3/44/bf/d344bf5b7be9b0b78d3b2ca3534be0fa.jpg",
    },
  ];

  function getUserListings() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function normalizePrice(priceStr) {
    if (!priceStr || typeof priceStr !== "string") return "0";
    var cleaned = priceStr.replace(/[^0-9.]/g, "");
    return cleaned || "0";
  }

  function addUserListing(product) {
    var name = (product.name || "").trim();
    var rawPrice = String(product.price || "").trim();
    var price = normalizePrice(rawPrice);
    var description = (product.description || "").trim();
    var image = (product.image || "").trim() || PLACEHOLDER_IMAGE;

    if (!name) return { ok: false, error: "Product name is required." };
    if (!rawPrice || price === "0")
      return { ok: false, error: "Please enter a valid price in BWP." };

    var list = getUserListings();
    list.unshift({
      id: "u-" + Date.now(),
      name: name,
      price: price,
      description: description,
      image: image,
      userAdded: true,
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return { ok: true };
  }

  /** User-added listings first, then built-in samples */
  function getAllListings() {
    return getUserListings().concat(DEFAULT_LISTINGS);
  }

  function formatPriceDisplay(priceRaw) {
    var n = parseFloat(normalizePrice(String(priceRaw)));
    if (isNaN(n)) n = 0;
    var fixed = n.toFixed(2);
    var parts = fixed.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return "BWP " + parts[0] + "." + parts[1];
  }

  window.MarketBridgeCatalog = {
    getAllListings: getAllListings,
    getUserListings: getUserListings,
    addUserListing: addUserListing,
    formatPriceDisplay: formatPriceDisplay,
    PLACEHOLDER_IMAGE: PLACEHOLDER_IMAGE,
  };
})();
