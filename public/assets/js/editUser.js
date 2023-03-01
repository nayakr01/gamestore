let user = [];

if (localStorage.editUser) {
    user = JSON.parse(localStorage.editUser);
}

updateUser();

function updateUser() {
        update_user.id.value = user.id;
        update_user.user.value = user.user;
        update_user.name.value = user.name;
        update_user.password.value = user.password;
        update_user.image.value = user.image;
        update_user.rol.value = user.rol;

        document.update_user.addEventListener('submit', (e) => {
            e.preventDefault();

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let newDataUser = JSON.stringify({
                "user": update_user.user.value,
                "name": update_user.name.value,
                "password": update_user.password.value,
                "image": update_user.image.value,
                "rol": update_user.rol.value
            });

            let requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: newDataUser,
                redirect: 'follow'
            };

            fetch("http://localhost:3000/api/users/" + user.id, requestOptions)
                .then(response => response.json())
                .catch(error => console.log('error', error));

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Usuario editado',
                    showConfirmButton: false,
                    timer: 1500
                })
                setInterval(function () {
                    window.location = '/adminUsers.html';
                }, 1500);
        });
}