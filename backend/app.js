const express = require('express');
const Note = require('./models/note');
const Quiz = require('./models/quiz');
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();



mongoose.connect(`mongodb+srv://pul21001:${process.env.MONGODB_API_KEY}@cluster0.qcchu6m.mongodb.net/node-angular?retryWrites=true&w=majority`)
    .then(() => {console.log('Connected to database');}).catch(() =>{
        console.log('conection failed');
    });

/**
 * get notes from mongoDb
 */

app.post("api/notes", (req, res, next) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    });
    note.save();
    res.status(201).json({
        message: "Note added successfully"
    })

});

app.get("/api/notes", (req, res, next) => {
    Note.find().then(documents =>{
        res.status(200).json({
            message: "Notes fetched successfully",
            notes: documents
        })
    });
});

app.delete('/api/notes/:id', (req, res, next) =>{
    Note.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: 'Note deleted'});
    });
});

/**
 * get quiz questions from mongoDb
 */

app.post("api/quizs", (req, res, next) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    });
    note.save();
    res.status(201).json({
        message: "Quiz added successfully"
    })

});

app.get("/api/quizs", (req, res, next) => {
    Quiz.find().then(documents =>{
        res.status(200).json({
            message: "Quizs fetched successfully",
            notes: documents
        })
    });
});

app.delete('/api/quizs/:id', (req, res, next) =>{
    Quiz.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: 'Quiz deleted'});
    });
});

app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
    next();
})



module.exports = app;