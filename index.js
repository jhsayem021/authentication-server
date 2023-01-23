const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DB_USER = DBUSER1
// DB_PASS = A53bhMKodO74iId1

// Mongodb Connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sezawpu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

async function run(){
    try{
        const usersCollection = client.db('crud-db').collection('user');
        app.get('/users', async (req,res)=>{
            const query = {};
            const cursor = usersCollection.find(query);
            const users = await cursor.toArray();
            console.log(users)
           res.send(users);
        })
        app.post('/useradd', async (req,res)=>{
            const user = req.body;
            const result = await usersCollection.insertOne(user);
        console.log(result);
        res.send(result)
        })
        app.delete('/delete/:id', async (req,res)=>{
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
        console.log(result);
        res.send(result)
        })
        
    }
    finally{

    }
}

run()


// Default route
app.get('/',(req,res)=>{
    res.send('Mongodb Server Running');
})

app.listen(port,()=>{
    console.log(`server running on ${port}`);
})