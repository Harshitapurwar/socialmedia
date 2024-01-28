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
const multer  = require('multer');
// const path=require("path");


const cors=require("cors");
const path = require("path");
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true'); // Set credentials to true
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
app.use(cors({
    origin:"http://localhost:3000"
}))

dotenv.config();

    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(()=>{console.log("connected successfully")});

      app.use("/images",express.static(path.join(__dirname,"public/images")))
      

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("Common"));
app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage=multer.diskStorage({
  destination:(req,res,cb)=>{
    cb(null,"public/images");
  },
  filename:(req,file,cb)=>{
    // console.log(req.body)
    cb(null,file.originalname);
  }
})

const upload=multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("file uploaded successfully!");
  } catch (err) {
    console.error(err);
  }
});

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);

app.listen(8800,()=>{
    console.log("backend server is running");
})