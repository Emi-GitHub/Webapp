var fs=require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 
var path=require('path');
var url=require('url');

const Sequelize = require("sequelize");
const db = require(__dirname+"/db.js");
db.sequelize.sync();
//db.sequelize.sync({force:true});
const Student = db.sequelize.import(__dirname+"/student.js");
const Godina = db.sequelize.import(__dirname+"/godina.js");
const Zadatak = db.sequelize.import(__dirname+"/zadatak.js");
const Vjezba = db.sequelize.import(__dirname+"/vjezba.js");

app.use(express.static('public')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }))

//ZADATAK1-SPIRALA4 
//zad2
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
        var tip=file.mimetype.split('/');
        var doc=tip[1];
        if(doc!=='pdf'){
            req.fileValidationError="Pogresan tip fajla";
            return cb(null, false);
        }
        if(fs.existsSync('public/'+req.body["naziv"]+"Zad.json")){
            req.fileValidationError="Fajl vec postoji";
            return cb(null, false);
        }
        cb(null,true);
    } 
});
app.post('/addZadatak',upload.single('postavka'), function (req, res) {
    var naziv1=req.body.naziv;
    if(req.fileValidationError=="Pogresan tip fajla" || req.fileValidationError=="Fajl vec postoji"){
        res.sendFile( __dirname + "/public"+"/greska.html" );
    }
    else{
        var response = {
            naziv:naziv1,
            postavka:"http://localhost:8080/"+req.body.naziv+".pdf"
        };
        novaLinija=JSON.stringify(response);
        var novaLinija1=naziv1+','+"http://localhost:8080/"+naziv1+".pdf\n";
        
        fs.writeFile(path.join(__dirname+"\\public\\"+naziv1+"Zad.json"),novaLinija,function(err){
            if(err) {res.sendFile( __dirname + "/public"+"/greska.html" );}
            else{
                //fs.appendFile('zadaci.csv',novaLinija1,function(err){ if(err){res.sendFile( __dirname + "/public"+"/greska.html" );} //throw err;});
                Zadatak.create({
                    naziv:naziv1,
                    postavka:response.postavka
                }).then(res.json({message:"Uspješno dodan zadatak",data:novaLinija1}));
            }
        }); 
        //ovdje
    } 
});
 //zad3
app.get('/zadatak', function (req, res) {
    Zadatak.findOne({where:{naziv:req.query.naziv}}).then(function(rez){    
        res.redirect(rez.postavka); 
    }).catch(function(err){
        res.end("Greska");
    })

});
//zad4
app.post('/addGodina', function (req, res) {
    response = {
     nazivGod:req.body.nazivGod,
     nazivRepVje:req.body.nazivRepVje,
     nazivRepSpi:req.body.nazivRepSpi
    };
    var novaLinija = response['nazivGod']+","+response['nazivRepVje']+","+response['nazivRepSpi']+"\n" ;
     Godina.findOne({where:{nazivGod:req.body.nazivGod}}).then(function(rez){ 
        if(rez!=null){
            res.sendFile( __dirname + "/public"+"/greska.html" );
        }
        else{
            Godina.create({ 
                nazivGod:req.body.nazivGod,
                nazivRepVje:req.body.nazivRepVje,
                nazivRepSpi:req.body.nazivRepSpi
            })
            res.redirect( __dirname +'/public'+ "/addGodina.html" )
        }
    })

 //treba li mi ovo u ovom zad?
     Zadatak.findOne({where:{naziv:req.query.naziv}}).then(function(rez){ 
        res.redirect(rez.postavka); 
    }).catch(function(err){
        res.sendFile( __dirname + "/public"+"/greska.html");
    })

 }); 
 //zad5
 app.get('/godine', function (req, res) {
    Godina.findAndCountAll().then(function(rez){
        var niz=[];
        for(i=0;i<rez.rows.length;i++){
            var obj={};
            obj.id=rez.rows[i].id.toString();
            obj.nazivGod=rez.rows[i].nazivGod.toString();
            obj.nazivRepVje=rez.rows[i].nazivRepVje.toString();
            obj.nazivRepSpi=rez.rows[i].nazivRepSpi.toString();
            niz.push(obj);
        } 
        res.writeHead(200, {'Content-Type': 'application/json'}); 
        res.end(JSON.stringify(niz));
    })
});
//ZADATAK7
//JSON
app.get('/zadaci', function (req, res) {
    if(req.accepts('json')){
    res.setHeader('Content-Type', 'application/json');
    Zadatak.findAndCountAll().then(function(rez){
        var niz=[];
        for(i=0;i<rez.rows.length;i++){
            var objekat={naziv: rez.rows[i].naziv, 
                postavka: rez.rows[i].postavka
            };
            niz.push(objekat);
        } 
        res.end(JSON.stringify(niz)); 
    })
  }
  //XML
    else if(req.accepts('xml')){
        res.setHeader('Content-Type', 'application/xml'); 
        Zadatak.findAndCountAll().then(function(rez){
            res.write('<?xml version="1.0" encoding="UTF-8">');
            res.write('<zadaci>');
            for(i=0;i<rez.rows.length;i++){
                res.write('<zadatak>');
                res.write('<naziv>'+" "+rez.rows[i].naziv+" "+'</naziv>');
                res.write('<postavka>'+" "+rez.rows[i].postavka+" "+'</postavka>');
                res.write('</zadatak>');
            } 
            res.write('</zadaci>');
            console.log("cd");
            res.end('');
        })
  }
  //CSV
    else if(req.accepts('csv')){
        req.accepts('csv')
        res.setHeader('Content-Type', 'text/csv');
        Zadatak.findAndCountAll().then(function(rez){
            for(i=0;i<rez.rows.length;i++){
                //res.write("Naziv:"+rez.rows[i].naziv+','+"Postavka:"+rez.rows[i].postavka+"\n");
                res.write(rez.rows[i].naziv+','+rez.rows[i].postavka+"\n");
            }
            res.end('');
        })
    }
}); 

