var bodyParser = require('body-parser')
var express = require('express');
var bdApi = require('./BDServer.js')
var bdRouter = express.Router();

bdRouter.use(bodyParser.json());
bdRouter.post("/GetLibros", async function(req,res){
    try {
        var ResponseFromGetLibros = await bdApi.getLibros();
        res.json(ResponseFromGetLibros);
        
    } catch (error) {
        console.log("Error");
    }
});

bdRouter.use(bodyParser.json());
bdRouter.post("/Inicio/:nick/:pass", async function(req,res){
    try {
         var nickname = req.param.nick;
         var pass = req.param.pass;

         var result = await bdApi.inicio_sesion(nickname,pass);
         res.json(result);
        
    } catch (error) {
        console.log("Error");
    }
});

bdRouter.use(bodyParser.json());
bdRouter.post("/getLibro/:idLibro", async function(req,res){
    try {
         var id_Libro = req.param.idLibro;

         var result = await bdApi.getLibro(id_Libro);
         res.json(result);
        
    } catch (error) {
        console.log("Error");
    }
});

bdRouter.use(bodyParser.json());
bdRouter.post("/DelteLibro/:idLibro", async function(req,res){
    try {
        var id_Libro = req.param.idLibro;
        var result = await bdApi.deleteLibro(id_Libro);
        res.json(result);
        
    } catch (error) {
        console.log("Error");
    }
});

bdRouter.use(bodyParser.json());
bdRouter.post("/NewLibro", async function(req,res){
    try {
        console.debug(req.body);
        var result = await bdApi.newLibro(req.body);
        res.json(result);
    } catch (error) {
        console.log("Error");
    }
});

bdRouter.use(bodyParser.json());
bdRouter.post("/NewComment/:idLibro/:idUsuario/:comment", async function(req,res){
    try {
        var id_Libro = req.param.idLibro;
        var id_Usuario = req.param.idUsuario;
        var comment = req.param.comment;
        var result = await bdApi.newComment(id_Usuario,id_Libro,comment);   
        res.json(result);
    } catch (error) {
        console.log("Error");
    }
});

bdRouter.use(bodyParser.json());
bdRouter.post("/Close/:idUsuario", async function(req,res){
    try {
        var id_Usuario = req.param.idUsuario;
        var result = await bdApi.closeSesion(id_Usuario);   
        res.json(result);
    } catch (error) {
        console.log("Error");
    }
});








