// fetch("http://localhost:3000/products")
//   .then(res => res.json())
//   .then(products => myFunction(products))
//   .catch( error => console.error('error:', error) );
let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/products');
// request state change event
xhr.onreadystatechange = function() {
  // request completed?
  if (xhr.readyState !== 4) return;
  if (xhr.status === 200) {
    // request successful - show response
    myFunction(JSON.parse(xhr.responseText));
  }
  else {
    // request error
    console.log('HTTP error', xhr.status, xhr.statusText);
  }
};
// start request
xhr.send();
function myFunction(products) {
  const productsImg = [
    ...document.querySelectorAll(".products .product .product__image"),
  ];
  const productsTitle = [
    ...document.querySelectorAll(".products .product .product__detail h2"),
  ];
  const productsContent = [
    ...document.querySelectorAll(".products .product .product__detail h3"),
  ];
  const productsPrice = [
    ...document.querySelectorAll(
      ".products .product .product__detail #price"
    ),
  ];
  const productsSale = [
    ...document.querySelectorAll(
      ".products .product .product__detail #sale"
    ),
  ];
  const addBtn = [
    ...document.querySelectorAll(
      ".products .product .product__action #btn"
    ),
  ];
  for (let i = 0; i < productsImg.length; i++) {
    productsImg[i].style.background = `url(${products[i].image}) no-repeat`;
    productsTitle[i].innerHTML = products[i].title.toUpperCase();
    productsContent[i].innerHTML = products[i].content;
    productsPrice[i].innerHTML = products[i].price;
    productsSale[i].innerHTML = " " + products[i].sale;
  }
  addBtn.forEach(
    (el, i) => (el.onclick = () => handleAddToCart(products[i].id, products))
  );
}

function handleAddToCart(value, products) {
  let carts = JSON.parse(window.localStorage.getItem("carts"))
    ? JSON.parse(window.localStorage.getItem("carts"))
    : [];
  let date = new Date();
  products.forEach((product) => {
    if (value === product.id) {
      if (!carts[0]) {
        product.date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        product.status = false;
        product.count = 1;
        carts.push(product);
        alert("Thêm sản phẩm vào giỏ hàng.");
      } else {
        if(searchIndex(value) === -1) {
          product.date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
          product.status = false;
          product.count = 1;
          carts.push(product);
          alert("Thêm sản phẩm vào giỏ hàng.");
        } else {
          carts[searchIndex(value)].count++;
          alert("Thêm sản phẩm vào giỏ hàng.");
        }
      }
    }
  });
  window.localStorage.setItem("carts", JSON.stringify(carts));
}

function searchIndex(value) {
  let carts = JSON.parse(window.localStorage.getItem("carts"));
  let index = -1;
  carts.forEach((cart, i) => {
    if(cart.id === value) index = i;
  });
  return index;
}
