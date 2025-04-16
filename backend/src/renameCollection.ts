import mongoose from 'mongoose';
import config from './config';


//TO USE: npm run rename-collection -- sourceCollectionName targetCollectionName


// Collection names can be set via environment variables, command-line arguments, or defaults
const sourceCollection = process.env.SOURCE_COLLECTION || 
                         process.argv[2] || 
                         'mockData';
const targetCollection = process.env.TARGET_COLLECTION || 
                         process.argv[3] || 
                         'tungle';

async function renameCollection(sourceName: string, targetName: string) {
  try {
    console.log(`Preparing to rename collection from "${sourceName}" to "${targetName}"...`);
    
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(config.mongodbUri, {
      tlsAllowInvalidCertificates: true
    });
    console.log('Connected to MongoDB');

    // Get the database instance
    const db = mongoose.connection.db;
    if (!db) {
      console.error('Error: Unable to get the database instance.');
      await mongoose.disconnect();
      process.exit(1);
    }
    
    // Check if the source collection exists
    const collections = await db.listCollections({ name: sourceName }).toArray();
    if (collections.length === 0) {
      console.log(`Collection "${sourceName}" does not exist.`);
      await mongoose.disconnect();
      return;
    }

    // Check if the target collection already exists
    const targetExists = await db.listCollections({ name: targetName }).toArray();
    if (targetExists.length > 0) {
      console.log(`Error: Target collection "${targetName}" already exists.`);
      await mongoose.disconnect();
      return;
    }
    
    // Rename the collection
    console.log(`Renaming collection from "${sourceName}" to "${targetName}"...`);
    await db.collection(sourceName).rename(targetName);
    console.log(`Collection successfully renamed to "${targetName}"`);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
  } catch (error) {
    console.error('Error:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run the function with the configured names
console.log('Starting collection rename process...');
console.log(`Source collection: ${sourceCollection}`);
console.log(`Target collection: ${targetCollection}`);
renameCollection(sourceCollection, targetCollection);