const DIV_POPULAR_GAMES = document.getElementById('most-popular');
const SHOPPING_CART = document.getElementById('shopping-cart');

if (localStorage.cart) {
  cart = JSON.parse(localStorage.cart);
  SHOPPING_CART.innerHTML = '<i class="fa fa-shopping-cart"></i> ' + cart;
}

loadPopularGames();

function loadPopularGames() {
    fetch("http://localhost:3000/api/games")
        .then(response => response.json())
        .then(games => {
            games.forEach(game => {
                if (game.ranking == "10") {
                    DIV_POPULAR_GAMES.innerHTML += `                
                    <div class="col-lg-3 col-sm-6">
                    <div class="item">
                      <img src="${game.image}" alt="${game.name}">
                      <h4>${game.name}<br><span>${game.gender}</span></h4>
                      <ul>
                        <li><i class="fa fa-star"></i> ${game.ranking}</li>
                        <li><i class="fa fa-shopping-cart"></i> ${game.price} €</li>
                      </ul>
                    </div>
                  </div>`
                }
            });
        })
        .catch(error => console.log('error', error));
}