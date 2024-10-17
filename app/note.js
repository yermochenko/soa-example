const express = require('express');
const router = express.Router();

const notes = [{
    id: 1,
    text: 'Выполнить лаб. раб. №1 по СОА',
    date: '19.10.2024',
    done: false
}, {
    id: 2,
    text: 'Подготовить реферат по философии',
    date: '21.11.2024',
    done: false
}, {
    id: 3,
    text: 'Сходить в кино',
    date: '31.08.2024',
    done: true
}];

router.get('/', function(req, resp) {
    if(req.query.id) {
        let note = notes.find(n => n.id === parseInt(req.query.id));
        if(note) {
            resp.statusCode = 200;
            resp.setHeader('Content-Type', 'application/json');
            resp.json(note);
        } else {
            resp.statusCode = 404;
            resp.setHeader('Content-Type', 'text/plain');
            resp.send('requested id does not exist');
        }
    } else {
        resp.statusCode = 200;
        resp.setHeader('Content-Type', 'application/json');
        resp.json(notes);
    }
});

module.exports = router;
