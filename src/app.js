const express = require('express');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const path = require("path");
const config = require('./config');
const loaders = require('./loaders');
const events = require('./scripts/events');

const { AuthRoutes, UserRoutes, MovieRoutes, DirectorRoutes } = require('./routes');
const verifyToken = require('./middleware/verify-token');

config();
loaders();
events();

const app = express();
app.use("/uploads", express.static(path.join(__dirname, './', "uploads")));
app.use(express.json());
app.use(helmet());
app.use(fileUpload());

app.listen(process.env.APP_PORT, () => {
    console.log("Sunucu ayağa kalktı...");
    app.use('/', AuthRoutes);
    app.use('/api', verifyToken);
    app.use('/api/user', UserRoutes);
    app.use('/api/movies', MovieRoutes);
    app.use('/api/directors', DirectorRoutes);
})