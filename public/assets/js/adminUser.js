const TBODY = document.querySelector('tbody');

loadUsers();
let userList = [];
let editUser = [];

if (localStorage.editUser) {
  editUser = JSON.parse(localStorage.editUser);
}

function loadUsers() {
  fetch("http://localhost:3000/api/users")
    .then(response => response.json())
    .then(users => {
      userList = users;
      localStorage.setItem("userList", JSON.stringify(userList));
      users.forEach(user => {
        let tr = document.createElement('tr');
        tr.dataset.id = user.id;
        tr.innerHTML = `
        <tr>
        <td>
          <div class="d-flex px-2 py-1">
            <div>
              <img src="${user.image}" class="avatar avatar-sm me-3" alt="${user.id}">
            </div>
            <div class="d-flex flex-column justify-content-center">
              <h6 class="mb-0 text-sm">${user.id}</h6>
            </div>
          </div>
        </td>
        <td>
          <h6 class="mb-0 text-sm">${user.name}</h6>
          <p class="text-xs text-secondary mb-0">${user.user}</p>
        </td>
        <td class="align-middle text-center">
          <span class="text-secondary text-xs font-weight-bold">${user.rol}</span>
        </td>
        <td class="align-middle text-center">
          <span class="text-secondary text-xs font-weight-bold">${user.password}</span>
        </td>
        <td class="align-middle">
          <a href="#"  onclick="edituserAction(${user.id})"><i class="fas fa-edit"></i></a> 
          <a href="#" onclick="deleteuser(${user.id})"><i class="fas fa-trash"></i></a>
        </td>
      </tr>`
      TBODY.appendChild(tr);
      });
    })
    .catch(error => console.log('error', error));
}

function edituserAction(id) {
  userList.forEach(user => {
    if (user["id"] == id) {
      localStorage.setItem("editUser", JSON.stringify(user));
      window.location.href = '/edituser.html';
    }
  });
}


function deleteuser(id) {
  fetch("http://localhost:3000/api/users/" + id, { method: 'DELETE' })
    .then(response => response.json())
    .then(user => {
      let div = document.querySelector('tr[data-id="' + id + '"]');
      div.remove();

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario borrado',
        html: `<p><strong>${user.name}</strong></p>`,
        showConfirmButton: false,
        timer: 1500
    })
    })
    .catch(error => console.log('error', error));
    
}