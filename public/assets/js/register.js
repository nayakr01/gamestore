const images = ["https://i.imgur.com/yex9sNR.png", "https://i.imgur.com/fII9U0I.png", "https://i.imgur.com/2lf9rOR.png", "https://i.imgur.com/71aiMoH.png", "https://i.imgur.com/71aiMoH.png", "https://i.imgur.com/oAw83w1.png", "https://i.imgur.com/IRO4ThY.png"];
let userList = [];

if (localStorage.userList) {
    userList = JSON.parse(localStorage.userList);
}

createUser();

function createUser() {
    let image = images[Math.floor(Math.random() * images.length)];

    document.create_user.addEventListener('submit', (e) => {
        e.preventDefault();

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let newUser = JSON.stringify({
            "user": create_user.user.value,
            "name": create_user.name.value,
            "password": create_user.password.value,
            "image": image,
            "rol": "Usuario"
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: newUser,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/api/users", requestOptions)
            .then(response => response.json())
            .then(user => {
                userList.push(user);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Usuario registrado',
                    showConfirmButton: false,
                    timer: 1500
                })
                setInterval(function () {
                    window.location = '/login.html';
                }, 1500);
            })
            .catch(error => console.log('error', error));

            
    });
}