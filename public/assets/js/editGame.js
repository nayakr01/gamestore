let game = [];

if (localStorage.editGame) {
    game = JSON.parse(localStorage.editGame);
}

updateGame();

function updateGame() {
        update_game.id.value = game.id;
        update_game.name.value = game.name;
        update_game.image.value = game.image;
        update_game.gender.value = game.gender;
        update_game.description.value = game.description;
        update_game.price.value = game.price;
        update_game.ranking.value = game.ranking;
        update_game.downloads.value = game.downloads;

        document.update_game.addEventListener('submit', (e) => {
            e.preventDefault();

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let newDataGame = JSON.stringify({
                "name": update_game.name.value,
                "image": update_game.image.value,
                "gender": update_game.gender.value,
                "description": update_game.description.value,
                "price": update_game.price.value,
                "ranking": update_game.ranking.value,
                "downloads": update_game.downloads.value
            });

            let requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: newDataGame,
                redirect: 'follow'
            };

            fetch("http://localhost:3000/api/games/" + game.id, requestOptions)
                .then(response => response.json())
                .catch(error => console.log('error', error));

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Juego editado',
                    showConfirmButton: false,
                    timer: 1500
                })
                setInterval(function () {
                    window.location = '/adminGames.html';
                }, 1500);
        });
}