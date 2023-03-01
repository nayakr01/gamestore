const PROFILE = document.getElementById('sing-in');

if(localStorage.login) {
    login = JSON.parse(localStorage.login);
    login.forEach(user => {
        PROFILE.innerHTML = `<a href="profile.html" class="active">Perfil <img src="${user.image}" alt=""></a>`;
    });
}