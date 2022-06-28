const mongoose=require("mongoose");

//Db connection
module.exports= ()=>{
    const connectionParams={
        useNewUrlParser: true,
        useUnifiedTopology:true,
    };
    try {
        mongoose.connect(process.env.DB,connectionParams);
        console.log("Connected to database Successfully")
    } catch (error) {
        console.log(error);
        console.log("Could not connect to database")
    }
};
