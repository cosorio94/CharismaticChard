'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const twilioMiddleware = require('./services/twilio/twilio_middleware.js');
const dataAllocatorRoutes = require('./services/data_allocator/routes');
const imageProcessingRoutes = require('./services/image_processor/routes');


const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
app.use(middleware.expressValidator());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes.auth);
app.use('/api', routes.api);
app.use('/api/profiles', routes.profiles);
app.use('/api/data_allocator', dataAllocatorRoutes);
app.use('/api/image_processor', imageProcessingRoutes);
app.post('/api/twilio', twilioMiddleware.twilioMiddleware );


module.exports = app;
