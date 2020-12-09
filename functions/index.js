const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore()

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({origin:true}))

async function getNotes(req,res){
    let user = db.collection("User").doc('Sample');

    let info = (await user.get()).data()

    res.send(info.notes);
}

app.use('/',getNotes);

exports.notes = functions.https.onRequest(app);


