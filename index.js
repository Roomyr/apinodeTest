const connection = require('./config/conexion');

const express = require('express');
const cors = require('cors');
const port = (process.env.port || 3000);

const app = express();

app.use(cors());

app.use(express.json());

app.set('port', port);

const route = require('express').Router();

// ****************** GET ALL CARDS
route.get('/', function (req, res) {
    // res.send('get route');
    console.log('all cards');
    let sql = 'select * from card';
    connection.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows);
        }
    });
});

// ****************** GET ONE CARD
route.get('/:id', function (req, res) {
    const { id } = req.params;
    let sql = 'select * from card where idcard = ?';
    connection.query(sql, [id], (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json(rows);
        }
    });
});

// ****************** POST A CARD
route.post('/', (req, res) => {
    const { imgUrl, summary, assignees, rate, postedBy } = req.body;
    let sql = `insert into card(imgUrl, summary, assignees, rate, postedBy) values ('${imgUrl}', '${summary}', '${assignees}', ${rate}, '${postedBy}')`;
    connection.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json({ status: 'card added' });
        }
    });
});

// ****************** DELETE A CARD
route.delete('/:id', (req, res) => {
    const { id } = req.params;
    sql = `delete from card where idcard = ${id}`;
    connection.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json({ status: 'card deleted' });
        }
    });
});

// ****************** UPDATE A CARD
route.put('/:id', (req, res) => {
    const { id } = req.params;
    const { imgUrl, summary, assignees, rate, postedBy } = req.body;
    sql = `update card set
    imgUrl = '${imgUrl}',
    summary = '${summary}',
    assignees = '${assignees}',
    rate = ${rate},
    postedBy = '${postedBy}'
    where idcard = ${id}`;
    connection.query(sql, (err, rows, fields) => {
        if (err) throw err;
        else {
            res.json({ status: 'card updated' });
        }
    });
});

app.use('/card', route);

app.listen(app.get('port'), (err) => {
    if (err) {
        console.log('Error starting server => ', err);
    } else {
        console.log('Server ready!!! :) ');
    }
});