const mongoose = require('mongoose');

const connectDb = async () => {
    try{
        await mongoose.connect('mongodb+srv://rafay:rafay@cluster0.0rwh2.mongodb.net/rafay?retryWrites=true&w=majority&appName=Cluster0');
        console.log('mongo db connected successfully')
    }
    catch(error){
        console.log('error connecting to mongo db connection', error)
    } 
}

module.exports = connectDb;