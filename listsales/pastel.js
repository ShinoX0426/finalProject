/*-----------------------{Login Form}------------------------*/


//Select class
const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});



function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");

}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);

}

);

/*-----------------------------------------------------------*/


/*-----------------------{Pop up Login}------------------------*/
document.querySelector("#present").addEventListener("click",function(){
  document.querySelector(".box").classList.add("active");
});

document.querySelector(".forms-wrap .close-btn").addEventListener("click",function(){
  document.querySelector(".box").classList.remove("active");
});


/*-----------------------{SHOP Items}------------------------*/


let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.case');
let close = document.querySelector('.close');

iconCart.addEventListener('click', function(){
    if(cart.style.right == '-100%'){
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    }else{
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
})
close.addEventListener('click', function (){
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
})


let products = null;

fetch('pastel.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
})


function addDataToHTML(){
   
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';

    
    if(products != null) 
    {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">${product.price}.php</div>
            <button onclick="addCart(${product.id})">Add To Cart</button>`;

            listProductHTML.appendChild(newProduct);

        });
    }
}



let listCart = [];
function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }else{
        listCart = [];
    }
}
checkCart();
function addCart($idProduct){
    let productsCopy = JSON.parse(JSON.stringify(products));
   
    if(!listCart[$idProduct]) 
    {
        listCart[$idProduct] = productsCopy.filter(product => product.id == $idProduct)[0];
        listCart[$idProduct].quantity = 1;
    }else{
        
        listCart[$idProduct].quantity++;
    }
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

    addCartToHTML();
}
addCartToHTML();
function addCartToHTML(){
   
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;
    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">${product.price}.php / 1 product</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
            }
        })
    }
    totalHTML.innerText = totalQuantity;
}
function changeQuantity($idProduct, $type){
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;

            // if quantity <= 0 then remove product in cart
            if(listCart[$idProduct].quantity <= 0){
                delete listCart[$idProduct];
            }
            break;
    
        default:
            break;
    }
    // save new data in cookie
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    // reload html view cart
    addCartToHTML();
}
