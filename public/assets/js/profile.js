const SHOPPING_CART = document.getElementById('shopping-cart');
const DIV_ORDERS = document.querySelector('.item');
const DIV_PROFILE = document.getElementById('main-profile');

let orders = [];

let login = [];

if (localStorage.orders) {
    orders = JSON.parse(localStorage.orders);
}

if (localStorage.login) {
    login = JSON.parse(localStorage.login);
}

if (localStorage.cart) {
    cart = JSON.parse(localStorage.cart);
    SHOPPING_CART.innerHTML = '<i class="fa fa-shopping-cart"></i> ' + cart;
}

loadProfile();
loadOrders();

function loadOrders() {
    if (orders == '') {
        DIV_ORDERS.innerHTML += '<h4>No hay ningún pedido</h4>';
    } else {
        orders.forEach(game => {
            DIV_ORDERS.innerHTML += `        
            <ul>
            <li><img src="${game.image}" alt="" class="templatemo-item"></li>
            <li><h4>${game.name}</h4><span>${game.gender}</span></li>
            <li><h4></h4><span></span></li>
            <li><h4>Precio</h4><span>${game.price} €</span></li>
            <li>
                <div class="main-border-button">
                    <a href="#" class="code"></a>
                </div>
            </li>
        </ul>`
        });
    }

}

function loadProfile() {
    login.forEach(user => {
    if(user.rol == "Administrador") {
        DIV_PROFILE.innerHTML = `
        <div class="col-lg-4">
            <img src="${user.image}" alt="" style="border-radius: 23px;">
        </div>
        <div class="col-lg-4 align-self-center">
         <div class="main-info header-text">
           <span id="rol">${user.rol}</span>
           <h4>${user.name}</h4>
           <p>Usuario: ${user.user}</p>
        </div>
        </div>
        <div class="col-lg-4 align-self-center">
            <ul>
                <li>Adminstración: <span><a href="/adminGames.html"><i class="fa fa-tachometer" aria-hidden="true"></a></i></span></li>
                <li>Cerrar sesión: <span><a href="#" onclick="signOut()"><i class="fa fa-sign-out" aria-hidden="true"></a></i></span></li>
                <li>GAMESTORE <span><i class="fa-solid fa-gamepad"></i></span></li>
            </ul>
        </div>`
    } else {
        DIV_PROFILE.innerHTML = `
        <div class="col-lg-4">
            <img src="${user.image}" alt="" style="border-radius: 23px;">
        </div>
        <div class="col-lg-4 align-self-center">
         <div class="main-info header-text">
           <span id="rol">${user.rol}</span>
           <h4>${user.name}</h4>
           <p>Usuario: ${user.user}</p>
        </div>
        </div>
        <div class="col-lg-4 align-self-center">
            <ul>
                <li>Cerrar sesión: <span><a href="#" onclick="signOut()"><i class="fa fa-sign-out" aria-hidden="true"></a></i></span></li>
                <li>GAMESTORE <span><i class="fa-solid fa-gamepad"></i></span></li>
            </ul>
        </div>`
        }
    });
}

function generateCode() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 15) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

document.querySelectorAll('.code').forEach(button => {
    window.addEventListener('load', () => {
        button.classList.add('disabled');
        button.textContent = generateCode();

        setInterval(function () {
            document.querySelectorAll('.main-border-button').forEach(div => {
                div.classList.add('border-no-active');
            });
        }, 7000);
    });
});

function signOut() {
    localStorage.removeItem("login");
    localStorage.removeItem("orders");

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sesión cerrada',
        showConfirmButton: false,
        timer: 1500
    })
    setInterval(function () {
        window.location = '/index.html';
    }, 1500);
}