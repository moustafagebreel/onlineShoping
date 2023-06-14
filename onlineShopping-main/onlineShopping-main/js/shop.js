class Product {
    constructor(obj) {
      this.id = obj._id;
      this.name = obj.name;
      this.image=obj.image;
      this.price = obj.price;
      this.discount = obj.discount;
      this.rating = obj.rating;
      this.rating_count = obj.rating_count;
      this.product_count = obj.productCount;
      this.color = obj.color;
    }
  
    getPriceAfterDiscount() {
      return this.price - this.price * this.discount;
    }
  
  
  
    getRatingHTML() {
      if(this.rating==4.5){
        return `<div class="d-flex align-items-center justify-content-center mb-1">
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star-half-alt text-primary mr-1"></small>
      <small>${this.rating_count}</small>
    </div>`;
    }else if(this.rating==4){
      return `<div class="d-flex align-items-center justify-content-center mb-1">
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small>
      <small>${this.rating_count}</small>
    </div>`;
    }else if(this.rating==3.5){
      return `<div class="d-flex align-items-center justify-content-center mb-1">
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star text-primary mr-1"></small>
      <small class="fa fa-star-half-alt text-primary mr-1"></small>
      <small class="far fa-star text-primary mr-1"></small>
      <small>${this.rating_count}</small>
    </div>`;
    }}
  
    getHomeHTML() {
      return `<div class="col-lg-3 col-md-4 col-sm-6 pb-1">
      <div class="product-item bg-light mb-4">
        <div class="product-img position-relative overflow-hidden">
          <img class="img-fluid w-100" src="${this.image}" alt="">
          <div class="product-action">
            <a class="btn btn-outline-dark btn-square" href="javascript:void(0)"  onclick="addToCart('${this.name.replace("'","")}', ${this.getPriceAfterDiscount()}, '${this.image}')">
            <i  data-id="${this.name}" class="fa fa-shopping-cart cart"></i></a>
            <a class="btn btn-outline-dark btn-square" href="javascript:void(0)"><i class="far fa-heart"></i></a>
            <a class="btn btn-outline-dark btn-square" href="javascript:void(0)"><i class="fa fa-sync-alt"></i></a>
            <a class="btn btn-outline-dark btn-square" href="javascript:void(0)"><i class="fa fa-search"></i></a>
          </div>
        </div>
        <div class="text-center py-4">
          <a class="h6 text-decoration-none text-truncate" href="">${this.name}</a>
          <div class="d-flex align-items-center justify-content-center mt-2">
            <h5>$${this.getPriceAfterDiscount()}</h5>
            <h6 class="text-muted ml-2"><del>$${this.price}</del></h6>
          </div>
          <div class="d-flex align-items-center justify-content-center mb-1">
            ${this.getRatingHTML()}
          </div>
        </div>
      </div>
    </div>`;
    }
  
    getHTML() {
      return `<div class="col-lg-3 col-md-4 col-sm-6 pb-1">
          <a class="text-decoration-none" href="">
              <div class="cat-item d-flex align-items-center mb-4">
                  <div class="overflow-hidden" style="width: 100px; height: 100px" id>
                      <img class="img-fluid" src="${this.image}" alt="" />
                  </div>
                  <div class="flex-fill pl-3">
                      <h6>${this.name}</h6>
                      <small class="text-body">${this.product_count}</small>
                  </div>
              </div>
          </a>
      </div>
      `;
    }
}

let arr = [];

(function () {
    console.log(0);
  
    const response = fetch("http://localhost:5000/api/products/");
    response.then((data) => {
      data.json().then((d) => {
        let list = "";
        d.data.slice(0, 12).forEach((element) => {
            arr.push(element);
            const productBox = new Product(element);
            list += productBox.getHomeHTML();
            console.log(productBox);
        });
        document.getElementById("productList").innerHTML = list;
     
      });
    });
  
    console.log(1);
})();

function addToCart(productName, price, image) {
    console.log("button clicked")
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.push({ name: productName, price: price, image: image,quantity:1});
    localStorage.setItem("cart", JSON.stringify(cartItems));
    console.log("Product added to cart:", productName,price,image);
}

function sortByPopularity() {
  fetch("http://localhost:5000/api/products/")
    .then((response) => response.json())
    .then((resData) => {
      list="";
      const sortedProducts = resData.data.slice(0,12).sort((a, b) => b["rating_count"]- a["rating_count"]);
      console.log(sortedProducts)
      sortedProducts.forEach(product=>{
        let item = new Product(product)
        list+=item.getHomeHTML();
      })
      document.getElementById('productList').innerHTML=list;
      // displayProducts(sortedProducts);
    });
}

// Sort by best rating
function sortByRating() {
  fetch("http://localhost:5000/api/products/")
    .then((response) => response.json())
    .then((resData) => {
      list="";
      const sortedProducts = resData.data.slice(0,12).sort((a, b) => b["rating"]- a["rating"]);
      console.log(sortedProducts)
      sortedProducts.forEach(product=>{
        let item = new Product(product)
        list+=item.getHomeHTML();
      })
      document.getElementById('productList').innerHTML=list;
      // displayProducts(sortedProducts);
    });
}

// Sort by price (ascending order)
function sortByPrice() {
  fetch("http://localhost:5000/api/products/")
    .then((response) => response.json())
    .then((resData) => {
      list="";
      const sortedProducts = resData.data.slice(0,12).sort((a, b) => b["price"]- a["price"]);
      console.log(sortedProducts)
      sortedProducts.forEach(product=>{
        let item = new Product(product)
        list+=item.getHomeHTML();
      })
      document.getElementById('productList').innerHTML=list;
      // displayProducts(sortedProducts);
    });
}

let colorButtons = document.getElementsByName("color");
let mainButton = document.getElementById("color-all");
let list_2 = "";
console.log(mainButton);

for (let i = 0; i < colorButtons.length; i++) {

   
    colorButtons[i].addEventListener('change', e => {
      e.target.setAttribute("checked","checked");
      let buttons =document.querySelectorAll("input[name='color']");
    
      
        buttons.forEach(item=>{
          console.log("hereeeeeeeee")
          if(item.chechked){
            console.log(item.value)

          }
          
        })
        
      
       
        if (colorButtons[i].checked == true){
            
            let colorValue = colorButtons[i].value;
            let ordered = arr.filter(obj => {
                return obj['color'] == colorValue.toLowerCase();
            });
            ordered.forEach(obj =>{
                let item = new Product(obj);
                list_2 += item.getHomeHTML();
            });
          
            document.getElementById("productList").innerHTML = list_2;
        }  
    })

}

document.getElementById("price-all").addEventListener('change',function(){
  if(this.checked){
    let list=''
    arr.forEach((element) => {
      arr.push(element)
        const productBox = new Product(element);
        list += productBox.getHomeHTML();
    });
    document.getElementById("productList").innerHTML = list;

  }else{

  }
})


  

