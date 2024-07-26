const express = require('express')
const {PrismaClient} = require('@prisma/client')
const cors = require('cors')
const helmet = require('helmet');
const promClient = require('prom-client');

const prisma = new PrismaClient()
const app = express()

const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ register: promClient.register });

//Formato JSON para solicitudes al servidor
app.use(express.json())

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions))
app.use(helmet());

//CORS para solicitudes entre diferentes servidores y métodos
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next()
})

//Test hacia la API
app.get('/test', (req, res) => {
    try{
        res.status(200).json({message: 'API en funcionamiento'});
    }catch (error){
        res.status(200).json({message: error.message});
    }
})

//METODO GET
app.get('/users', async (req, res) => {
    try{
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
})

//GET USER BY ID
app.get('/users/:id', async (req, res) => {
    try{
        const user = await prisma.user.findUnique({
        where: {
            id: Number(req.params.id),
        },
    })
    res.status(200).json(user)
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})

//CREATE USER
app.post('/users', async (req, res) => {
    try{
        const user = await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email
        },
    })
    //HTTP 201 Creado indica que la solicitud se realizó correctamente y condujo a la creación de un recurso
    res.status(201).json(user)
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})

//update user
app.put('/users/:id', async (req, res) => {
    try{
        const user = await prisma.user.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                name: req.body.name,
                email: req.body.email
            },
        });
    res.status(201).json(user)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})


//DELETE USER 
app.delete('/users/:id', async (req, res) => {
    try{
        const user = await prisma.user.delete({
        where: {
            id: Number(req.params.id),
        },
    })
    res.status(200).json(user);
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Endpoint para las métricas
app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', promClient.register.contentType);
    const metrics = await promClient.register.metrics()
    res.send(metrics);
});

//Activar server
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Servidor funcionando en el puerto ${PORT}`))