//const express = require('express');
//let app = express();
//ou  let app = require('express')();
const path = require ('path');
let app = require('express')();
const liste = require('./data/liste');

app.listen(3000,()=>(
    console.log("Félicitations, serveur lancé sous http://localhost:3000/")
));

//Définir l'arborescence
app.use('/pages', require('express').static('./clients/pages'));
app.use('/assets', require('express').static('./clients/assets'));


app.use(require('express').json());

app.post('/update/:id', (req, res)=>{
    const elem = liste.find(x => x.id == req.params.id)

    if (elem) {
        elem.dispo = req.body.dispo
        elem.name = req.body.name
        elem.prix = req.body.prix

        const index = liste.findIndex(x => x.id === req.params.id)
        liste[index] = elem;
    }
    res.send(liste)
});

//définir les routes 
app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname +'/clients/index.html'));
});

app.get('/liste', (req, res)=>{
    res.send(liste);
});

// pour parcourir le body on peu utiliser body-parser package facilitant l'accès au body depuis req
app.post('/liste', (req, res)=>{
    liste.push(req.body) // j'envoie le tableau 
    res.send(liste) // j'affiche 
   
});

app.get('/details/:id', (req, res) => {
    let myId = req.params.id;
    liste.forEach(element => {
      if(element.id == myId) {
        res.send(element);
      }
    });
  });

app.get('/edit/:id', (req, res) => {
    let myId = req.params.id;
    liste.forEach(element => {
        if(element.id == myId) {
            res.send(element);
        }
    });
});


app.get('/delete/:id', (req, res) => {
    let myId = req.params.id;
    const index = liste.findIndex(x => x.id == myId);
    liste.splice(index, 1)
});

