const express = require('express');
const Note = require('./models/note');
const Quiz = require('./models/quiz');
const bodyParser = require("body-parser");
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/notes", (req, res, next) => {
    const note = new Note({
      title: req.body.title,
      content: req.body.content
    });
    note.save().then(createdNote => {
      res.status(201).json({
        message: "Note added successfully",
        noteId: createdNote._id
      });
    });
  });

app.get("/api/notes", (req, res, next) => {
    Note.find().then(documents =>{
        res.status(200).json({
            message: "Notes fetched successfully",
            notes: documents
        });
        //console.log(JSON.stringify(documents));
    });
});

app.post("/api/notes/update", (req, res, next) => {
    const note = new Note({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
      });
      note.updateOne({_id: req.body.id}, [{title: req.body.title},
        {content: req.body.content}], {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');        
    })
    .then(createdNote => {
        res.status(201).json({
          message: "Note added successfully",
          noteId: createdNote._id
        });});
});

app.delete('/api/notes/:id', (req, res, next) =>{
    Note.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: 'Note deleted'});
    });
});

app.post("/api/quizs", (req, res, next) => {
    const quiz = new Quiz({
        title: req.body.title,
        question: req.body.question,
        answer: req.body.answer
    });
    console.log(JSON.stringify(quiz));
    quiz.save().then(createdQuiz => {
        res.status(201).json({
        message: "Quiz added successfully",
        noteId: createdQuiz._id
        })
    });
});


app.get("/api/quizs", (req, res, next) => {
    Quiz.find().then(documents =>{
        res.status(200).json({
            message: "Quizes fetched successfully",
            quizs: documents
        });
        //console.log(JSON.stringify(documents));
    });
});

app.post("api/quizs", (req, res, next) => {
    const quiz = new Quiz({
        title: req.body.title,
        question: req.body.question,
        answer: req.body.answer
    });
    quiz.save().then(createdQuiz => {
        res.status(201).json({
        message: "Quiz added successfully",
        noteId: createdQuiz._id
        })
    });
});

app.delete('/api/quizs/:id', (req, res, next) =>{
    Quiz.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: 'Quiz deleted'});
    });
});

app.get("/api/quizs", (req, res, next) => {
    Quiz.find().then(documents =>{
        res.status(200).json({
            message: "Quizs fetched successfully",
            quizs: documents
        })
    });
});

app.post("/api/quizs/update", (req, res, next) => {
    const quiz = new Quiz({
        _id: req.body.id,
        title: req.body.title,
        question: req.body.question,
        answer: req.body.answer
      });
      quiz.updateOne({_id: req.body.id}, [{title: req.body.title},
        {question: req.body.question}, {answer: req.body.answer}], {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');        
    })
    .then(createdQuiz => {
        res.status(201).json({
          message: "Quiz added successfully",
          quizId: createdQuiz._id
        });});
});

app.delete('/api/quizs/:id', (req, res, next) =>{
    Quiz.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: 'Quiz deleted'});
    });
});


module.exports = app;