const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// let id = '5bb368a765123443ec441d2a';
//
// if(!ObjectID.isValid(id))
//     console.log('ID not valid');
//
// Todo.find({
//     _id: id
// }).then((todo) => {
//     console.log('Todos', todo);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todos', todo);
// });
//
// Todo.findById(id).then((todo) => {
//     if (!todo)
//         return console.log('Id not found');
//     console.log('Todos', todo);
// }).catch((e) => console.log(e));

User.findById('5bb35bf18e495632dd3263bc').then((user) => {
    if(!user)
        return console.log('Unable to find user');

    console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
    console.log(e);
});