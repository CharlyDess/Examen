var mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.43.124",
  user: "root",
  password: "",
  database:"cocoLibreria"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

async function getLibros(){
    return new Promise(async (resolve, reject)=>{
        var query="SELECT *FROM libro";
        try {
            var result= await con.query(query);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

async function inicio_sesion(nick, password){
    return new Promise(async (resolve,reject)=>{
        var query ="SELECT *FROM usuario WHERE nick='"+nick+"' AND password='"+password+"'";
        try {
            var result = await con.query(query);
            console.log(result);
            if(result[0]==undefined){
                resolve({msg:"La cuenta no existe",token:"0"})
            }
            else if(result.conectado=="0"){
                var query="UPDATE usario SET conectado = 1 WHERE id_usuario='"+result.idUsuario+"'";
                await con.query(query);
                resolve({msg:"conectado",token:""+result.idUsuario})
            }
        } catch (error) {
            reject(error);
        }
    });
}

async function getLibro(id_libro){
    return new Promise(async (resolve,reject)=>{
        try {
            var query="Select *From Libro WHERE idLibro='"+id_libro+"'";
            var result = await con.query(query);
            console.log(result);
            if(result[0]==undefined){
                console.log("no se pudo obtener el libro");
                resolve({msg:"no se pudo obtener el libro"});
            }
            else{
                resolve({msg:"Libro",result});
            }
        } catch (error) {
            reject(error);
        }
    });
}

async function deleteLibro(id_libro){
    return new Promise(async (resolve,reject)=>{
        try {
            var query="DELETE FROM Libro WHERE idLibro='"+id_libro+"'";
            await con.query(query);
            query="DELETE FROM Comentario WHERE idLibro='"+id_libro+"'";
            await con.query(query);
            resolve({msg:"Libro eliminado"});
        } catch (error) {   
            reject(error);
        }
    })
}

async function newLibro(NewLibroModel){
    return new Promise(async (resolve,reject)=>{
        try {
            var query="INSERT INTO Libro values(0,'"+ NewLibroModel.Titulo+ "','"+NewLibroModel.Autor+"'";
            var result = await con.query(query);
            resolve({msg:"Libro creado",id_libro:result.insertId})
        } catch (error) {
            reject(error);
        }

    });
}

async function newComment(id_usuario,id_libro,comment){
    return new Promise(async (resolve,reject)=>{
        try {
            var date= Date.now();
            var query="INSERT INTO Comentario values(0,'"+date+"','"+id_libro+"','"+id_usuario+"','"+comment+"'";
            var result = await con.query(query);
            resolve({msg:"insertado",result});
        } catch (error) {
            reject(error);
        }
    })
}

async function closeSesion(id_usuario){
    return new Promise(async (resolve,reject)=>{
        try {
            var query="UPDATE usario SET conectado = 0 WHERE id_usuario='"+id_usuario+"'";
            var result = await con.query(query);
            resolve({msg:"Sesion Cerrada",result});
        } catch (error) {
            reject(error);
        }
    });
}

module.exports.inicio_sesion = inicio_sesion;
module.exports.getLibros = getLibros;
module.exports.getLibro = getLibro;
module.exports.deleteLibro = deleteLibro;
module.exports.newLibro = newLibro;
module.exports.newComment = newComment;
module.exports.closeSesion = closeSesion;
