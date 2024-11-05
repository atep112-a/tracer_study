const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');


const UserRouter = require('./src/Routes/UserRoutes')
const prodiRoute = require('./src/Routes/ProdiRoutes');
const KampusRoutes = require('./src/Routes/KampusRoutes');
const BekerjaRouter = require('./src/Routes/BekerjaRoutes');
const WirausahaRoutes = require('./src/Routes/WirausahaRoutes');
const MahasiswaRoutes = require('./src/Routes/MahasiswaRoutes');
const DataProcessingRoutes = require('./src/Routes/DataProcessingRoutes');
const TracerStudyRoutes = require('./src/Routes/TracerStudyRoutes');


// Mongo DB Connections
mongoose.connect("mongodb://localhost:27017/DBTracer", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(response=>{
    console.log('MongoDB Connection Succeeded.')
}).catch(error=>{
    console.log('Error in DB connection: ' + error)
});


// Middleware Connections
app.use(cors())
app.use(express.json())


// Routes


app.use('/kerja', BekerjaRouter)
app.use('/wirausaha', WirausahaRoutes)


//Super Admin Routes
app.use('/dashboard', DataProcessingRoutes)
app.use('/tracerstudy', TracerStudyRoutes)
app.use('/users', UserRouter)
app.use('/prodi', prodiRoute)
app.use('/kampus', KampusRoutes)


//Admin Routes
app.use('/mahasiswa', MahasiswaRoutes)


// Connection
const PORT = 5000
app.listen(PORT, ()=>{
    console.log(`App running in http://localhost:${PORT}`)
})