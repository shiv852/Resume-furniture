const mongoose = require("mongoose")


async function connecteDb(){
  try{
    await mongoose.connect(`${process.env.MONGODB_URL}/furnitureproject`)
    console.log("connected to the database")
  }catch(err){
    console.error("Database connection error:", err.message)
    throw err
  }
}

module.exports = connecteDb





// const mongoose = require("mongoose")


// async function connecteDb(){
//   try{
//     mongoose.connect(process.env.MONGODB_URL + "/furniture?directConnection=true")
//     // mongoose.connect(`${process.env.MONGODB_URL}/furniture`)
//     console.log("connected to the database")
//   }catch(err){
//     console.log(err)
//   }

// }

// module.exports = connecteDb