let Database = require("./libs/Database");

let db = new Database("yayphat");
db.loadDatabase((err)=>{
    if(err){
        console.log("Error");
    }else{
        let user = db.insert({
            name:"c++",
            age:35,
        })
        console.log(user);
        
    }
})