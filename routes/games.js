let { Router } = require('express');
let router = Router();

const GAMES = require('../data/games');
let lastId = Math.max(...GAMES.map(game => game.id));
const PROPERTIES = ["name", "image", "gender", "description", "price", "ranking", "downloads"];

router.get('/', (req,res)=>{
    res.json(GAMES);
});

router.get('/details/:id', (req, res) => {
    let id = req.params.id;
    let game = GAMES.filter(g => g.id == id)[0];
    if (game) {
        res.status(200).json(game);
    } else {
        res.status(404).json({
            succes: false,
            message: "No encuentra el juego con la id: " + id
        });
    }
});

router.post('/', (req, res) => {
    let game = req.body;
    if (game.name && game.image && game.gender && game.description && game.price && game.ranking && game.downloads) {
        if (Object.keys(game).every(property => PROPERTIES.includes(property))) {
            game.id = ++lastId;
            GAMES.push(game);
            res.status(201).json(game);
        } else {
            res.status(422).json({
                succes: false,
                message: "El objeto no emplea la estructura adecuada."
            });
        }
    } else {
        res.status(422).json({
            succes: false,
            error: "Se requiere: 'name', 'image', 'gender', 'description', 'price', 'ranking' y 'downloads'."
        });
    }
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let game = GAMES.filter(g => g.id == id)[0];
    if (game) {
        let newData = req.body;
        if (Object.keys(newData).every(property => PROPERTIES.includes(property))) {
            for (let property in newData) {
                game[property] = newData[property];
            }
            res.status(200).json(game);
        } else {
            res.status(422).json({
                succes: false,
                error: "El objeto no emplea la estructura adecuada."
            });
        }

    } else {
        res.status(404).json({
            succes: false,
            message: "No encuentra el juego con la id: " + id
        })
    }
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let index = GAMES.map(g => g.id).indexOf(parseInt(id));
    if (index >= 0) {
        res.status(200).json(
            GAMES.splice(index, 1)[0]
        )
    } else {
        res.status(404).json({
            succes: false,
            message: "No encuentra el juego con la id: " + id
        });
    }
});

module.exports = router;