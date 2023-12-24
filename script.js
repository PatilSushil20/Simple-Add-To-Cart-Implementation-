let carts = [];
const addedProducts = document.querySelector(".products")
let totalPrice = 0

const updateMyCart = () => {
    const numberOfCart = document.getElementById("numOfCarts")
    numberOfCart.innerHTML = parseInt(carts.length)
    if (numberOfCart.innerHTML != 0) {
        numberOfCart.style.display = "block"
    }
    else {
        numberOfCart.style.display = "none"
    }
}

const increaseQuantity = (id) => {
    const cartObj = carts.find((cart) => cart.pro_id == id)
    cartObj.pro_quantity += 1
    updateTotalPrice()
    updateDisplay()
}

const dereaseQuantity = (id) => {
    const cartObj = carts.find((cart) => cart.pro_id == id)
    cartObj.pro_quantity -= 1
    if (cartObj.pro_quantity < 1) {
        carts = carts.filter((cart) => cart.pro_id != id)
    }
    updateTotalPrice()
    updateDisplay()
    updateMyCart()
}


const updateTotalPrice = () => {
    const showTotalPrice = document.getElementById("showTotalPrice")
    totalPrice = carts.reduce((total, cart) => {
        return total + (cart.pro_quantity * cart.pro_price)
    }, 0)
    showTotalPrice.innerHTML = `Rs.${totalPrice}`
}

// update display
const updateDisplay = () => {
    addedProducts.innerHTML = ""
    carts.forEach((cart) => {
        const cartContainer = document.createElement("li")
        const productIndividualPrice = cart.pro_quantity * cart.pro_price
        cartContainer.setAttribute("class", "cart");
        cartContainer.innerHTML = `<span class="cartLeft">
                                        <img src="${cart.pro_img}" width="75px">
                                        <p>${cart.pro_name}</p>
                                   </span>
                                   <span id="price">Rs.${productIndividualPrice}</span>
                                   <span class="cartRight">
                                        <button onclick="increaseQuantity(${cart.pro_id})">+</button>
                                        <span>${cart.pro_quantity}</span>
                                        <button onclick="dereaseQuantity(${cart.pro_id})">-</button>
                                   </span>`

        addedProducts.appendChild(cartContainer)
    })
}

const addCart = (id) => {
    const isCartExist = carts.find((cart) => cart.pro_id == id)
    if (!isCartExist) {
        // getProduct According to id
        const product = document.getElementById(id)
        const productImg = product.children[0].attributes[0].value;
        const productName = product.children[1].innerHTML;
        const productPrice = parseInt(product.children[2].children[0].innerHTML);

        // create object for that product
        const productObj = {
            pro_id: id,
            pro_img: productImg,
            pro_name: productName,
            pro_price: productPrice,
            pro_quantity: 1
        }
        carts.push(productObj)
    }
    else {
        alert("Cart Already Exist")
    }
    updateTotalPrice()
    updateDisplay()
    updateMyCart()
}