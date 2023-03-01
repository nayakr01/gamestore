# INTRODUCCIÓN

He creado una API para simular una tienda de videojuegos de ordenador con distintos usuarios con diferentes roles. 

Cada juego tiene los siguientes datos:
- id, nombre, imagen, género, descripción, precio, ranking y descargas.

En el inicio de la página aparacerá los juegos más populares, los que tengan el número más alto del ranking.
En el apartado de juegos, se mostrarán todos los juegos existentes en la API y también las novedades, los juegos que tienen menos descargas.

Cada usuario tiene los siguientes datos:
- id, usuario, nombre completo, contraseña, imagen y rol.

Para poder comprar un juego no es necesario tener una cuenta pero si quieres ver tus pedidos sí.
Los usuarios con el rol "Usuario" solo podrán acceder a la tienda para comprar juegos y tienen un perfil personalizado donde podrán ver aquellos juegos que han adquirido.
Los usuarios con el rol "Administrador" podrán también comprar juegos pero desde su perfil podrán acceder al panel de administración, dónde pueden gestionar tanto los juegos como los usuarios.
Para poder cerrar sesión tendrán dirigirse a su perfil.

# INSTALACIÓN

Ejecutar por consola en la raíz del proyecto:

$ npm i

$ npm run dev

$ Ir a http://localhost:3000
