import express from "express";
import {v4 as uuidv4} from 'uuid';
import mysql from 'mysql'

//connection string to mysql 
const connection=mysql.createPool({
    host: '192.168.12.98',
    user: 'root',
    password: 'Switch@123',
    database: 'crudapi'
});

const router = express.Router();


//Reterieve Query using *
router.get('/', (req, res)=>{
    connection.query(`select * from users`, (err,rows)=>{
    const usersArray=rows.map(row => {
        return {
            id: row.id,
            name:row.fname+" "+row.lname,
            age:row.age   
        }
    });  
        res.send(usersArray)
    });
    
});

//Retrieve Query Using Async/Await All data in table 


//Reterieve Query using id
router.get('/:id', (req, res)=>{
    const {id}=req.params
    console.log(id)
    connection.query(`select * from users where id="${id}"`, (err,rows)=>{
    const usersArray=rows.map(row => {
        return {
            id: row.id,
            name:row.fname+" "+row.lname,
            age:row.age   
        }
    });  
        res.send(usersArray)
    });
    
});


//delete method to delete specific user
router.delete('/:id', (req,res)=>{
    const {id}=req.params
    console.log(id)
    connection.query(`delete from users where id="${id}"`, (err,rows)=>{
        if(err){
            console.log("there is a error")
        }
        else
        {
            if(rows.affectedRows>0)
            {
                res.send(`User with id=${id} is deleted`)
            }
            else
            {
                res.status(404).send(`User with id=${id} not found`)
            }
        }
        return
    })
})


//insert  new data to users tables
router.post('/', (req,res)=>{
    const {fname, lname, age}=req.body
    const userId=uuidv4()
    console.log(userId, fname, lname, age)
    if(fname=="" ||  lname=="" ||  age=="")
    {
        res.send("Please send all field data")
    }
    else
    {
        connection.query(`Insert into users() values("${userId}","${fname}","${lname}",${age})`, (err, row)=>{
            if(err){
                console.log("There is error in aahhooo")
            }
            else
            {
                if(row.affectedRows>0){
                    res.send(`New User against id=${userId} is added`)
                }
                return
            }
        })
    }
    
});


router.put('/:id', (req, res)=>
{
    const {id}=req.params
    console.log(id)
    const keys=req.body  

    var resu="";
    connection.query(`select * from users where id="${id}"`, (err,rows)=>{
         if(err){
            console.log("error in fetching data")
         }
        else if(rows.length>0){
            connection.query(`UPDATE users SET ? WHERE id = ?`, [keys, id], (err, result) => {
                if (err) {
                    console.log("Error in updating table:", err);
                    return
                }
            });
            res.send(`Updated successfully agaisn id=${id}`)
        }
    });   
});

export default router