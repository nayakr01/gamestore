let userList = [];

let login = [];

if (localStorage.userList) {
    userList = JSON.parse(localStorage.userList);
}

if (localStorage.login) {
    login = JSON.parse(localStorage.login);
}

loadUsers();

function loadUsers() {
    fetch("http://localhost:3000/api/users")
        .then(response => response.json())
        .then(users => {
            userList = users;
            localStorage.setItem("userList", JSON.stringify(userList));
        })
        .catch(error => console.log('error', error));
}

function signIn() {
    document.forms.login.addEventListener('submit', (e) => {
        e.preventDefault();
        userList.forEach((user) => {
            if (user.user.toLowerCase() == document.forms.login.name.value.toLowerCase() && user.password == document.forms.login.password.value) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sesión iniciada',
                    showConfirmButton: false,
                    timer: 1500
                })
                setInterval(function () {
                    window.location = '/index.html';
                }, 1500);

                login.push(user);
                localStorage.setItem("login", JSON.stringify(login));
                localStorage.removeItem("userList");
            }
        });
    });
}