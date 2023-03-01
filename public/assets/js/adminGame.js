const TBODY = document.querySelector('tbody');
const TH = document.querySelectorAll('th');

let gameList = [];
let editGame = [];

if (localStorage.editGame) {
  editGame = JSON.parse(localStorage.editGame);
}

loadGames();

function loadGames() {
  fetch("http://localhost:3000/api/games")
    .then(response => response.json())
    .then(games => {
      gameList = games;
      localStorage.setItem("gameList", JSON.stringify(gameList));
      games.forEach(game => {
        let tr = document.createElement('tr');
        tr.dataset.id = game.id;
        tr.innerHTML = `
        <tr>
        <td>
          <div class="d-flex px-2 py-1">
            <div>
              <img src="${game.image}" class="avatar avatar-sm me-3" alt="${game.id}">
            </div>
            <div class="d-flex flex-column justify-content-center">
              <h6 class="mb-0 text-sm">${game.id}</h6>
            </div>
          </div>
        </td>
        <td>
        <h6 class="mb-0 text-sm">${game.name}</h6>
        <p class="text-xs text-secondary mb-0">${game.gender}</p>
        </td>
        </td>
        <td class="align-middle text-center">
        <span class="text-secondary text-xs font-weight-bold">${game.price} €</span>
      </td>
        <td class="align-middle text-center">
        <span class="text-secondary text-xs font-weight-bold">${game.ranking} </span>
      </td>
      <td class="align-middle text-center">
      <span class="text-secondary text-xs font-weight-bold">${game.downloads} M</span>
        <td class="align-middle">
          <a href="#"  onclick="editGameAction(${game.id})"><i class="fas fa-edit"></i></a> 
          <a href="#" onclick="deleteGame(${game.id})"><i class="fas fa-trash"></i></a>
        </td>
      </tr>`
      TBODY.appendChild(tr);
      });
    })
    .catch(error => console.log('error', error));
}

function editGameAction(id) {
  gameList.forEach(game => {
    if (game["id"] == id) {
      localStorage.setItem("editGame", JSON.stringify(game));
      window.location.href = '/editGame.html';
    }
  });
}


function deleteGame(id) {
  fetch("http://localhost:3000/api/games/" + id, { method: 'DELETE' })
    .then(response => response.json())
    .then(game => {
      let div = document.querySelector('tr[data-id="' + id + '"]');
      div.remove();

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Juego borrado',
        html: `<p><strong>${game.name}</strong></p>`,
        showConfirmButton: false,
        timer: 1500
    })
    })
    .catch(error => console.log('error', error));
}