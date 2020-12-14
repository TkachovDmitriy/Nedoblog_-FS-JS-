const express = require("express");
const graphqlHttp = require("express-graphql");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const buildQlSchema = require("./graphql/buildSchema/schema");
const buildQlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is_Auth");
const Post = require("./models/post");
const cors = require("cors");

require("dotenv").config({
  path: __dirname + "/.env",
});

const app = express();

//call back for multer
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("photo");
//   END

//MIDLE-WARE
app.use(bodyParser.json());
app.use(isAuth);
app.use(cors());
app.use(express.static("./public"));

//Graphql Shchema
app.use(
  "/graphql",
  graphqlHttp((req, res) => ({
    schema: buildQlSchema,
    rootValue: buildQlResolvers,
    graphiql: true,
    // context: {userId: req.userId}
  }))
);

app.get("/", (req, res) => {
  res.render(index);
});
// app.use(cors())
// Upload in static folder all img
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    // console.log('Auth  >>> ', req.isAuth)
    // console.log('file >>> ',req.file)
    // console.log('all reg >>> ',req)

    let path = req.file;
    return path;
  });
});

//MOngo DB connect

const url = `mongodb+srv://Dima:${process.env.DB_USER_PASS}@cluster0.flosu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

// Listener for server
app.listen(process.env.PORT, () =>
  console.log(`Now browse to localhost:${process.env.PORT}/graphql`)
);
