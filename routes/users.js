let { Router } = require('express');
let router = Router();

const USERS = require('../data/users');
let lastId = Math.max(...USERS.map(user => user.id));
const PROPERTIES = ["user", "name", "password", "image", "rol"];

router.get('/', (req, res) => {
    res.json(USERS);
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    let user = USERS.filter(u => u.id == id)[0];
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({
            succes: false,
            message: "No encuentra el usuario con la id: " + id
        });
    }
});

router.post('/', (req, res) => {
    let user = req.body;
    if (user.name && user.password) {
        if (Object.keys(user).every(property => PROPERTIES.includes(property))) {
            user.id = ++lastId;
            user.rol = 'Usuario';
            USERS.push(user);
            res.status(201).json(user);
        } else {
            res.status(422).json({
                succes: false,
                message: "El objeto no emplea la estructura adecuada."
            });
        }
    } else {
        res.status(422).json({
            succes: false,
            error: "Se requiere: 'name' y 'password'."
        });
    }
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let user = USERS.filter(u => u.id == id)[0];
    if (user) {
        let newData = req.body;
        if (Object.keys(newData).every(property => PROPERTIES.includes(property))) {
            for (let property in newData) {
                user[property] = newData[property];
            }
            res.status(200).json(user);
        } else {
            res.status(422).json({
                succes: false,
                error: "El objeto no emplea la estructura adecuada."
            });
        }

    } else {
        res.status(404).json({
            succes: false,
            message: "No encuentra el usuario con la id: " + id
        })
    }
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let index = USERS.map(u => u.id).indexOf(parseInt(id));
    if (index >= 0) {
        res.status(200).json(
            USERS.splice(index, 1)[0]
        )
    } else {
        res.status(404).json({
            succes: false,
            message: "No encuentra el usuario con la id: " + id
        });
    }
});

module.exports = router;