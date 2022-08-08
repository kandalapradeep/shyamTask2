const express = require('express');
const app = express();
const { Client } = require('pg');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-with, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
})

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "1234",
    database: "dvdrental"
})

client.connect();

app.get('/expensive',(req,res)=>{

    client.query(`select * from expenses`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        } else {
            console.log(err.message);
        }
    })
        client.end;
});

app.get('/expensive/:id', (req, res) => {

    client.query(`select * from expenses where id=${req.params.id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
            res.send("working fine");
        } else {
            console.log(err.message);
        }
    });
    client.end;
})

app.post('/expensive', (req, res) => {

    // console.log(req.body);

    const user = req.body;

    // console.log(user);
    // (isnum,title,item_price,qty,tot_price)

    let addData = `insert into expenses(moneys,enterydates,commen) values(${user.moneys},'${user.enterydates}','${user.commen}')`

    client.query(addData, (err, result) => {
        if (!err) {
            res.status(200).json({
                msg:'posted Data successfully',
            })
            // res.send("insterted Data successfully");
        } else {
            console.log(err.message);
        }
    });
    client.end;
});

app.put('/expensive/:id', (req, res) => {

    //console.log(req.body);

    const user = req.body

     console.log(user);

    let updateData = `update expenses set moneys=${user.moneys},commen='${user.commen}' where id=${user.id}`

    client.query(updateData, (err, result) => {
        if (!err) {
            res.send("Updated changes Data successfully");
        } else {
            console.log(err.message);
        }
    });
    client.end;
});

app.delete('/expensive/:id', (req, res) => {

    let insetquery = `delete from expenses where id=${req.params.id}`

    client.query(insetquery, (err, result) => {
        if (!err) {
            res.status(200).json({
                msg:'posted Data successfully',
            })
            // res.send("Delete the row successfully backend");
        } else {
            console.log(err.message);
        }
    });
    client.end;

})


app.listen(3300,()=>{
    console.log("server is runing")
})

// module.exports = app;