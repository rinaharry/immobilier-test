import   mongoose from 'mongoose';

 const  connectToDatabase = async ()=> {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017', {
    dbName:'realEstate'
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

export default connectToDatabase;
