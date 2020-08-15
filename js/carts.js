$(document).ready(function () {
  let carts = JSON.parse(window.localStorage.getItem("carts")) ? JSON.parse(window.localStorage.getItem("carts")) : [];
  const table = document.querySelector(".cart table");
  const removeCart = document.querySelector(".cart__remove");
  let html = `<tr>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng số</th>
                <th>Xóa</th>
              </tr>`;
  if(carts.length > 0) {
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
    </tr>`
    }
    table.innerHTML = html;
  } else {
    table.innerHTML = html;
  }
  removeCart.onclick = () => handleRemoveCart();
});

handleRemoveCart = () => {
  window.localStorage.removeItem("carts");
}
