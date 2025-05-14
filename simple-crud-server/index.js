const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json())

//user simpleDBuser
// pass OvhmiId60wKiEsvu

const uri = 'mongodb://localhost:27017'

// const uri = "mongodb+srv://simpleDBuser:OvhmiId60wKiEsvu@trmcamp0.7libfgs.mongodb.net/?retryWrites=true&w=majority&appName=trmcamp0";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    try{
        await client.connect();

        const userCollection = client.db('userdb').collection('users');
        // const database = client.db('userdb');
        // const userCollection = database.collection('users');

        app.get('/users', async(req,res)=>{
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/users/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};
            const result = await userCollection.findOne(query);
            res.send(result);
        })

        app.post('/users',async(req, res)=>{
            console.log('data in the server', req.body)
            const newuser = req.body;
            const result = await userCollection.insertOne(newuser)
            res.send(result)
        })

        app.put('/users/:id', async(req, res)=>{
            const id = req.params.id;
            const filter = {_id: new ObjectId(id)};
            const user = req.body;
            
            const updatedDoc ={
                $set:{
                    name:user.name,
                    email:user.email
                }
            }
            const options = {upsert:true};
            console.log(user)

            const result = await userCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        })

        app.delete('/users/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const result = await userCollection.deleteOne(query);
            console.log(id);
            console.log(req.params);
            res.send(result)
        })


        await client.db('admin').command({ping:1})
            console.log("Pinged your deployment. You successfully connected to MongoDB!");

    }
    finally{

    }
}
run().catch(console.dir)

app.get('/', (req,res)=>{
    res.send('simple crud  server running ')
});

app.listen(port,()=>{
    console.log(`simple crud server is port ${port}`)
})