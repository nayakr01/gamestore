const SHOPPING_CART = document.getElementById('shopping-cart');
const DIV_CART = document.querySelector('.item');
const DIV_BUY = document.querySelectorAll('.item')[1];

let playCart = [];
let orders = [];

if (localStorage.playCart) {
    playCart = JSON.parse(localStorage.playCart);
}

if (localStorage.orders) {
    orders = JSON.parse(localStorage.orders);
}

if (localStorage.cart) {
    cart = JSON.parse(localStorage.cart);
    SHOPPING_CART.innerHTML = '<i class="fa fa-shopping-cart"></i> ' + cart;
}

loadCart();

function loadCart() {
    if (playCart.length == 0) {
        let empty = document.createElement('h4');
        empty.textContent = "El carrito está vacío";
        DIV_CART.appendChild(empty);
    } else {
        let total = 0.0;
        playCart.forEach(game => {
            total += parseFloat(game.price);
        });

        playCart.forEach(game => {
            DIV_CART.innerHTML += `        
            <ul>
                <li><img src="${game.image}" alt="" class="templatemo-item"></li>
                <li><h4>${game.name}</h4><span>${game.gender}</span></li>
                <li><h4>Precio</h4><span>${game.price} €</span></li>
                <li>
                    <div class="main-border-button">
                        <a href="/cart.html" id="deleteGame" onclick=deleteGame(${game.id})><i class="fa fa-trash" aria-hidden="true"></i> Eliminar</a>
                    </div>
                </li>
            </ul>`
        });

        DIV_BUY.innerHTML = ` 
        <ul>
        <ul>
        <li></li>
        <li></li>
        <li></li>
        <li>
        <h4>Precio Total</h4><span>${total.toFixed(2)} €</span></li>
        </li>
        <li>
        <div class="main-border-button">
            <a href="#" onclick="buyGame()"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Comprar</a>
        </div>
        </li>
    </ul>`;

    }
}

function deleteGame(id) {
    playCart.forEach(game => {
        let remove = playCart.filter((g) => g.id !== id);
        playCart = remove;
        localStorage.playCart = JSON.stringify(playCart);
    });

    if (cart > 0) {
        cart--;
        localStorage.cart = JSON.stringify(cart);
    }
}

if (localStorage.cart == 0) {
    localStorage.clear();
    window.location = '/cart.html';
}

function buyGame() {
    playCart.forEach(game => {
        orders.push(game);
    });

    if (localStorage.login) {
        login = JSON.parse(localStorage.login);
        localStorage.setItem("orders", JSON.stringify(orders));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Comprado',
            showConfirmButton: false,
            timer: 1500
        })

        setInterval(function () {
            window.location = '/profile.html';
        }, 1500);
    } else {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Comprado',
            html: `<p>Tu código de juego es: <strong>${generateCode()}</strong></p>`,
            showConfirmButton: true
        })

        setInterval(function () {
            window.location = '/index.html';
        }, 4000);
    }

    localStorage.removeItem('game');
    localStorage.removeItem('cart');
    localStorage.removeItem('playCart');
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