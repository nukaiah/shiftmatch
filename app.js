import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();


const mongoURI = process.env.CLOUD_DB_URL_TEST;

mongoose.set("strictQuery", false);

try {
  await mongoose.connect(mongoURI);
  console.log("Connected Successfully");
} catch (err) {
  console.error("Failed to Connect");
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




import healthcareworkerRouter from './MVC/Controllers/HealtCareWorkerController.js';
import qualificationRouter from './MVC/Controllers/QualificationController.js';
import experienceRouter from './MVC/Controllers/ExperianceController.js';
import bankDetailsRouter from './MVC/Controllers/BankDetailsController.js';
import shiftpostRouter from './MVC/Controllers/ShiftPostController.js';
import healthCareFacilityRouter from './MVC/Controllers/HealthCareFacilityController.js';
import testRouter from './MVC/Controllers/TestController.js';


app.use('/api/healthCareWorker',healthcareworkerRouter);
app.use('/api/qualification', qualificationRouter);
app.use('/api/experiance',experienceRouter);
app.use('/api/bankDetails',bankDetailsRouter);
app.use('/api/shift',shiftpostRouter);
app.use('/api/facility',healthCareFacilityRouter);
app.use('/api/Test',testRouter);

app.use('/', (req, res) => {
  res.status(200).json({
    status: false,
    message: 'Invalid path',
  });
});

export default app;
