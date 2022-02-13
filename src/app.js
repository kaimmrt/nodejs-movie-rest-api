const express = require('express');
const helmet = require('helmet');
const config = require('./config');
const loaders = require('./loaders');
const events = require('./scripts/events')

const { AuthRoutes, MovieRoutes, DirectorRoutes } = require('./routes')
const verifyToken = require('./middleware/verify-token')

config();
loaders();
events();

const app = express();

app.use(express.json());
app.use(helmet());

app.listen(process.env.APP_PORT, () => {
    console.log("Sunucu ayağa kalktı...");
    app.use('/', AuthRoutes);
    app.use('/api', verifyToken);
    app.use('/api/movies', MovieRoutes);
    app.use('/api/directors', DirectorRoutes);
})