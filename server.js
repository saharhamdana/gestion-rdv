const express= require('express');
const mongoose= require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/user.route')
const AuthRoutes = require('./routes/auth.route')
const rdvRoute = require('./routes/rdv.route');
const app = express();


app.use(express.json())
app.use('/users',userRoutes);
app.use('/auth',AuthRoutes);
app.use('/rendezvous', rdvRoute);


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connect to server database')
}).catch(err=>{console.log('Error connecting to server database')
})

const PORT =process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log('listening on port',+ PORT);
})