const express =require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");
const MONGO_URL = "mongodb+srv://harshitapurwar07:harshita123@cluster0.plcxvyv.mongodb.net/mycollection?retryWrites=true&w=majority";
const userRoute=require("./routes/users");
const authRoute=require("./routes/auth");
const postRoute=require("./routes/posts");
const cors=require("cors");
app.use(cors({
    origin:"http://localhost:3000"
}))

dotenv.config();

    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(()=>{console.log("connected successfully")});
      

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("Common"));

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);

app.listen(8800,()=>{
    console.log("backend server is running");
})