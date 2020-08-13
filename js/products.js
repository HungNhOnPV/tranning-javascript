$.ajax({
  method: "GET",
  url: "http://localhost:3000/products",
  data: null,
  success: function(msg){
    window.localStorage.setItem("products", JSON.stringify(msg));
  },
  dataType: 'json'
})
  // .done(function( msg ) {
    // 
  // });
