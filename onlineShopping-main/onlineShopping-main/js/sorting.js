// Sort by popularity (rating count)
function sortByPopularity() {
  fetch("http://localhost:5000/api/products/")
    .then((response) => response.json())
    .then((resData) => {
      const sortedProducts = resData.data.sort((a, b) => b.ratingCount - a.ratingCount);
      displayProducts(sortedProducts);
    });
}

// Sort by best rating
function sortByRating() {
  fetch("http://localhost:5000/api/products/")
    .then((response) => response.json())
    .then((resData) => {
      const sortedProducts = resData.data.sort((a, b) => b.rating - a.rating);
      displayProducts(sortedProducts);
    });
}

// Sort by price (ascending order)
function sortByPrice() {
  fetch("http://localhost:5000/api/products/")
    .then((response) => response.json())
    .then((resData) => {
      const sortedProducts = resData.data.sort((a, b) => a.price - b.price);
      displayProducts(sortedProducts);
    });
}



function fetchProducts1() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  fetch("http://localhost:5000/api/products/")
    .then((response) => response.json())
    .then((resData) => {
      const sortedProducts = resData.data.sort((a, b) => a.price - b.price); // Default sorting by price (ascending)
      const products = sortedProducts.slice(start, end);
      displayProducts(products);
    });
}
