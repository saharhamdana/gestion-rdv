const express= require('express');
const mongoose= require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/user.route')
const AuthRoutes = require('./routes/auth.route')
const rdvRoute = require('./routes/rdv.route');
const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
app.use(cors());



app.use(express.json())
app.use('/users',userRoutes);
app.use('/auth',AuthRoutes);
app.use('/rendezvous', rdvRoute);


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connect to server database')
}).catch(err=>{console.log('Error connecting to server database')
})

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Gestion des Rendez-vous",
            version: "1.0.0",
            description: "Documentation de l'API pour la gestion des rendez-vous",
        },
        servers: [
            {
                url: "http://localhost:5000", // Change cette URL si nécessaire
            },
        ],
    },
    apis: ["./routes/*.js"], // Spécifie où sont définies tes routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const PORT =process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log('listening on port',+ PORT);
})