//json za vjezbe (zadatak 2a)
app.get('/vjezbe', function (req, res) {
    Vjezba.findAndCountAll().then(function(rez){
        var niz=[];
        for(i=0;i<rez.rows.length;i++){
            var obj={};
            obj.id=rez.rows[i].id.toString();
            obj.naziv=rez.rows[i].naziv.toString();
            //obj.spirala=rez.rows[i].spirala.toString();
            niz.push(obj);
        } 
        res.writeHead(200, {'Content-Type': 'application/json'}); 
        res.end(JSON.stringify(niz));
    })
});

//novo
app.get('/godine_id', function(req, res){
    Godina.findAndCountAll().then(function(data){
        var niz=[];
        for(var i=0;i<data.count;i++){
            var obj={id:data.rows[i].id, naziv: data.rows[i].nazivGod};
            niz.push(obj);
        }
        res.writeHead(200, {'Content-Type': 'application/json'}); 
        res.end(JSON.stringify(niz));
    })
})
//zadazak 2a
app.post('/addVjezba', function (req, res){
    if(req.body.vjezba==undefined){
        //zadatak 2a
        Godina.findOne({where:{id:req.body.sGodine}}).then(function(godine){
            Vjezba.findOne({where:{id:req.body.sVjezbe}}).then(function(vjezbe){
                godine.addVjezbe(vjezbe);
                res.sendFile( __dirname +'/public'+ "/addVjezba.html" ); 
            })
        }) 
    }
    else{
        //zadatak 2b
        var ima=true;
        if(req.body.spirala===undefined){ ima=false; }
            Vjezba.create({
                naziv: req.body.vjezba,
                spirala: ima
            }).then(function(re){
                Godina.findOne({where:{id: req.body.sGodine}}).then(function(e){
                    re.addGodine([e]);
                    res.sendFile( __dirname +'/public'+ "/addVjezba.html" ); 
                })
            })  
        }     
});
    //zadatak 2c
    app.get('/zad', function(req, res){
        var parsiraj=new url.parse(req.url);
        var parametri=new url.URLSearchParams(parsiraj.query);
        var vje=parametri.get("id");
    Vjezba.findOne({where:{id:vje}}).then(function(dat){
        dat.getVjezbe().then(function(data){
            var niz=[];
            for(i=0;i<data.length;i++){
                var obj={};
                obj.id=data[i].id;
                obj.nazivGod=data[i].nazivGod;
                obj.postavka=data[i].postavka;
                niz.push(obj);
            } 
            Zadatak.findAndCountAll().then(function(data1){
                var red=data1.rows;
                var nizred=[];
                for(var i=0;i<red.length;i++){
                    var postoji=false;
                    for(var j=0;j<niz.length;j++){
                        if(red[i].id==niz[j].id){
                            postoji=true;
                        }
                    }
                    if(postoji==false){
                        var obj1={};
                        obj1.id=red[i].id;
                        obj1.naziv=red[i].naziv;
                        obj1.postavka=red[i].postavka;
                        nizred.push(obj1);
                    }
                }
                res.writeHead(200, {'Content-Type': 'application/json'}); 
            res.end(JSON.stringify(nizred));
            })
            
        })
       
    })
}) 

app.post("/vjezba/:idVjezbe/zadatak",function(request,respond){
    console.log("lalal");
    var vje = request.params.idVjezbe;
    var zad = request.body.sZadatak;
    Zadatak.findOne({where:{id:zad}}).then(function(data1){
        Vjezba.findOne({where:{id:vje}}).then(function(data){
            
            data.addVjezbe(data1);
            respond.redirect("http://localhost:8080/addVjezba.html");
        })
    })
 })

app.listen(8080);