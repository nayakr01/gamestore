const DIV_GAMES = document.getElementById('our-games');
const DIV_NEWS_GAMES = document.querySelector('.owl-stage');
const SHOPPING_CART = document.getElementById('shopping-cart');

let gameList = [];

if (localStorage.cart) {
  cart = JSON.parse(localStorage.cart);
  SHOPPING_CART.innerHTML = '<i class="fa fa-shopping-cart"></i> ' + cart;
}

loadGames();
loadNewsGames();

function loadGames() {
  fetch("http://localhost:3000/api/games")
    .then(response => response.json())
    .then(games => {
      gameList = games;
      games.forEach(game => {
        DIV_GAMES.innerHTML += `                
                    <div class="col-lg-3 col-sm-6">
                      <div class="item">
                        <div class="thumb">
                          <img src="${game.image}" alt=""${game.name}>
                          <div class="hover-effect">
                            <div class="content">
                              <ul>
                                <li><a href="#" onclick=detailsGame(${game.id})><i class="fa fa-shopping-cart"></i> ${game.price} €</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div class="down-content">
                            <h4>${game.name}<br><span>${game.gender}</span></h4> 
                        </div> 
                      </div>
                    </div>
                    </div>`
      });
    })
    .catch(error => console.log('error', error));
}

function loadNewsGames() {
  fetch("http://localhost:3000/api/games")
    .then(response => response.json())
    .then(games => {
      games.forEach(game => {
        if (game.downloads <= "11") {
          DIV_NEWS_GAMES.innerHTML += `  
              <div class="owl-item active">              
              <div class="item">
                <div class="thumb">
                  <img src="${game.image}" alt="${game.name}">
                  <div class="hover-effect">
                    <h6>${game.downloads}M Downloads</h6>
                  </div>
                </div>
                <h4>${game.name}<br><span>${game.gender}</span></h4>
              </div>
              </div>`
        }
      });
    })
    .catch(error => console.log('error', error));
}

function detailsGame(id) {
  gameList.forEach(game => {
    if (game["id"] == id) {
      localStorage.setItem("game", JSON.stringify(game));
      window.location.href = '/details.html';
    }
  }); 
}