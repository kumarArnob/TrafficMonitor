//jshint esversion:6

const express = require("express");
const BodyParser = require("body-parser");
const mysql = require("mysql")
const formidable = require("formidable");
var http = require('http');
var fs = require('fs');
const cors = require('cors');

const app = express();
app.use(express.static("public"));


app.use(BodyParser.urlencoded({extended:true}));
const con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'trafiicvideo'
  });
  con.connect((err)=>{
      if(err){
          console.log(err.message);
      }
      
     var sql ='Select * from tarfficdata';

     con.query(sql,(err,result,fields)=>{
        if(err){
            console.log(err);
        }
        //console.log(result);
    });
    
      console.log("Database , "+ con.state);
  });
  


app.get("/",(req,res)=>{
    
    res.sendFile(__dirname+"\\index.html");
   //console.log(__dirname);
});

app.get("/viewcsv",(req,res)=>{
    res.sendFile(__dirname+"\\csv.html");
});


app.get("/test",(req,res)=>{
    var sql ='Select * from tarfficdata';

     con.query(sql,(err,result,fields)=>{
        if(err){
            console.log(err);
        }
        res.send(result);
    });
})

app.get("/loc",(req,res)=>{
    var sql ='Select Location from tarfficdata where ID = '+req.query.ID;
    console.log(req.query);

    con.query(sql,(err,result,fields)=>{
       if(err){
           console.log(err);
       }
       res.send(result);
   });
})


app.post("/addfile",(req,res)=>{
   
     var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
           
          var oldpath = files.video.path;
          var newpath = 'C:\\NoobtoConqueror\\J S\\TrafficMonitor\\Client\\public\\videos' + files.video.name;


          fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            console.log("File uploaded");
         });

          connection.query("INSERT INTO `tarfficdata` (`ID`, `Name`, `location`) VALUES (NULL, '"+files.video.name+"','"+newpath+"')",(err,result)=>{
            if(err) throw err;
            
        });
});

});



app.listen(3000,()=>{
    console.log("server is running on port @3000");
});
