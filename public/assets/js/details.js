const DIV_GAME_DETAILS = document.getElementById('game-details');
const SHOPPING_CART = document.getElementById('shopping-cart');

let cart = 1;
let game = [];
let playCart = [];

if (localStorage.playCart) {
  playCart = JSON.parse(localStorage.playCart);
}

if (localStorage.game) {
  game = JSON.parse(localStorage.game);
}

if (localStorage.cart) {
  cart = JSON.parse(localStorage.cart);
  SHOPPING_CART.innerHTML = '<i class="fa fa-shopping-cart"></i> ' + cart++;
}

DIV_GAME_DETAILS.innerHTML += `  
      <div class="row">
      <div class="col-lg-12">
        <div class="feature-banner header-text">
          <div class="row">
            <div class="col-lg-12">
              <img src="${game.image}" alt="${game.name}" style="border-radius: 23px;">
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="game-details">
      <div class="row">
        <div class="col-lg-12">
          <h2>DETALLES DE ${game.name}</h2>
        </div>
        <div class="col-lg-12">
          <div class="content">
            <div class="row">
              <div class="col-lg-6">
                <div class="left-info">
                  <div class="left">
                    <h4>${game.name}</h4>
                    <span>${game.gender}</span>
                  </div>
                  <ul>
                    <li><i class="fa fa-star"></i> ${game.ranking}</li>
                    <li><i class="fa fa-shopping-cart"></i> ${game.price} €</li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="right-info">
                  <ul>
                    <li><i class="fa fa-star"></i> ${game.ranking}</li>
                    <li><i class="fa fa-shopping-cart"></i> ${game.price} €</li>
                    <li><i class="fa fa-download"></i> ${game.downloads} M</li>
                    <li><i class="fa fa-gamepad"></i> ${game.gender}</li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-12">
                <p>${game.description}</p>
              </div>
              <div class="col-lg-12">
                <div class="main-border-button">
                  <a href="#" onclick="shoppingCart()">Compra ahora</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`

function shoppingCart() {
  playCart.push(game);
  localStorage.setItem("playCart", JSON.stringify(playCart));
  localStorage.setItem("cart", JSON.stringify(cart));
  SHOPPING_CART.innerHTML = '<i class="fa fa-shopping-cart"></i> ' + cart++;
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Juego añadido',
    html: `<p><strong>${game.name}</strong></p>`,
    showConfirmButton: false,
    timer: 1500
})
setInterval(function () {
  window.location = '/cart.html';
}, 1500);
}
