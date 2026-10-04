const mongoose = require("mongoose");


//const URI = "mongodb://127.0.0.1:27017/mern_admin";
//mongoose.connect(URI);


const URI = process.env.MONGODB_URI;



const connectDb = async () => {
try {
    console.log(URI)
    await mongoose.connect(URI);
    console.log("connection successful to Db")
    
} catch (error) {
   console.error("database connection fail",error);
   process.exit(0)
    
    }
}

module.exports = connectDb;