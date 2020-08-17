let carts = JSON.parse(window.localStorage.getItem("carts")) ? JSON.parse(window.localStorage.getItem("carts")) : [];
const table = document.querySelector(".account table");
const pay = document.querySelector(".pay");
let html = `<tr>
              <th>Order</th>
              <th>Date</th>
              <th>Tình trạng thanh toán</th>
              <th>Tổng</th>
              <th>Nợ</th>
            </tr>`;
if(carts.length > 0) {
  for (let i = 0; i < carts.length; i++) {
    let total = carts[i].price * carts[i].count;
    let status = carts[i].status ? 'Đã thanh toán' : 'Chưa thanh toán';
    let date = new Date();
    html += `<tr> 
                <td>${i+1}</td>
                <td>${carts[i].date}</td>
                <td>${status}</td>
                <td>${total}<sup>đ </sup></td>
                <td>${total}<sup>đ </sup></td>
              </tr>`;
  }
  table.innerHTML = html;
} else {
  table.innerHTML = html;
}
pay.onclick = () => handleRemoveCart();

handleRemoveCart = () => {
  window.localStorage.removeItem("carts");
}