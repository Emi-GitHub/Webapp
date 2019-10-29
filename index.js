var fs=require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 
var path=require('path');

app.use(express.static('public')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }))
    
//ZADATAK2
var storage=multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/');
    },
    filename: function(req, file, cb){
        cb(null, req.body['naziv']+'.pdf')
    }
});
var upload=multer({ 
    storage:storage,
    fileFilter: function(req, file, cb){
        console.log('uslo u multer');
        var tip=file.mimetype.split('/');
        var doc=tip[1];
        if(doc!=='pdf'){
            req.fileValidationError="Pogresan tip fajla";
            console.log('nije pdf');
            return cb(null, false);
        }
        if(fs.existsSync('public/'+req.body["naziv"]+"Zad.json")){
            console.log('ima vec');
            req.fileValidationError="Fajl vec postoji";
            return cb(null, false);
        }
        cb(null,true);
    } 
});
app.post('/addZadatak',upload.single('postavka'), function (req, res) {
    console.log('uslo u app.post');
    var naziv1=req.body['naziv'];
    if(req.fileValidationError=="Pogresan tip fajla" || req.fileValidationError=="Fajl vec postoji"){
        res.sendFile( __dirname + "/public"+"/greska.html" );
    }
    else{
        var response = {
            naziv:naziv1,
            postavka:"http://localhost:8080/"+req.body.naziv+".pdf"
        };
        var novaLinija = JSON.stringify(response);
        var novaLinija1=naziv1+','+"http://localhost:8080/"+naziv1+".pdf\n";
        fs.writeFile(path.join(__dirname+"\\public\\"+naziv1+"Zad.json"),novaLinija,function(err){
            if(err) {res.sendFile( __dirname + "/public"+"/greska.html" );}//throw err;
            else{
                fs.appendFile('zadaci.csv',novaLinija1,function(err){
                    if(err){res.sendFile( __dirname + "/public"+"/greska.html" );} //throw err;
                });
            }
        });
    res.json({message:"Uspješno dodan zadatak",data:novaLinija1});
   } 
});
 //ZADATAK3 
app.get('/zadatak', function (req, res) {
    res.setHeader('Content-Type', 'application/pdf');
    console.log(req.query.naziv);
    var jel=req.query.naziv.split(".");
    if(jel[jel.length-1]!="pdf"){res.sendFile( __dirname + '/public' + "/greska.html" ); } 
    else{
        res.sendFile(__dirname + '/public/' +req.query.naziv, function(err){
            if(err){res.sendFile( __dirname + "/public"+"/greska.html" );}//console.log(err);}
            else{console.log('Uspjesno!');}
        });
    }
});
//ZADATAK4
app.post('/addGodina', function (req, res) {
    response = {
     nazivGod:req.body.nazivGod,
     nazivRepVje:req.body.nazivRepVje,
     nazivRepSpi:req.body.nazivRepSpi
    };
    var novaLinija = response['nazivGod']+","+response['nazivRepVje']+","+response['nazivRepSpi']+"\n" ;
    console.log(response);
     fs.readFile("godine.csv", function(err, content) {
         var tekst = content.toString();
         var redovi = tekst.split("\n");
         var ima=0;
         for(var i=0; i<redovi.length-1; i++) {
             var kolone = redovi[i].split(",");
             if(kolone[0]==req.body.nazivGod) { var ima=1; res.sendFile( __dirname +'/public' + "/greska.html" ); }
         }
         if(ima==0){
            fs.appendFile('godine.csv',novaLinija,function(err){
                if(err){res.sendFile( __dirname + "/public"+"/greska.html" );} //throw err;
            });
         res.sendFile( __dirname +'/public'+ "/addGodina.html" ); 
        }
     });
 }); 
 //ZADATAK5
 app.get('/godine', function (req, res) {
    fs.readFile("godine.csv", function(error, content){
        if(error){
            res.writeHead(440);
            res.end(JSON.stringify(error));
        }
        else{
            var niz=[];
            var tekst=content.toString();
            var redovi=tekst.split("\n");
            for(var i=0;i<redovi.length-1; i++){
                var kolone=redovi[i].split(",");
                var objekat={nazivGod:kolone[0], 
                             nazivRepVje:kolone[1], 
                             nazivRepSpi:kolone[2]
                            };
                niz.push(objekat);
            }
            console.log(tekst);
            res.writeHead(200, {'Content-Type': 'application/json'}); 
            res.end(JSON.stringify(niz));
        }
    });
});
//ZADATAK7
//JSON
app.get('/zadaci', function (req, res) {
    if(req.accepts('json')){
    res.setHeader('Content-Type', 'application/json');
    fs.readFile("zadaci.csv", function(error, content){
        if(error){
            //res.writeHead(440);
            //res.end(error.toString());
            res.sendFile( __dirname + "/public"+"/greska.html" );
        }
        else{
            var niz=[];
            var tekst=content.toString();
            var redovi=tekst.split("\n");
            for(var i=0;i<redovi.length-1; i++){
                var kolone=redovi[i].split(",");
                var objekat={naziv:kolone[0], 
                                postavka:kolone[1]
                };
                niz.push(objekat);
            }
            console.log(niz);
        res.end(JSON.stringify(niz));
        } 
    });
  }
  //XML
    else if(req.accepts('xml')){
    res.setHeader('Content-Type', 'application/xml'); 
    fs.readFile("zadaci.csv", function(error, content){
        if(error){
            //res.writeHead(440);
            //res.end(error.toString());
            res.sendFile( __dirname + "/public"+"/greska.html" );
        }
        else{
            var tekst=content.toString();
            var redovi=tekst.split("\n");
            res.write('<?xml version="1.0" encoding="UTF-8">');
            res.write('<zadaci>');
            for(var i=0;i<redovi.length-1;i++){
                var kolone=redovi[i].split(",");
                res.write('<zadatak>');
                res.write('<naziv>'+" "+kolone[0]+" "+'</naziv>');
                res.write('<postavka>'+" "+kolone[1]+" "+'</postavka>');
                res.write('</zadatak>');
            }
            res.write('</zadaci>');
            console.log('radi xml');
            res.end('');
        } 
    }); 
  }
  //CSV
    else if(req.accepts('csv')){
    req.accepts('csv')
    res.setHeader('Content-Type', 'text/csv');
    fs.readFile("zadaci.csv", function(error, content){
        if(error){
            //res.writeHead(440);
            //res.end(error.toString());
            res.sendFile( __dirname + "/public"+"/greska.html" );
        }
        else{
            var tekst=content.toString();
            console.log(tekst);
        res.end(tekst.toString());
        }
    });
  }

}); 
app.listen(8080);