const mongoose= require('mongoose');
const CONFIG = require('../config');

const url = `mongodb://${CONFIG.db_host}:${CONFIG.db_port}/${CONFIG.db_name}`;
mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true });
console.log("Successfully connected to the db");
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports= {mongoose};
