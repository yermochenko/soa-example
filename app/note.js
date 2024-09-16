const express = require('express');
const router = express.Router();

router.get('/', function(req, resp) {
    resp.statusCode = 200;
    resp.setHeader('Content-Type', 'application/json');
    let notes = [{
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
    resp.json(notes);
});

module.exports = router;
