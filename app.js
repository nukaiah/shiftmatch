const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// const userRouter = require('./MVC/Controllers/UserRouters');
const qualificationRouter = require('./MVC/Controllers/QualificationController');
const experienceRouter = require('./MVC/Controllers/ExperianceController');
const shiftpostRouter = require('./MVC/Controllers/ShiftPostController');
const healthcareworkerRouter = require('./MVC/Controllers/HealtCareWorkerController');
const bankDetailsRouter = require('./MVC/Controllers/BankDetailsController');
const healthCareFacilityRouter = require('./MVC/Controllers/HealthCareFacilityController');



const mongoURI = "mongodb://localhost:27017/ShiftMatchingDb";
mongoose.set("strictQuery", false);
mongoose.connect(mongoURI,{useNewUrlParser: true,useUnifiedTopology: true,});
mongoose.connection.on("error",err=>{
    console.log("Failed to Connect");
});
mongoose.connection.on("connected",connected=>{
    console.log("Connected Succeffully");
});



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use('/api/user', userRouter);

app.use('/api/shift',shiftpostRouter);
app.use('/api/healthCareWorker',healthcareworkerRouter);
app.use('/api/experiance',experienceRouter);
app.use('/api/qualification', qualificationRouter);
app.use('/api/bankDetails',bankDetailsRouter);
app.use('/api/facility',healthCareFacilityRouter )

app.use('/', (req, res, next) => {
    res.status(200).json({
        status: true,
        message: 'sampple routing'
    });
});

module.exports = app;