let Database = require("./libs/Database");

let db = new Database("yayphat");
db.loadDatabase();

db.on("load",function(){
    console.log("loaded");

    db.insert({name:"ruler"});
})

db.on("error",function(e){
    console.log("error");
    console.log(e);
})