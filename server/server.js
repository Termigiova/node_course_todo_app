require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

let app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (request, res) => {
    let todo = new Todo({
        text: request.body.text
    });

    todo.save().then((todo) => {
        res.send(todo);
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos', (request, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (request, res) => {
    let id = request.params.id;

    if (!ObjectID.isValid(id))
        return res.status(404).send();

    Todo.find({
        _id: id
    }).then((todo) => {
        if (!todo)
            return res.status(404).send();

        res.send({todo});
    }).catch((e) => {
        res.status(404).send();
    });
});

app.delete('/todos/:id', (request, res) => {
    let id = request.params.id;

    if(!ObjectID.isValid(id))
        return res.status(404).send();

    Todo.findOneAndDelete({_id: id}).then((todo) => {
        if(!todo)
            return res.status(404).send();

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
});

app.patch('/todos/:id', (request, response) => {
    let id = request.params.id;
    let body = _.pick(request.body, ['text', 'completed']);

    if (!ObjectID.isValid(id))
        return response.status(404).send();

    if(_.isBoolean(body.completed) && body.completed)
        body.completedAt = new Date().getTime();
    else {
        body.completed = false;
        body.completedAt = null;
    }

     Todo.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).then((todo) => {
        if(!todo)
            return response.status(404).send();

        response.send({todo});
     }).catch((e) => {
        response.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};