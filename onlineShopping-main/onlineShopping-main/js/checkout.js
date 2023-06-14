class Cart {

  cartlines;
  constructor(productsArray) {
    this.cartlines = [];
    //loop to add products into cartlines array
    JSON.parse(localStorage.getItem('cart')).forEach(obj => {
      this.cartlines.push(obj);
    });
  }

  getProductList() {

    return `<div class="d-flex justify-content-between">
    <p>${this.cartlines[0].name} x (${this.cartlines[0].quantity})</p>
    <p>$${this.cartlines[0].price*this.cartlines[0].quantity}</p>
    </div>`
    
  }

}

let list = "";
let count = 0;
let subTotal = 0;
let checkbox = document.getElementsByName("payment");
let tax = 0;
let customerCart = new Cart(JSON.parse(localStorage.getItem('cart')));

for ( let i = 0; i < checkbox.length; i++ ) {

    checkbox[i].addEventListener('change', () => {
   
        if(checkbox[i].id === 'paypal'){
            tax = 10;
            document.getElementById("tax").innerHTML = `${tax}%`;
            document.getElementById("total").innerHTML = `$${subTotal - tax * subTotal * 0.01}`;
        }else if(checkbox[i].id === 'directcheck'){
            tax = 15;
            document.getElementById("tax").innerHTML = `${tax}%`;
            document.getElementById("total").innerHTML = `$${subTotal - tax * subTotal * 0.01}`;
        }else if(checkbox[i].id === 'banktransfer'){
            tax = 5;
            document.getElementById("tax").innerHTML = `${tax}%`;
            document.getElementById("total").innerHTML = `$${subTotal - tax * subTotal * 0.01}`;
        }
    })

}

for (let i = 0; i < customerCart.cartlines.length; i++) {

  
  subTotal += customerCart.cartlines[i].price*customerCart.cartlines[i].quantity;


}

for (let i = 0; i < customerCart.cartlines.length; i++) {


  list += customerCart.getProductList();
  customerCart.cartlines.reverse();
  customerCart.cartlines.pop();

}

list += customerCart.getProductList();

document.getElementById("productList").innerHTML = list;

document.getElementById("subtotal").innerHTML = `$${subTotal.toFixed(2)}`;



let validInput = document.getElementsByName('myInput');
console.log(validInput);

function validation(){
  let fr = document.getElementById('first_name').value;
  let sc = document.getElementById('last_name').value;
  let em = document.getElementById('email').value;
  let mob = document.getElementById('mobile').value;
  let add = document.getElementById('address1').value;
  let ct = document.getElementById('city').value;
  let st = document.getElementById('state').value;

  if(localStorage.getItem('token')===null){
    location.href='login.html';
    return;
  }else if (fr != '' && sc != '' && em != '' && mob != '' && add != '' && ct != '' && st != '') {
    return true
  }else {
    alert('Please fill empty fields')
  }

  
}

function placeOrder() {
  let count = 0;
  if(validation()) {
    for ( let i = 0; i < checkbox.length; i++ ) {
      if (checkbox[i].checked === true) {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", localStorage.getItem("token"));
  
        var raw = JSON.stringify({
          "shipping_info": {
            "first_name": JSON.stringify(document.getElementById('first_name').value),
            "last_name": JSON.stringify(document.getElementById('last_name').value),
            "email": JSON.stringify(document.getElementById('email').value),
            "mobile_number": JSON.stringify(document.getElementById('mobile').value),
            "address1": JSON.stringify(document.getElementById('address1').value),
            "address2": JSON.stringify(document.getElementById('address2').value),
            "country": JSON.stringify(document.getElementById('country').value),
            "city": JSON.stringify(document.getElementById('city').value),
            "state": JSON.stringify(document.getElementById('state').value),
            "zip_code": JSON.stringify(document.getElementById('code').value)
          },
          "sub_total_price": subTotal,
          "shipping": subTotal,
          "total_price": subTotal - tax * subTotal * 0.01,
          "user_id": "6346ac23bb862e01fe4b6535",
          "order_date": JSON.stringify(new Date()),
          "order_details": JSON.parse(localStorage.getItem('cart'))
        });
        
  
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
  
        fetch("http://localhost:5000/api/orders/", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
  
        localStorage.removeItem('cart');
        localStorage.removeItem('cartValue');

        document.getElementById('form').reset();
        document.getElementById('productList').innerHTML= '';
        document.getElementById("subtotal").innerHTML= '';
        document.getElementById("tax").innerHTML= '';
        document.getElementById("total").innerHTML= ''; 
        }else {
          count++;
          if (count === 3) {
            alert('Please pick a payment method')
           
          }
        }
          
    }
  
  }


 
}


