const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const PORT = 5000;
const StudentRouter = require('./Routers/StudentRouter');
const TeacherRouter = require('./Routers/TeacherRouter');
const BusRouter=require('./Routers/BusRouter');
const Admin=require('./Routers/AdminRouter');
const Update=require('./Routers/UpdateRoter');
const Addmarks = require('./Routers/marksrouter');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb connection error'));

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/api/Addstudent', StudentRouter);
app.use('/api/AddTeacher',TeacherRouter );
app.use('/api/AddBus',BusRouter)
app.use('/api/Admin',Admin);
app.use('/api/Update',Update);
app.use('/api/Addmarks',Addmarks);

app.listen(PORT, () => {
  console.log('Server is running on port 5000');
});



