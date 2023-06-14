document.getElementById("price-all").addEventListener("change", applyPriceFilter);
document.getElementById("price-1").addEventListener("change", applyPriceFilter);
document.getElementById("price-2").addEventListener("change", applyPriceFilter);
document.getElementById("price-3").addEventListener("change", applyPriceFilter);
document.getElementById("price-4").addEventListener("change", applyPriceFilter);
document.getElementById("price-5").addEventListener("change", applyPriceFilter);


function fetchProducts(priceFilter) {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    fetch("http://localhost:5000/api/products/")
      .then((response) => response.json())
      .then((resData) => {
        let products = resData.data;
        if (priceFilter !== "all") {
          // Apply price filter
          const [minPrice, maxPrice] = priceFilter.split("-");
          products = products.filter((product) => {
            return (
              product.price >= parseInt(minPrice) &&
              product.price <= parseInt(maxPrice)
            );
          });
        }
        totalPages = Math.ceil(products.length / itemsPerPage);
        products = products.slice(start, end);
        displayProducts(products);
      });
  }
  function applyPriceFilter() {
  let priceFilter = "all";
  
  if (document.getElementById("price-all").checked) {
    priceFilter = "all";
  } else if (document.getElementById("price-1").checked) {
    priceFilter = "0-100";
  } else if (document.getElementById("price-2").checked) {
    priceFilter = "100-200";
  } else if (document.getElementById("price-3").checked) {
    priceFilter = "200-300";
  } else if (document.getElementById("price-4").checked) {
    priceFilter = "300-400";
  } else if (document.getElementById("price-5").checked) {
    priceFilter = "400-500";
  }

  currentPage = 1;
  fetchProducts(priceFilter);
}




let counter = 0;

function updateCounter() {
  const counterElement = document.getElementById("counter");
  counterElement.textContent = counter.toString();
}
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("fa-heart")) {
      counter++;
      updateCounter();
    }
  });
  
  


