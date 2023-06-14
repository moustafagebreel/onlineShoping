class Product {
    constructor(obj) {
      this.id = obj._id;
      this.name = obj.name;
      this.image= obj.image;
      this.price = obj.price;
      this.discount = obj.discount;
      this.rating = obj.rating;
      this.rating_count = obj.rating_count;
      this.product_count = obj.productCount;
    }
} 

class CartLine extends Product {
    quantity;
    constructor(name, quantity = 1) {
        super(name);
        this.quantity = quantity;
    }
  
    getTotalPrice() {
      return this.price * this.quantity;
    }
  
    increment() {
      this.quantity++;
    }
  
    decrement() {
      if (this.quantity > 1) this.quantity--;
    }
  
    getHTML() {
      return `<tr id="cartLine">
      <td class="align-middle">
          <img src="${this.image}" alt="" style="width: 50px" />
          ${this.name}
      </td>
      <td class="align-middle">$${this.price}</td>
      <td class="align-middle">
          <div
              class="input-group quantity mx-auto"
              style="width: 100px"
          >
              <div class="input-group-btn">
                  <button 
                      
                      type="button" id="subtract"
                      class="btn btn-sm btn-primary btn-minus" 
                  >
                      <i data-id="${this.name}" class="fa fa-minus decBtn"></i>
                  </button>
              </div>
              <input
              
              type="text" 
              class="quantityVal form-control form-control-sm bg-secondary border-0 text-center"
              value=${this.quantity} readonly
              />
              <div class="input-group-btn">
                  <button
                      
                      type="button" id="add"
                      class=" btn btn-sm btn-primary btn-plus" 
                      
                  >
                      <i data-id="${this.name}" class="fa fa-plus incBtn"></i>
                  </button>
              </div>
          </div>
      </td>
      <td class="align-middle">$${this.getTotalPrice()}</td>
      <td class="align-middle">
          <button class="btn btn-sm btn-danger" type="button" ">
              <i data-id="${this.name}"  class="fa fa-times  remove"></i>
          </button>
      </td>
    </tr>`
    }
}

let list = "";
const newMap = new Map();

JSON.parse(localStorage.getItem('cart')).forEach(obj => {
    console.log(obj.name);
    console.log(obj.quantity);

    if (newMap.has(obj.name)){
        newMap.set(obj.name,newMap.get(obj.name)+1);
        
    }else{
        newMap.set(obj.name, obj.quantity);
    }

});

let dubData=JSON.parse(localStorage.getItem('cart'));
dubData= dubData.filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.name === value.name
  ))
);

dubData.forEach(element=>{
    element.quantity=newMap.get(element.name);
    const cartItem = new CartLine(element);
    cartItem.quantity = element.quantity
    list += cartItem.getHTML();

})

const cartValue=document.getElementsByClassName("cartValue")[0];
if(localStorage.getItem('cartValue')){
  cartValue.innerHTML=JSON.parse(localStorage.getItem('cartValue'));
}
let count =JSON.parse(localStorage.getItem('cartValue'))||0;


document.addEventListener('click',e=>{

    if(e.target.classList.contains('incBtn')){
        let priceDiv=e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[3];
        let inputElement=e.target.parentElement.parentElement.parentElement.children[1];
        let inputValue=+e.target.parentElement.parentElement.parentElement.children[1].value;
        let  uName=e.target.getAttribute("data-id");
        let order = dubData.filter(product=> product.name== uName);
        count++;
        cartValue.innerHTML=count;
        localStorage.setItem('cartValue', JSON.stringify(count))
        inputValue++;
        order[0].quantity=inputValue;
        inputElement.value=inputValue;

        priceDiv.innerText=`$${(inputValue*order[0].price).toFixed(2)}`
        localStorage.setItem('cart',JSON.stringify(dubData))

    }else if(e.target.classList.contains('remove')){

        let tr=e.target.parentElement.parentElement.parentElement;
        let  uName=e.target.getAttribute("data-id");
        let order = dubData.filter(product=> product.name!= uName);
        tr.remove();
        localStorage.setItem('cart',JSON.stringify(order));

    }else if(e.target.classList.contains('decBtn')){

        console.log(true)
        let priceDiv=e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[3];
        let inputElement=e.target.parentElement.parentElement.parentElement.children[1];
        let inputValue=+e.target.parentElement.parentElement.parentElement.children[1].value;
        
        let  uName=e.target.getAttribute("data-id");
        let order = dubData.filter(product=> product.name== uName);
        
        if(inputValue>1){
            inputValue--;
            order[0].quantity=inputValue;
            inputElement.value=inputValue;
            priceDiv.innerText=`$${(inputValue*order[0].price).toFixed(2)}`
            localStorage.setItem('cart',JSON.stringify(dubData))
        }  
    }

})



document.getElementById("products").innerHTML = list;
console.log(newMap);




