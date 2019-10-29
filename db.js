const Sequelize = require("sequelize");
const sequelize = new Sequelize("WT2018","root","root",{host:"127.0.0.1",dialect:"mysql", logging:false});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

db.student = sequelize.import(__dirname+'/student.js');
db.godina= sequelize.import(__dirname+'/godina.js');
db.zadatak = sequelize.import(__dirname+'/zadatak.js');
db.vjezba = sequelize.import(__dirname+'/vjezba.js');

db.student.hasMany(db.godina,{fk:'studentGod', as:'studenti'});

db.studentGodina=db.godina.belongsToMany(db.vjezba,{through:'godina_vjezba',fk:'idgodina',as:'vjezbe'});
db.vjezba.belongsToMany(db.godina,{through:'godina_vjezba',fk:'idvjezba',as:'godine'});

db.studentVjezba=db.zadatak.belongsToMany(db.vjezba,{through:'vjezba_zadatak',fk:'idvjezba',as:'zadaci'});
db.vjezba.belongsToMany(db.zadatak,{through:'vjezba_zadatak',fk:'idzadatak',as:'vjezbe'});

module.exports=db;