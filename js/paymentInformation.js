const pay = document.querySelector(".pay");
const back = document.querySelector(".back");

function getData(jsonForm) {
  var el = document.querySelector("form[name=" + jsonForm + "]");
  var inputs = el.querySelectorAll("input");
  let carts = JSON.parse(localStorage.getItem("carts"));

  var data = {};
  for (var i = 0; i < inputs.length; i++) {
    switch (inputs[i].type) {
      case "radio":
        if (inputs[i].checked) {
          data[inputs[i].name] = inputs[i].value;
        }
        break;
      default:
        data[inputs[i].name] = inputs[i].value;
    }
  }
  data["carts"] = carts;
  return data;
}

pay.onclick = () => handleRemoveCart(getData("jsonForm"));

handleRemoveCart = (data) => {
  // fetch("http://localhost:3000/users", {
  //   method: "POST", // or 'PUT'
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("Success:", data);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
  let http = new XMLHttpRequest();
  http.open("POST", "http://localhost:3000/users");
  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/json");
  // request state change event
  http.onreadystatechange = function () {
    // request completed?
    if (http.readyState !== 4) return;
    console.log(http.status);
    if (http.status === 201) {
      // request successful - show response
      console.log(JSON.parse(http.responseText));
      alert("Thanh toán thành công.");
    } else {
      // request error
      console.log("HTTP error", http.status, http.statusText);
    }
  };
  // start request
  http.send(JSON.stringify(data));
  window.localStorage.removeItem("carts");
};

back.onclick = () => handleExit();

function handleExit() {
  location.assign("http://127.0.0.1:5500/html/products/jewelry.html");
}
