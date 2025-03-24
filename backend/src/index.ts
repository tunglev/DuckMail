import { MongoClient, ServerApiVersion } from 'mongodb';
import config from './config';
const uri = config.mongodbUri;

if (!uri) {
	throw new Error('MONGODB_URI is not defined in the environment variables');
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		// Connect the client to the server	(optional starting in v4.7)
		await client.connect();
		// Send a ping to confirm a successful connection
		await client.db('admin').command({ ping: 1 });
		console.log('Pinged your deployment. You successfully connected to MongoDB!');
    //write data to the database
    const database = client.db('duckmail');
    const collection = database.collection('users');
    const result = await collection.insertOne({name: 'John', age: 30});
    console.log(result);
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
run().catch(console.dir);
