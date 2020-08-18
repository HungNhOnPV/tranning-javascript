let carts = JSON.parse(window.localStorage.getItem("carts"))
  ? JSON.parse(window.localStorage.getItem("carts"))
  : [];
const table = document.querySelector(".cart table");
const removeCart = document.querySelector(".cart__remove");
const cartPay = document.querySelector(".cart__pay");
let html = `<tr>
              <th>Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Tổng số</th>
              <th>Xóa</th>
            </tr>`;
if (carts.length > 0) {
  for (let i = 0; i < carts.length; i++) {
    let total = carts[i].price * carts[i].count;
    html += `<tr class="tr"> 
    <td class="cart__image" style="background: url(${carts[i].image}) no-repeat center; background-size: contain"> </td>
    <td class="cart__title">${carts[i].title} </td>
    <td class="cart__price">${carts[i].price}<sup>đ </sup></td>
    <td class="cart__count"><span>${carts[i].count} </span></td>
    <td class="cart__total">${total}<sup>đ </sup></td>
    <td class="cart__trash"> <i class="fas fa-trash-alt"></i>
    </td>
  </tr>`;
  }
  table.innerHTML = html;
} else {
  table.innerHTML = html;
}
removeCart.onclick = () => handleRemoveCart();

handleRemoveCart = () => {
  window.localStorage.removeItem("carts");
};
cartPay.onclick = () => handleCartPay();

handleCartPay = () => {
  !carts[0]
    ? alert("Không có sản phẩm nào trong giỏ hàng!")
    : location.assign(
        "http://127.0.0.1:5500/html/paymentInformation/paymentInformation.html"
      );
};
