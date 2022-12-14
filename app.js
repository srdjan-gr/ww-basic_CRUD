// import users from './data.js';

const tableBody = document.getElementById('tableBody');

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const status = document.getElementById('status');
const btnAddUser = document.getElementById('addUser');
const btnUpdateUser = document.getElementById('updateUser');
const btnCancelUser = document.getElementById('cancelUser');
const message = document.getElementById('message');
const userCount = document.getElementById('userCount');

const myModal = new bootstrap.Modal('#exampleModal');
const myModalLabel = document.getElementById('exampleModalLabel');

let updateIdx = null;

// const users = [
//     {
//         name: 'Marija',
//         lastName: 'Petkovic',
//         age: 28,
//         status: 'Admin'
//     },
//     {
//         name: 'Janko',
//         lastName: 'Jankovic',
//         age: 24,
//         status: 'User'
//     },
//     {
//         name: 'Nemanja',
//         lastName: 'Mitic',
//         age: 32,
//         status: 'User'
//     },
// ];

// On load read content
window.addEventListener('load', () => {

    let ls = localStorage.getItem('ww_basic_crud');;

    if (ls == null) {
        ls = localStorage.setItem('ww_basic_crud', JSON.stringify(''));
    }

    showUserCount();
    readUser();
})

// click on button addUser call createUser function
btnAddUser.addEventListener('click', () => {
    createUser();
    showUserCount();
})

// saves edited user informations
btnUpdateUser.addEventListener('click', () => {

    if (firstName.value != '' && lastName.value != '' && status.value != '') {

        if (Number(age.value)) {

            let users = JSON.parse(localStorage.getItem('ww_basic_crud'));

            users[updateIdx].name = firstName.value;
            users[updateIdx].lastName = lastName.value;
            users[updateIdx].age = age.value;
            users[updateIdx].status = status.value;

            localStorage.setItem('ww_basic_crud', JSON.stringify(users));

            btnUpdateUser.hidden = true;
            btnAddUser.hidden = false;

            clearFields();
            readUser();
            myModal.toggle()

        } else {
            alert('"Age" input is not a number!!!')
        }
    } else {
        alert('All fields are required!!!')
    }
})

// close modal and reset buttons display settings
btnCancelUser.addEventListener('click', () => {
    btnUpdateUser.hidden = true;
    btnAddUser.hidden = false;
    clearFields();

    updateIdx = null
})


const clearFields = () => {
    firstName.value = '',
        lastName.value = '',
        age.value = '',
        status.value = ''
}


const createUser = () => {

    myModalLabel.innerHTML = 'Add user';

    if (firstName.value != '' && lastName.value != '' && status.value != '') {

        if (Number(age.value)) {

            const newEntry = {
                name: firstName.value,
                lastName: lastName.value,
                age: age.value,
                status: status.value
            };

            let users = JSON.parse(localStorage.getItem('ww_basic_crud'));

            users = [...users, newEntry];
            localStorage.setItem('ww_basic_crud', JSON.stringify(users));

            clearFields();
            readUser();
            myModal.toggle()

        } else {
            alert('"Age" input is not a number!!!')
        }
    } else {
        alert('All fields are required!!!')
    }
}


const readUser = () => {
    tableBody.innerHTML = '';
    message.innerHTML = '';


    let ls = JSON.parse(localStorage.getItem('ww_basic_crud'));
    console.log(ls)

    if (ls == null) {
        localStorage.setItem('ww_basic_crud', JSON.stringify(''));
    }

    if (ls != '') {

        ls.forEach((user, idx) => {
            tableBody.innerHTML += `
                <tr>
                    <th scope="row">${idx + 1}</th>
                    <td>${user.name}</td>
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.status}</td>
                    <td><button class="btnCustom hoverCustom  text-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="updateUser(${idx})"><i class="bi bi-pencil-square"></i></button></td>
                    <td><button class="btnCustom hoverCustom text-danger" onClick="deleteUser(${idx})"><i class="bi bi-trash3"></i></button></td>
                </tr>
            `;
        });

    } else {
        message.innerHTML = `
            <h2 class ='fs-5 mt-3 text-white'>No users to show.</h2>
        `;
    }
}


const updateUser = (idx) => {

    myModalLabel.innerHTML = 'Update user';

    let users = JSON.parse(localStorage.getItem('ww_basic_crud'));

    firstName.value = users[idx].name,
        lastName.value = users[idx].lastName,
        age.value = users[idx].age,
        status.value = users[idx].status

    btnUpdateUser.hidden = false;
    btnAddUser.hidden = true;

    updateIdx = idx;
}

// kako proslediti ime na klik sa template literals
const deleteUser = (idx) => {

    let users = JSON.parse(localStorage.getItem('ww_basic_crud'));

    if (confirm(`Are you sure you want to delete user ?`)) {
        users.splice(idx, 1);

        localStorage.setItem('ww_basic_crud', JSON.stringify(users));
    }

    readUser();
    showUserCount();
}

const showUserCount = () => {
    let users = JSON.parse(localStorage.getItem('ww_basic_crud'));

    userCount.innerHTML = `<h3 class ='fs-6 m-0 text-white position-absolute top-50 start-50 translate-middle'>${users.length}</h3>`;
}