let product = fetch("http://localhost:5000/api/products/");
product.then((product) => {
  product.json().then((resData) => {
    console.log(resData);

    let list = "";
    resData.data.forEach((element) => {
      list += `
      <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
      <div class="product-item bg-light mb-4">
        <div class="product-img position-relative overflow-hidden">
          <img class="img-fluid w-100" src="${element.image}" alt="">
          <div class="product-action">
            <a class="btn btn-outline-dark btn-square" href="#" onclick="addToCart('${element.name}')"><i class="fa fa-shopping-cart">e</i></a>
            <a class="btn btn-outline-dark btn-square" href="#"><i class="far fa-heart"></i></a>
            <a class="btn btn-outline-dark btn-square" href="#"><i class="fa fa-sync-alt"></i></a>
            <a class="btn btn-outline-dark btn-square" href="#"><i class="fa fa-search"></i></a>
          </div>
        </div>

        <div class="text-center py-4">
            <a class="h6 text-decoration-none text-truncate" href="">${element.name}</a>
            <div class="d-flex align-items-center justify-content-center mt-2">
                <h5>${(element.price - element.price * element.discount).toFixed(2)}</h5><h6 class="text-muted ml-2"><del>${element.price}</del></h6>
            </div>
            <div class="d-flex align-items-center justify-content-center mb-1">
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="fa fa-star text-primary mr-1"></small>
                <small class="far fa-star text-primary mr-1"></small>
                <small class="far fa-star text-primary mr-1"></small>
                <small>(99)</small>
            </div>
        </div>
    </div>
</div>
      `;
    });
    list += `<div class="col-12">
      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item disabled"><a class="page-link" href="#">Previous</span></a></li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
      </nav>
  </div>`;
    document.getElementById("productList").innerHTML = list;
  });
});

// Start pagination
let currentPage = 1;
const itemsPerPage = 4;
let totalPages;

function displayProducts(products) {
  let list = "";
  products.forEach((element) => {
    function getRatingHTML() {
      if (element.rating == 4.5) {
        return `<div class="d-flex align-items-center justify-content-center mb-1">
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star-half-alt text-primary mr-1"></small>
      <small>${element.rating_count}</small>
    </div>`;
      } else if (element.rating == 4) {
        return `<div class="d-flex align-items-center justify-content-center mb-1">
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small>
      <small>${element.rating_count}</small>
    </div>`;
      } else if (element.rating == 3.5) {
        return `<div class="d-flex align-items-center justify-content-center mb-1">
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star-half-alt text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small>
      <small>${element.rating_count}</small>
    </div>`;
      }
    }

    list += `
    
    <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
    <div class="product-item bg-light mb-4">
      <div class="product-img position-relative overflow-hidden">
        <img class="img-fluid w-100" src="${element.image}" alt="">'
        <div class="product-action">

        <a class="btn btn-outline-dark btn-square" href="javascript:void(0)" onclick="addToCart('${element.name.replace("'","")}', ${element.price}, '${element.image}')">
        <i  data-id="${element.name}" class="fa fa-shopping-cart cart"></i>
        </a>

          <a class="btn btn-outline-dark btn-square" href="javascript:void(0)"><i class="far fa-heart "></i></a>
          <a class="btn btn-outline-dark btn-square" href="javascript:void(0)"><i class="fa fa-sync-alt"></i></a>
          <a class="btn btn-outline-dark btn-square" href="javascript:void(0)"><i class="fa fa-search"></i></a>
        </div>
      </div>
  
        <div class="text-center py-4">
            <a class="h6 text-decoration-none text-truncate" href="">${element.name}</a>
            <div class="d-flex align-items-center justify-content-center mt-2">
                <h5>${(element.price - element.price * element.discount).toFixed(2)}</h5><h6 class="text-muted ml-2"><del>${element.price}</del></h6>
            </div>
            ${getRatingHTML()}
            </div>
        </div>
    </div>
    
</div>
    `;
  });

  list += `
    <div class="col-12">
      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
          </li>
  `;

  for (let i = 1; i <= totalPages; i++) {
    list += `
      <li class="page-item ${currentPage === i ? 'active' : ''}">
        <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
      </li>
    `;
  }

  list += `
          <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  `;

  document.getElementById("productList").innerHTML = list;
}

function changePage(page) {
  if (page < 1 || page > totalPages) {
    return;
  }
  currentPage = page;
  fetchProducts1();
}

const cartValue=document.getElementsByClassName("cartValue")[0];
if(localStorage.getItem('cartValue')){
  cartValue.innerHTML=JSON.parse(localStorage.getItem('cartValue'));
}

function fetchProducts1() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  fetch("http://localhost:5000/api/products/")
    .then((response) => response.json())
    .then((resData) => {
      const products = resData.data.slice(start, end);
      displayProducts(products);
    });
}

fetch("http://localhost:5000/api/products/")
  .then((response) => response.json())
  .then((resData) => {
    totalPages = Math.ceil(resData.data.length / itemsPerPage);
    fetchProducts1();
  });

  let count = JSON.parse(localStorage.getItem('cartValue'))||0;
  function addToCart(productName, price, image, quantity=1) {
    count++;
    console.log(productName);
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.push({ name: productName, price: price, image: image,quantity:quantity});
    localStorage.setItem("cart", JSON.stringify(cartItems));
    cartValue.innerHTML=count;
    localStorage.setItem('cartValue', JSON.stringify(count))
    console.log("Product added to cart:", productName,price,image);
  }
// end pagination
