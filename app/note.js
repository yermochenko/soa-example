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

router.post('/', function(req, resp) {
    note = req.body;
    note.id = notes.map(n => n.id).reduce((a, id) => id > a ? id : a, 0) + 1;
    notes.push(note);
    resp.statusCode = 201;
    resp.setHeader('Content-Type', 'application/json');
    resp.json(note);
});

router.put('/', function(req, resp) {
    note = req.body;
    let index = notes.findIndex(n => n.id === note.id);
    if(index >= 0) {
        notes[index] = note;
    }
    resp.statusCode = 204;
    resp.send();
});

router.delete('/', function(req, resp) {
    if(req.query.id) {
        let index = notes.findIndex(n => n.id === parseInt(req.query.id));
        if(index >= 0) {
            notes.splice(index, 1);
            resp.statusCode = 204;
            resp.send();
        } else {
            resp.statusCode = 404;
            resp.setHeader('Content-Type', 'text/plain');
            resp.send('requested id does not exist');
        }
    } else {
        resp.statusCode = 400;
        resp.setHeader('Content-Type', 'text/plain');
        resp.send('there is no param "id"');
    }
});

module.exports = router;
