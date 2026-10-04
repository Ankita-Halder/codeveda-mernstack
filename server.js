require('dotenv').config( );
const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const adminAuthRoute = require("./router/adminlogin");



//let's tackle cors
const corsOption = {
  origin: ["http://localhost:5173", "https://codeveda-client.vercel.app"],
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};




app.use(cors(corsOption ));



app.use(express.json());

//Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix

app.use("/api/auth",authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

//let's define admin route
app.use("/api/admin",adminRoute);

app.use("/api/admin-panel", adminAuthRoute);


app.use(errorMiddleware);
const PORT = 5000;

//await connectDb()


if (process.env.VERCEL) {
  connectDb();
} else {
  connectDb().then(() => {
    app.listen(PORT, () => {
      console.log(`server is running at port: ${PORT}`);
    });
  });
}

module.exports = app;