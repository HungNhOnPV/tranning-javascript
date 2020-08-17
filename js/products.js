fetch("http://localhost:3000/products")
  .then(res => res.json())
  .then(products => myFunction(products))
  .catch( error => console.error('error:', error) );

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
      } else {
        if(searchIndex(value) === -1) {
          product.date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
          product.status = false;
          product.count = 1;
          carts.push(product);
        } else {
          carts[searchIndex(value)].count++;
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
