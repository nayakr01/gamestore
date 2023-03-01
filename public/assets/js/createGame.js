const DIV_GAMES = document.getElementById('our-games');

function addGame(game) {
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
    </div>`;
}

function createGame() {
    document.create_game.addEventListener('submit', (e) => {
        e.preventDefault();

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let game = JSON.stringify({
            "name": create_game.name.value,
            "image": create_game.image.value,
            "gender": create_game.gender.value,
            "description": create_game.description.value,
            "price": create_game.price.value,
            "ranking": create_game.ranking.value,
            "downloads": create_game.downloads.value
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: game,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/api/games/", requestOptions)
            .then(response => response.json())
            .then(game => {
                addGame(game);
            })
            .catch(error => console.log('error', error));

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Juego añadido',
                showConfirmButton: false,
                timer: 1500
            })
            setInterval(function () {
                window.location = '/adminGames.html';
            }, 1500);
    });
}